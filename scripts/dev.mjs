import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "package.json"));
const webRequire = createRequire(path.join(root, "apps/web/package.json"));
const cmsOnly = process.argv.includes("--cms-only");
const children = [];
let stopping = false;

async function checkPort(port) {
  await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", () => reject(new Error(`Port ${port} ist belegt. Bitte den bisherigen Entwicklungsserver zuerst beenden.`)));
    server.listen(port, "127.0.0.1", () => server.close(resolve));
  });
}

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}

function start(script, args, options) {
  const child = spawn(process.execPath, [script, ...args], {
    cwd: root,
    stdio: "inherit",
    windowsHide: true,
    ...options
  });
  children.push(child);
  child.once("error", (error) => { console.error(error.message); stop(1); });
  child.once("exit", (code) => { if (!stopping) stop(code ?? 1); });
  return child;
}

process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());

try {
  await checkPort(8081);
  if (!cmsOnly) await checkPort(3000);
  start(require.resolve("decap-server"), [], {
    env: {
      ...process.env,
      MODE: "fs",
      BIND_HOST: "127.0.0.1",
      PORT: "8081",
      GIT_REPO_DIRECTORY: root
    }
  });
  if (!cmsOnly) {
    const vite = path.join(path.dirname(webRequire.resolve("vite/package.json")), "bin/vite.js");
    start(vite, [], { cwd: path.join(root, "apps/web") });
  }
  console.log("\nWebsite: http://localhost:3000\nRedaktion: http://localhost:3000/admin/\nÄnderungen werden lokal gespeichert. Beenden mit Strg+C.\n");
} catch (error) {
  console.error(error.message);
  stop(1);
}
