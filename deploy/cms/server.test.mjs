import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { allowedPath, createCmsServer } from "./server.mjs";

const exec = promisify(execFile);
const content = "apps/web/src/content/editable/home.json";
test("CMS confines paths to JSON content and image uploads", () => {
  for (const value of [".git/config", ".github/workflows/deploy.yml", "package.json", "apps/web/src/content/editable/../../server.json", "/etc/passwd", "apps/web/public/uploads/attack.html", "apps/web/public/uploads/.ssh/key.png", "apps\\web\\public\\uploads\\x.png"]) assert.equal(allowedPath(value), false, value);
  assert.equal(allowedPath(content), true);
  assert.equal(allowedPath("apps/web/public/uploads/image.webp"), true);
});

test("CMS saves to Git, synchronizes upstream changes, and preserves data across restart", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "maria-cms-test-"));
  const remote = path.join(temp, "origin.git"), seed = path.join(temp, "seed"), repo = path.join(temp, "cms");
  const git = (cwd, ...args) => exec("git", ["-C", cwd, ...args]);
  let server;
  try {
    await exec("git", ["init", "--bare", remote]);
    await exec("git", ["init", "-b", "main", seed]);
    await git(seed, "config", "user.name", "CMS Test");
    await git(seed, "config", "user.email", "test@example.test");
    await git(seed, "config", "commit.gpgsign", "false");
    await mkdir(path.dirname(path.join(seed, content)), { recursive: true });
    await writeFile(path.join(seed, content), '{"title":"Before"}');
    await git(seed, "add", ".");
    await git(seed, "commit", "-m", "Initial content");
    await git(seed, "remote", "add", "origin", remote);
    await git(seed, "push", "-u", "origin", "main");
    async function start() {
      server = await createCmsServer({ repo, remote });
      await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    }
    await start();
    async function request(action, params = {}) {
      const response = await fetch(`http://127.0.0.1:${server.address().port}/api/v1`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, params: { branch: "main", ...params } }) });
      return { status: response.status, body: await response.json() };
    }
    assert.equal((await request("info")).body.type, "local_fs");
    assert.equal((await request("getEntry", { path: ".git/config" })).status, 422);
    const failed = await request("persistEntry", { entry: { path: content, raw: '{"title":"Should not be written"}' }, assets: [{ path: ".github/workflows/attack.png", encoding: "base64", content: "YWJj" }] });
    assert.equal(failed.status, 422);
    assert.equal(JSON.parse(await readFile(path.join(repo, content), "utf8")).title, "Before");
    const saved = await request("persistEntry", { entry: { path: content, raw: '{"title":"After"}' }, assets: [] });
    assert.equal(saved.status, 200, JSON.stringify(saved));
    assert.equal(JSON.parse((await git(remote, "show", `main:${content}`)).stdout).title, "After");
    const image = await request("persistMedia", { asset: { path: "apps/web/public/uploads/test.png", content: "YWJj", encoding: "base64" } });
    assert.equal(image.status, 200);
    assert.equal(image.body.content, "YWJj");
    assert.equal((await request("getMedia", { mediaFolder: "apps/web/public/uploads" })).body.length, 1);
    assert.equal((await request("deleteFile", { path: "apps/web/public/uploads/test.png" })).status, 200);
    await git(seed, "pull", "--ff-only");
    await writeFile(path.join(seed, content), '{"title":"Upstream"}');
    await git(seed, "commit", "-am", "Upstream content");
    await git(seed, "push");
    assert.equal(JSON.parse((await request("getEntry", { path: content })).body.data).title, "Upstream");
    await new Promise(resolve => server.close(resolve));
    await start();
    assert.equal(JSON.parse((await request("getEntry", { path: content })).body.data).title, "Upstream");
  } finally {
    if (server?.listening) await new Promise(resolve => server.close(resolve));
    await rm(temp, { recursive: true, force: true });
  }
});
