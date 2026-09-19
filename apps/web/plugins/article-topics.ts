import { mkdir, readdir, readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import type { Plugin } from "vite";
import type { ArticleTopic } from "@maria/content-model";
import { isValidArticleDate } from "../src/lib/article-content";

export function articleTopicsPlugin(root: string): Plugin {
  const directory = resolve(root, "src/content/editable/article-topics");
  const virtualId = "virtual:article-topics";
  const resolvedId = `\0${virtualId}`;
  return {
    name: "maria-article-topics",
    resolveId: id => id === virtualId ? resolvedId : undefined,
    async load(id) {
      if (id !== resolvedId) return;
      await mkdir(directory, { recursive: true });
      const topics: ArticleTopic[] = [];
      for (const file of (await readdir(directory)).filter(file => file.endsWith(".json")).sort()) {
        const path = resolve(directory, file);
        this.addWatchFile(path);
        const topic = JSON.parse(await readFile(path, "utf8")) as ArticleTopic;
        if (topic.review?.status !== "published") continue;
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.slug) || file !== `${topic.slug}.json`) throw new Error(`${file}: Themen-Kürzel muss zum Dateinamen passen.`);
        if (![topic.title, topic.description, topic.seo?.title, topic.seo?.description].every(value => typeof value === "string" && value.trim()) || !Number.isFinite(topic.order)) throw new Error(`${file}: Titel, Beschreibung, Reihenfolge und SEO des Themenbereichs prüfen.`);
        if (typeof topic.review.medicalReviewRequired !== "boolean" || (topic.review.medicalReviewRequired && (!topic.review.reviewedBy?.trim() || !isValidArticleDate(topic.review.lastReviewedAt ?? "")))) throw new Error(`${file}: Fachliche Freigabe mit Prüfname und gültigem Datum ergänzen.`);
        topics.push(topic);
      }
      return `export default ${JSON.stringify(topics)};`;
    },
    configureServer(server) {
      server.watcher.add(directory);
      const refresh = (file: string) => {
        if (!resolve(file).startsWith(directory + sep) || !file.endsWith(".json")) return;
        const module = server.moduleGraph.getModuleById(resolvedId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh).on("change", refresh).on("unlink", refresh);
      server.httpServer?.once("close", () => server.watcher.off("add", refresh).off("change", refresh).off("unlink", refresh));
    }
  };
}
