import { existsSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { articlesPlugin } from "./plugins/articles";
import { articleTopicsPlugin } from "./plugins/article-topics";

const rootDir = dirname(fileURLToPath(import.meta.url));
const cmsBuild = process.env.MARIA_BUILD_CMS === "true";

export default defineConfig({
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [react(), articlesPlugin(rootDir), articleTopicsPlugin(rootDir), {
    name: "prerendered-preview-routes",
    configurePreviewServer(server) {
      const outputDir = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, _response, next) => {
        if (request.method === "GET" || request.method === "HEAD") {
          try {
            const url = new URL(request.url ?? "/", "http://localhost");
            const file = resolve(outputDir, `.${decodeURIComponent(url.pathname)}`, "index.html");
            if (file.startsWith(outputDir + sep) && existsSync(file)) {
              request.url = `${url.pathname.replace(/\/$/, "")}/index.html${url.search}`;
            }
          } catch {
            // Malformed paths are handled by Vite's normal response middleware.
          }
        }
        next();
      });
    }
  }],
  resolve: {
    alias: {
      "@": resolve(rootDir, "src")
    }
  },
  build: {
    outDir: cmsBuild ? "dist/cms" : "dist/client",
    assetsDir: cmsBuild ? "admin/assets" : "assets",
    emptyOutDir: true,
    rollupOptions: {
      input: cmsBuild ? {
        admin: resolve(rootDir, "admin/index.html"),
        preview: resolve(rootDir, "admin/preview.html")
      } : {
        website: resolve(rootDir, "index.html")
      }
    }
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
    proxy: {
      "/__cms": {
        target: "http://127.0.0.1:8081",
        rewrite: (path) => path.replace(/^\/__cms/, "")
      }
    }
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    proxy: {}
  }
});
