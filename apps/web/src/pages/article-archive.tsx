import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import type { Article, ArticleTopic } from "@maria/content-model";
import { ArticleCollection } from "@/components/article-collection";
import { Eyebrow } from "@/components/static-page";
import { siteArticles } from "@/content/articles";
import { editablePages } from "@/content/editable";

function ArticleArchive({ title, description, articles, emptyText }: { title: string; description: string; articles: readonly Article[]; emptyText: string }) {
  return <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
    <Button href="/blog" startIcon={<ArrowBackRoundedIcon />} sx={{ mb: 4 }}>Zum Blog</Button>
    <Eyebrow>Wissen & Impulse</Eyebrow>
    <Typography component="h1" variant="h1" sx={{ overflowWrap: "anywhere" }}>{title}</Typography>
    <Typography color="text.secondary" sx={{ maxWidth: 760, mt: 2.5, mb: 5, fontSize: "1.15rem" }}>{description}</Typography>
    {articles.length ? <ArticleCollection articles={articles} headingComponent="h2" /> : <Box sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: "8px", p: { xs: 3, md: 4 } }}>
      <Typography color="text.secondary">{emptyText}</Typography>
      <Button href="/blog" sx={{ mt: 2 }}>Weitere Themen entdecken</Button>
    </Box>}
  </Container>;
}

export function NewsPage() {
  const content = editablePages.blogPage;
  return <ArticleArchive title={content.news.heading} description={content.news.description} articles={siteArticles.filter(article => article.isNews)} emptyText={content.newsEmpty} />;
}

export function ArticleTopicPage({ topic, articles = siteArticles }: { topic: ArticleTopic; articles?: readonly Article[] }) {
  return <ArticleArchive title={topic.title} description={topic.description} articles={articles.filter(article => article.topicSlugs?.includes(topic.slug))} emptyText="Zu diesem Thema sind derzeit keine Beiträge verfügbar. Entdecken Sie weitere Artikel im Blog." />;
}
