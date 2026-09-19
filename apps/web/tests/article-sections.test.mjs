import assert from "node:assert/strict";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const server = await createServer({ root: fileURLToPath(new URL("../", import.meta.url)), server: { middlewareMode: true, watch: null }, optimizeDeps: { noDiscovery: true, include: [] }, appType: "custom", logLevel: "error" });
after(() => server.close());
const { selectSectionArticles } = await server.ssrLoadModule("/src/lib/article-sections.ts");
const article = (slug, overrides = {}) => ({
  slug, publishedAt: "2026-09-19", topicSlugs: [], serviceSlugs: [], complaintSlugs: [],
  review: { status: "published", medicalReviewRequired: false }, ...overrides
});
const slugs = entries => entries.map(entry => entry.slug);

test("Aktuelles is explicit, newest first and independent of topic membership", () => {
  const entries = [article("older", { isNews: true, topicSlugs: ["one"], publishedAt: "2025-01-01" }), article("newer", { isNews: true }), article("ordinary", { topicSlugs: ["one"] })];
  assert.deepEqual(slugs(selectSectionArticles(entries, { source: "news", limit: 1 })), ["newer"]);
  assert.deepEqual(slugs(selectSectionArticles(entries, { source: "topic", topicSlug: "one" })), ["ordinary", "older"]);
});
test("one article can belong to multiple topics and unmatched topics stay empty", () => {
  const entries = [article("both", { topicSlugs: ["one", "two"] }), article("other", { topicSlugs: ["three"] })];
  for (const topicSlug of ["one", "two"]) assert.deepEqual(slugs(selectSectionArticles(entries, { source: "topic", topicSlug })), ["both"]);
  assert.deepEqual(selectSectionArticles(entries, { source: "topic" }), []);
  assert.deepEqual(selectSectionArticles(entries, { source: "topic", topicSlug: "missing" }), []);
});
test("switching source ignores irrelevant manual choices; explicit empty selections stay empty", () => {
  const entries = [article("news", { isNews: true }), article("ordinary")];
  assert.deepEqual(slugs(selectSectionArticles(entries, { source: "news", articleSlugs: ["ordinary"] })), ["news"]);
  assert.deepEqual(selectSectionArticles(entries, { source: "selection", articleSlugs: [] }), []);
});
test("publication rules apply to every selection and review preview remains opt-in", () => {
  const entries = [article("draft", { isNews: true, review: { status: "draft" } }), article("review", { isNews: true, review: { status: "review" } })];
  assert.deepEqual(selectSectionArticles(entries, { source: "news" }), []);
  assert.deepEqual(slugs(selectSectionArticles(entries, { source: "news" }, { includeReview: true })), ["review"]);
});
test("contextual service assignments retain their selection behavior", () => {
  const entries = [article("old", { serviceSlugs: ["service"], publishedAt: "2025-01-01" }), article("new", { serviceSlugs: ["service"] }), article("unrelated")];
  assert.deepEqual(slugs(selectSectionArticles(entries, { serviceSlug: "service", articleSlugs: ["old"] })), ["old", "new"]);
});
