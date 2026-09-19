import type { Article } from "@maria/content-model";

export function isValidArticleDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

export function isPublishedArticle(article: Article) {
  return article.review.status === "published" &&
    (!article.review.medicalReviewRequired || Boolean(
      article.review.reviewedBy?.trim() && isValidArticleDate(article.review.lastReviewedAt ?? "")
    ));
}

export type ArticleSelectionOptions = {
  serviceSlug?: string;
  complaintSlug?: string;
  /** Only the dev-server virtual module enables review entries. Never enabled for builds. */
  includeReview?: boolean;
};

export function isVisibleArticle(article: Article, includeReview = false) {
  return isPublishedArticle(article) || (includeReview && article.review.status === "review");
}

export function selectArticles(articles: readonly Article[], slugs: readonly string[] = [], limit = 3, options: ArticleSelectionOptions = {}) {
  const matching = articles.filter(article => isVisibleArticle(article, options.includeReview) &&
    (!options.serviceSlug || article.serviceSlugs?.includes(options.serviceSlug)) &&
    (!options.complaintSlug || article.complaintSlugs?.includes(options.complaintSlug)));
  const manual = [...new Set(slugs)].flatMap(slug => matching.filter(article => article.slug === slug));
  const newest = [...matching].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  const contextual = Boolean(options.serviceSlug || options.complaintSlug);
  const selected = slugs.length
    ? [...manual, ...(contextual ? newest.filter(article => !slugs.includes(article.slug)) : [])]
    : newest;
  return selected.slice(0, Math.max(0, Math.floor(limit)));
}

export function selectRelatedArticles(article: Article, articles: readonly Article[], limit = 3, includeReview = false) {
  const candidates = articles.filter(candidate => candidate.slug !== article.slug && isVisibleArticle(candidate, includeReview));
  const manual = selectArticles(candidates, article.relatedArticleSlugs ?? [], Infinity, { includeReview });
  const matching = selectArticles(candidates.filter(candidate =>
    candidate.serviceSlugs?.some(slug => article.serviceSlugs?.includes(slug)) ||
    candidate.complaintSlugs?.some(slug => article.complaintSlugs?.includes(slug))
  ), [], Infinity, { includeReview });
  // No manual selection means contextual matches, never every recent article.
  const explicit = article.relatedArticleSlugs?.length ? manual : [];
  return [...explicit, ...matching.filter(candidate => !explicit.some(item => item.slug === candidate.slug))].slice(0, limit);
}

export function articlePath(slug: string): `/blog/${string}` {
  return `/blog/${slug}`;
}

export function formatArticleDate(date: string) {
  if (!isValidArticleDate(date)) return "";
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}
