import { useId, type ReactNode } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Typography } from "@mui/material";
import type { Article } from "@maria/content-model";
import { ArticleCollection } from "@/components/article-collection";
import { articlePreviewEnabled, siteArticles } from "@/content/articles";
import { selectSectionArticles, type ArticleSectionSettings } from "@/lib/article-sections";
import { publishedTopics, topicPath } from "@/content/article-topics";

export type ArticleSectionProps = ArticleSectionSettings & {
  articles?: readonly Article[];
  emptyState?: ReactNode;
  id?: string;
  showAllLink?: boolean;
  editorPreview?: boolean;
};

export function ArticleSection({ heading, description, articles: sourceArticles = siteArticles, emptyState, id, showAllLink = true, editorPreview = false, ...settings }: ArticleSectionProps) {
  const headingId = useId();
  const articles = selectSectionArticles(sourceArticles, settings, { includeReview: articlePreviewEnabled, editorPreview });
  const href = settings.source === "news" ? "/blog/aktuelles" : settings.source === "topic" && settings.topicSlug ? topicPath(settings.topicSlug) : "/blog";
  if (settings.enabled === false || (settings.source === "topic" && !publishedTopics.some(topic => topic.slug === settings.topicSlug)) || (!articles.length && !emptyState)) return null;
  return <Box component="section" id={id} aria-labelledby={headingId} sx={{ py: { xs: 4, md: 5 }, scrollMarginTop: 100 }}>
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 3 }}>
      <Box>
        <Typography component="h2" variant="h2" id={headingId}>{heading || "Zum Weiterlesen"}</Typography>
        {description && <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>{description}</Typography>}
      </Box>
      {showAllLink && articles.length > 0 && <Button href={href} endIcon={<ArrowForwardRoundedIcon />}>{settings.source === "news" ? "Alles Aktuelle" : "Alle Artikel"}</Button>}
    </Box>
    {articles.length ? <ArticleCollection articles={articles} layout={settings.layout} /> : emptyState}
  </Box>;
}

export function NewsSection(props: ArticleSectionProps) {
  return <ArticleSection heading="Aktuelles" {...props} source="news" />;
}
