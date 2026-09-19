import articles, { previewEnabled } from "virtual:published-articles";
import { selectArticles } from "@/lib/article-content";

export const publishedArticles = selectArticles(articles, [], Infinity);
export const articlePreviewEnabled = previewEnabled;
export const siteArticles = selectArticles(articles, [], Infinity, { includeReview: articlePreviewEnabled });
