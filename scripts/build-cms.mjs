import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(resolve(root, "apps/web/package.json"));
const vite = resolve(dirname(require.resolve("vite/package.json")), "bin/vite.js");
const result = spawnSync(process.execPath, [vite, "build"], {
  cwd: resolve(root, "apps/web"), stdio: "inherit",
  env: { ...process.env, MARIA_BUILD_CMS: "true", VITE_CMS_MODE: "server" }
});
process.exitCode = result.status ?? 1;
if (result.status === 0) {
  const configPath = resolve(root, "apps/web/dist/cms/admin/config.yml");
  const publicUrl = new URL(process.env.MARIA_PUBLIC_URL || "http://192.168.178.101:8097").origin;
  const config = (await readFile(configPath, "utf8"))
    .replaceAll("http://localhost:3000", publicUrl)
    .replace(/Texte ändern und lokal speichern\.[\s\S]*?nicht\./, "Texte bearbeiten und speichern. Die Website wird nach erfolgreicher Prüfung und Erstellung automatisch aktualisiert.");
  await writeFile(configPath, config);
}
