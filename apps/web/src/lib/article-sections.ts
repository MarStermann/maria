import type { Article, ArticleSection } from "@maria/content-model";
import { isVisibleArticle, type ArticleSelectionOptions } from "./article-content";

export type ArticleSectionSettings = Partial<Omit<ArticleSection, "type" | "source" | "layout">> & {
  source?: string;
  layout?: string;
};

export function selectSectionArticles(articles: readonly Article[], section: ArticleSectionSettings, options: ArticleSelectionOptions & { editorPreview?: boolean } = {}) {
  const source = section.source ?? (section.articleSlugs?.length ? "selection" : "latest");
  const visible = articles.filter(article => (options.editorPreview || isVisibleArticle(article, options.includeReview)) &&
    (!section.serviceSlug || article.serviceSlugs?.includes(section.serviceSlug)) &&
    (!section.complaintSlug || article.complaintSlugs?.includes(section.complaintSlug)));
  const filtered = source === "news" ? visible.filter(article => article.isNews === true)
    : source === "topic" ? visible.filter(article => section.topicSlug && article.topicSlugs?.includes(section.topicSlug))
    : visible;
  if (source === "selection" && !section.articleSlugs?.length) return [];
  const newest = [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  const slugs = !section.source || source === "selection" ? section.articleSlugs ?? [] : [];
  const manual = [...new Set(slugs)].flatMap(slug => filtered.filter(article => article.slug === slug));
  const selected = slugs.length ? [...manual, ...(section.serviceSlug || section.complaintSlug ? newest.filter(article => !slugs.includes(article.slug)) : [])] : newest;
  return selected.slice(0, Math.max(0, Math.floor(section.limit ?? 3)));
}
