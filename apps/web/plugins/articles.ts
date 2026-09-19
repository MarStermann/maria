import { mkdir, readdir, readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import type { Plugin } from "vite";
import type { Article } from "@maria/content-model";
import { isPublishedArticle, isValidArticleDate } from "../src/lib/article-content";

// Builds only receive approved articles. Review entries are available during Vite serve.
export function articlesPlugin(root: string): Plugin {
  const directory = resolve(root, "src/content/editable/articles");
  const virtualId = "virtual:published-articles";
  const resolvedId = `\0${virtualId}`;
  let previewEnabled = false;
  return {
    name: "maria-articles",
    configResolved(config) {
      previewEnabled = config.command === "serve";
    },
    resolveId: id => id === virtualId ? resolvedId : undefined,
    async load(id) {
      if (id !== resolvedId) return;
      await mkdir(directory, { recursive: true });
      const articles: Article[] = [];
      const slugs = new Set<string>();
      for (const file of (await readdir(directory)).filter(file => file.endsWith(".json")).sort()) {
        const path = resolve(directory, file);
        this.addWatchFile(path);
        const article = JSON.parse(await readFile(path, "utf8")) as Article;
        if (article.review?.status !== "published" && !(previewEnabled && article.review?.status === "review")) continue;
        article.categories ??= [];
        article.topicSlugs ??= [];
        article.isNews ??= false;
        article.serviceSlugs ??= [];
        article.complaintSlugs ??= [];
        article.relatedArticleSlugs ??= [];
        if (typeof article.review.medicalReviewRequired !== "boolean" || (article.review.status === "published" && !isPublishedArticle(article))) throw new Error(`${file}: Prüfbedarf festlegen; bei medizinischen Inhalten müssen Name und gültiges Prüfdatum vorliegen.`);
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || ["aktuelles", "themen"].includes(article.slug) || file !== `${article.slug}.json` || slugs.has(article.slug)) {
          throw new Error(`${file}: Eindeutiger Slug muss zum Dateinamen passen (kleine Buchstaben, Ziffern, Bindestriche).`);
        }
        if (![article.title, article.teaser, article.body, article.image, article.seo?.title, article.seo?.description].every(value => typeof value === "string" && value.trim()) || !isValidArticleDate(article.publishedAt) || typeof article.isNews !== "boolean" || ![article.categories, article.topicSlugs, article.serviceSlugs, article.complaintSlugs, article.relatedArticleSlugs].every(values => Array.isArray(values) && values.every(value => typeof value === "string"))) {
          throw new Error(`${file}: Titel, Kurzbeschreibung, Bild, Inhalt, Datum, Themen und SEO-Felder prüfen.`);
        }
        slugs.add(article.slug);
        articles.push({ ...article, imageAlt: article.imageAlt ?? "" });
      }
      return `export const previewEnabled = ${previewEnabled}; export default ${JSON.stringify(articles)};`;
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
      server.httpServer?.once("close", () => {
        server.watcher.off("add", refresh).off("change", refresh).off("unlink", refresh);
      });
    }
  };
}
