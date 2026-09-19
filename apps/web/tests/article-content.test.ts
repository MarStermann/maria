import assert from "node:assert/strict";
import test from "node:test";
import type { Article } from "@maria/content-model";
import { isPublishedArticle, isValidArticleDate, selectArticles, selectRelatedArticles } from "../src/lib/article-content.ts";

const article = (slug: string, overrides: Partial<Article> = {}): Article => ({
  type: "article", slug, title: slug, teaser: "Beschreibung", image: "/image.webp", imageAlt: "", body: "Inhalt",
  publishedAt: "2026-09-19", categories: [], serviceSlugs: [], seo: { title: slug, description: "Beschreibung" },
  review: { status: "published", medicalReviewRequired: false }, ...overrides
});

test("drafts, review entries and archived articles cannot become cards", () => {
  for (const status of ["draft", "review", "archived"] as const) {
    assert.equal(isPublishedArticle(article("hidden", { review: { status, medicalReviewRequired: false } })), false);
  }
});

test("medical articles require explicit approval and a real review date", () => {
  const review = { status: "published" as const, medicalReviewRequired: true };
  assert.equal(isPublishedArticle(article("medical", { review })), false);
  assert.equal(isPublishedArticle(article("medical", { review: { ...review, reviewedBy: " ", lastReviewedAt: "2026-09-19" } })), false);
  assert.equal(isPublishedArticle(article("medical", { review: { ...review, reviewedBy: "Redaktion", lastReviewedAt: "2026-02-31" } })), false);
  assert.equal(isPublishedArticle(article("medical", { review: { ...review, reviewedBy: "Redaktion", lastReviewedAt: "2026-09-19" } })), true);
});

test("latest selection is stable and does not mutate the content source", () => {
  const entries = [article("old", { publishedAt: "2025-01-01" }), article("b"), article("a")];
  assert.deepEqual(selectArticles(entries, [], 2).map(item => item.slug), ["a", "b"]);
  assert.equal(entries[0]?.slug, "old");
});

test("manual selections preserve order, deduplicate and skip unavailable articles", () => {
  const entries = [article("one"), article("two"), article("hidden", { review: { status: "draft", medicalReviewRequired: false } })];
  assert.deepEqual(selectArticles(entries, ["two", "missing", "hidden", "one", "two"], 6).map(item => item.slug), ["two", "one"]);
  assert.deepEqual(selectArticles(entries, ["missing"]), []);
  assert.deepEqual(selectArticles(entries, [], 0), []);
});

test("calendar dates reject malformed and rolled-over dates", () => {
  for (const value of ["", "today", "2026-2-01", "2026-02-29", "2026-13-01"]) assert.equal(isValidArticleDate(value), false);
  assert.equal(isValidArticleDate("2024-02-29"), true);
});

test("service assignments isolate cards and prioritize only matching manual selections", () => {
  const entries = [
    article("new", { serviceSlugs: ["pflanzenheilkunde"] }),
    article("pinned", { serviceSlugs: ["pflanzenheilkunde"], publishedAt: "2025-01-01" }),
    article("unrelated", { serviceSlugs: ["ohrakupunktur"] })
  ];
  assert.deepEqual(selectArticles(entries, ["unrelated", "pinned"], 3, { serviceSlug: "pflanzenheilkunde" }).map(item => item.slug), ["pinned", "new"]);
  assert.deepEqual(selectArticles(entries, [], 3, { serviceSlug: "unknown" }), []);
  assert.deepEqual(selectArticles(entries, ["unrelated"], 3, { serviceSlug: "unknown" }), []);
});

test("complaint assignments work independently and legacy entries have no implicit assignment", () => {
  const entries = [article("matching", { complaintSlugs: ["heuschnupfen"] }), article("legacy")];
  assert.deepEqual(selectArticles(entries, [], 3, { complaintSlug: "heuschnupfen" }).map(item => item.slug), ["matching"]);
  assert.deepEqual(selectArticles(entries, [], 3, { complaintSlug: "heuschnupfen", serviceSlug: "ohrakupunktur" }), []);
});

test("explicit review preview never includes drafts, archived entries or falsely published articles", () => {
  const entries = [article("live"), ...(["draft", "review", "archived", "published"] as const).map(status =>
    article(status, { review: { status, medicalReviewRequired: true } }))];
  assert.deepEqual(selectArticles(entries, [], 10).map(item => item.slug), ["live"]);
  assert.deepEqual(selectArticles(entries, [], 10, { includeReview: true }).map(item => item.slug), ["live", "review"]);
});

test("related articles use explicit choices then shared assignments and never fall back to unrelated posts", () => {
  const current = article("current", { serviceSlugs: ["pflanzenheilkunde"], relatedArticleSlugs: ["current", "manual", "hidden"] });
  const entries = [current, article("related", { serviceSlugs: ["pflanzenheilkunde"] }), article("manual"), article("unrelated"),
    article("hidden", { review: { status: "draft", medicalReviewRequired: false } })];
  assert.deepEqual(selectRelatedArticles(current, entries).map(item => item.slug), ["manual", "related"]);
  assert.deepEqual(selectRelatedArticles(article("unassigned"), entries), []);
  assert.deepEqual(selectRelatedArticles(article("missing", { relatedArticleSlugs: ["not-found"] }), entries), []);
});
