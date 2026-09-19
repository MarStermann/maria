import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, readdir, writeFile, rename, unlink, lstat, access } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const exec = promisify(execFile);
const contentRoot = "apps/web/src/content/editable";
const mediaRoot = "apps/web/public/uploads";
const mutations = new Set(["persistEntry", "persistMedia", "deleteFile", "deleteFiles"]);
const hash = value => createHash("sha256").update(value).digest("hex");

export function allowedPath(value, folder = false) {
  if (typeof value !== "string" || value.includes("\\") || value.includes("\0") || value.split("/").some(p => !p || p === "." || p === ".." || p.startsWith("."))) return false;
  const content = value.startsWith(`${contentRoot}/`) && /\.json$/.test(value);
  const media = value.startsWith(`${mediaRoot}/`) && /\.(png|jpe?g|webp|gif|avif|svg|ico)$/i.test(value);
  return folder ? value === mediaRoot || value === contentRoot || ["articles", "article-topics", "services", "complaints"].some(p => value === `${contentRoot}/${p}`) : content || media;
}

export async function createCmsServer({ repo, remote, branch = "main" }) {
  const git = args => exec("git", ["-C", repo, ...args], { timeout: 60000, maxBuffer: 2 * 1024 * 1024 });
  await mkdir(path.dirname(repo), { recursive: true });
  try { await access(path.join(repo, ".git")); }
  catch { await exec("git", ["clone", "--branch", branch, "--single-branch", remote, repo], { timeout: 180000 }); }
  await git(["config", "user.name", "Maria Redaktion"]);
  await git(["config", "user.email", "maria-redaktion@users.noreply.github.com"]);
  await git(["config", "core.hooksPath", "/dev/null"]);
  await git(["config", "commit.gpgsign", "false"]);
  await git(["config", "core.autocrlf", "false"]);

  async function resolveFile(value, folder = false) {
    if (!allowedPath(value, folder)) throw new Error("Dieser Dateipfad ist nicht für die Redaktion freigegeben.");
    let current = repo;
    for (const segment of value.split("/")) {
      current = path.join(current, segment);
      try { if ((await lstat(current)).isSymbolicLink()) throw new Error("Symbolische Links sind nicht erlaubt."); }
      catch (error) { if (error.code !== "ENOENT") throw error; }
    }
    return current;
  }
  async function entry(file) {
    const absolute = await resolveFile(file.path);
    try { const data = await readFile(absolute, "utf8"); return { data, file: { ...file, id: hash(data) } }; }
    catch (error) { if (error.code === "ENOENT") return { data: null, file: { ...file, id: null } }; throw error; }
  }
  async function media(value) {
    const data = await readFile(await resolveFile(value));
    return { id: hash(data), content: data.toString("base64"), encoding: "base64", path: value, name: path.posix.basename(value) };
  }
  async function list(folder, extension = "", depth = 1) {
    const absolute = await resolveFile(folder, true);
    const result = [];
    async function walk(dir, relative, level) {
      let items;
      try { items = await readdir(dir, { withFileTypes: true }); } catch (error) { if (error.code === "ENOENT") return; throw error; }
      for (const item of items) {
        const file = `${relative}/${item.name}`;
        if (item.isDirectory() && level > 1) await walk(path.join(dir, item.name), file, level - 1);
        else if (item.isFile() && allowedPath(file) && file.endsWith(extension)) result.push(file);
      }
    }
    await walk(absolute, folder, Math.min(Math.max(Number(depth) || 1, 1), 10));
    return result.sort();
  }
  async function sync() {
    // Keep an unsent commit after a network failure; never discard an editor's work.
    await git(["fetch", "origin", branch]);
    await git(["merge", "--ff-only", `origin/${branch}`]);
    await git(["push", "origin", `HEAD:refs/heads/${branch}`]);
  }
  async function persist(params, action) {
    const writes = [], deletes = [];
    const entries = action === "persistEntry" ? params.dataFiles ?? [params.entry] : [];
    for (const item of entries) {
      if (!item || typeof item.raw !== "string" || !item.path?.startsWith(`${contentRoot}/`)) throw new Error("Ungültiger Inhalt.");
      const data = JSON.parse(item.raw);
      if (!data || Array.isArray(data) || typeof data !== "object") throw new Error("Ungültiger JSON-Eintrag.");
      const target = item.newPath || item.path;
      if (!target.startsWith(`${contentRoot}/`)) throw new Error("Ungültiger Inhaltspfad.");
      await resolveFile(item.path);
      writes.push([target, item.raw]);
      if (target !== item.path) deletes.push(item.path);
    }
    for (const item of action === "persistMedia" ? [params.asset] : params.assets ?? []) {
      if (!item || item.encoding !== "base64" || typeof item.content !== "string" || !item.path?.startsWith(`${mediaRoot}/`)) throw new Error("Ungültige Bilddatei.");
      writes.push([item.path, Buffer.from(item.content, "base64")]);
    }
    if (action === "deleteFile") deletes.push(params.path);
    if (action === "deleteFiles") {
      if (!Array.isArray(params.paths) || !params.paths.length) throw new Error("Keine Dateien angegeben.");
      deletes.push(...params.paths);
    }
    // Validate the entire operation before touching any file.
    const resolvedWrites = await Promise.all(writes.map(async ([file, data]) => [await resolveFile(file), data]));
    const resolvedDeletes = await Promise.all(deletes.map(file => resolveFile(file)));
    if (!resolvedWrites.length && !resolvedDeletes.length) throw new Error("Keine Änderungen angegeben.");
    for (const [file, data] of resolvedWrites) {
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(`${file}.tmp`, data);
      await rename(`${file}.tmp`, file);
    }
    for (const file of resolvedDeletes) await unlink(file).catch(error => { if (error.code !== "ENOENT") throw error; });
    await git(["add", "-A", "--", contentRoot, mediaRoot]);
    const { stdout: changes } = await git(["diff", "--cached", "--name-only"]);
    if (changes.trim()) await git(["commit", "-m", "content: update from Maria Redaktion"]);
    await git(["push", "origin", `HEAD:refs/heads/${branch}`]);
    return action === "persistMedia" ? media(params.asset.path) : { message: "Gespeichert. Die Deployment-Pipeline aktualisiert die Website." };
  }
  await mkdir(path.join(repo, mediaRoot), { recursive: true });
  let queue = Promise.resolve();
  const server = createServer(async (request, response) => {
    const json = (code, value) => { response.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); response.end(JSON.stringify(value)); };
    if (request.url === "/healthz" && request.method === "GET") return json(200, { status: "ok" });
    if (request.url !== "/api/v1" || request.method !== "POST") return json(404, { error: "Not found" });
    let body;
    try {
      const chunks = []; let length = 0;
      for await (const chunk of request) {
        length += chunk.length;
        if (length > 20 * 1024 * 1024) return json(413, { error: "Die Anfrage ist zu groß." });
        chunks.push(chunk);
      }
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch { return json(400, { error: "Ungültige Anfrage." }); }
    const task = async () => {
      try {
        const { action, params = {} } = body;
        if (action === "info") return json(200, { repo: "maria", publish_modes: ["simple"], type: "local_fs" });
        if (params.branch && params.branch !== branch) return json(422, { error: "Ungültiger Branch." });
        await sync();
        let result;
        if (mutations.has(action)) result = await persist(params, action);
        else switch (action) {
          case "entriesByFiles": result = await Promise.all(params.files.map(entry)); break;
          case "entriesByFolder": result = await Promise.all((await list(params.folder, params.extension, params.depth)).map(file => entry({ path: file }))); break;
          case "getEntry": result = await entry({ path: params.path }); break;
          case "getMedia": result = await Promise.all((await list(params.mediaFolder)).map(media)); break;
          case "getMediaFile": result = await media(params.path); break;
          case "getDeployPreview": result = null; break;
          default: return json(422, { error: "Diese Aktion wird nicht unterstützt." });
        }
        json(200, result);
      } catch (error) {
        // Git may include infrastructure details in stderr; do not send these to the browser.
        console.error("CMS request failed:", error.code ?? error.name);
        json(422, { error: "Speichern oder Laden fehlgeschlagen. Bitte erneut versuchen; bei einem Git-Konflikt muss der Repository-Stand geprüft werden. Vorhandene Änderungen bleiben erhalten." });
      }
    };
    queue = queue.then(task, task);
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await createCmsServer({ repo: process.env.CMS_REPO_DIR || "/data/repo", remote: process.env.CMS_GIT_REMOTE || "git@github.com:MarStermann/maria.git" });
  server.listen(8081, "0.0.0.0", () => console.log("Maria CMS ready on port 8081"));
}
