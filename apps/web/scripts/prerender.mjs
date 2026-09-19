import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// External React/MUI dependencies must render with the same mode as the client build.
process.env.NODE_ENV = "production";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, "..");
const clientDir = path.join(appDir, "dist", "client");
const serverEntry = path.join(appDir, "dist", "server", "entry-server.js");
const templatePath = path.join(clientDir, "index.html");

const copiedAdminDir = path.resolve(clientDir, "admin");
if (path.dirname(copiedAdminDir) !== clientDir) throw new Error("Ungültiger Pfad zur erzeugten CMS-Konfiguration.");
await rm(copiedAdminDir, { recursive: true, force: true });

const template = await readFile(templatePath, "utf8");
const {
  generateManifestJson,
  generateRobotsTxt,
  generateSitemapXml,
  getStaticRoutes,
  render
} = await import(pathToFileURL(serverEntry).href);

const routes = getStaticRoutes();

for (const route of routes) {
  const { appHtml, headHtml } = render(route.path);
  const html = template
    .replace("<!--app-head-->", headHtml)
    .replace("<!--app-html-->", appHtml);
  const targetPath = getRouteFilePath(route.path);

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, html);
}

await writeFile(path.join(clientDir, "robots.txt"), generateRobotsTxt());
await writeFile(path.join(clientDir, "sitemap.xml"), generateSitemapXml(routes));
await writeFile(path.join(clientDir, "manifest.webmanifest"), generateManifestJson());

function getRouteFilePath(routePath) {
  if (routePath === "/") {
    return path.join(clientDir, "index.html");
  }

  return path.join(clientDir, ...routePath.split("/").filter(Boolean), "index.html");
}
