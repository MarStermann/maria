import type { Article, ArticleTopic } from "@maria/content-model";

// A new CMS entry needs a complete shape even before its required fields are filled.
export const articleDefaults: Article = {
  type: "article", slug: "neuer-artikel", title: "Neuer Artikel", teaser: "",
  image: "", imageAlt: "", body: "", publishedAt: "", categories: [],
  topicSlugs: [], isNews: false, imagePosition: "center", imageScale: 1,
  serviceSlugs: [], complaintSlugs: [], relatedArticleSlugs: [],
  seo: { title: "", description: "", noIndex: false },
  review: { status: "draft", medicalReviewRequired: true, reviewedBy: "", lastReviewedAt: "" }
};

export const topicDefaults: ArticleTopic = {
  type: "articleTopic", slug: "neues-thema", title: "Neuer Themenbereich", description: "", order: 10,
  seo: { title: "", description: "", noIndex: false }, review: { status: "draft", medicalReviewRequired: false }
};
