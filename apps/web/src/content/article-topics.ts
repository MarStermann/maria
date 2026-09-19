import topics from "virtual:article-topics";

export const publishedTopics = [...topics].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "de"));

export function topicPath(slug: string): `/blog/themen/${string}` {
  return `/blog/themen/${slug}`;
}
