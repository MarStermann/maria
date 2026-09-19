import { useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import type { Article, ArticleTopic } from "@maria/content-model";
import { ArticleCollection } from "@/components/article-collection";
import { ArticleTopics } from "@/components/article-topics";
import { NewsSection } from "@/components/article-section";
import { publishedTopics } from "@/content/article-topics";
import { Eyebrow } from "@/components/static-page";
import { siteArticles } from "@/content/articles";
import { editablePages, editableServices } from "@/content/editable";
import { brandAsset, brandColors } from "@/theme/brand";

export function BlogPage({ content = editablePages.blogPage, articles = siteArticles, topics = publishedTopics, editorPreview = false }: {
  content?: typeof editablePages.blogPage;
  articles?: readonly Article[];
  topics?: readonly ArticleTopic[];
  editorPreview?: boolean;
} = {}) {
  const [category, setCategory] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const services = editableServices.filter(service => articles.some(article => article.serviceSlugs?.includes(service.slug)));
  const visibleTopics = topics.filter(topic => articles.some(article => article.topicSlugs?.includes(topic.slug)));
  const filtered = articles.filter(article => (!category || article.topicSlugs?.includes(category)) && (!serviceSlug || article.serviceSlugs?.includes(serviceSlug)));
  return <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
    <Box sx={{ maxWidth: 760, mb: { xs: 5, md: 6 } }}>
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <Typography component="h1" variant="h1">{content.title}</Typography>
      <Typography color="text.secondary" sx={{ fontSize: "1.15rem", lineHeight: 1.8, mt: 2.5 }}>{content.lead}</Typography>
    </Box>
    <NewsSection {...content.news} id="aktuelles" articles={articles} editorPreview={editorPreview} />
    {visibleTopics.length > 0 && <Box component="section" aria-labelledby="blog-topics-heading" sx={{ py: { xs: 4, md: 5 }, borderTop: "1px solid", borderColor: "divider" }}>
      <Typography component="h2" variant="h2" id="blog-topics-heading">{content.topicsTitle}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3, maxWidth: 720 }}>{content.topicsDescription}</Typography>
      <ArticleTopics topics={visibleTopics} articles={articles} />
    </Box>}
    {articles.length > 0 && <Box component="section" aria-label="Artikel filtern" sx={{ mb: 4, pt: 5, borderTop: "1px solid", borderColor: "divider" }}>
      <Typography component="h2" variant="h2" sx={{ mb: 3 }}>{content.allArticlesTitle}</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, p: { xs: 2.5, md: 3 }, bgcolor: brandColors.linen, borderRadius: "8px" }}>
        <TextField select label="Themenbereich" value={category} onChange={event => setCategory(event.target.value)} fullWidth>
          <MenuItem value="">Alle Themen</MenuItem>
          {visibleTopics.map(topic => <MenuItem key={topic.slug} value={topic.slug}>{topic.title}</MenuItem>)}
        </TextField>
        <TextField select label="Therapieverfahren" value={serviceSlug} onChange={event => setServiceSlug(event.target.value)} fullWidth>
          <MenuItem value="">Alle Therapieverfahren</MenuItem>
          {services.map(service => <MenuItem key={service.slug} value={service.slug}>{service.title}</MenuItem>)}
        </TextField>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 1, mt: 1.5, minHeight: 38 }}>
        <Typography aria-live="polite" color="text.secondary" sx={{ fontSize: "0.9rem" }}>{filtered.length} Artikel{category || serviceSlug ? " zur Auswahl" : " zum Entdecken"}</Typography>
        {(category || serviceSlug) && <Button size="small" onClick={() => { setCategory(""); setServiceSlug(""); }}>Filter zurücksetzen</Button>}
      </Box>
    </Box>}
    {filtered.length ? <Box component="section" aria-label="Blogartikel">
      <ArticleCollection articles={filtered} />
    </Box> : articles.length ? <Box component="section" sx={{ py: 5, textAlign: "center" }}>
      <Typography component="h2" variant="h3">Zu dieser Auswahl gibt es noch keinen Artikel.</Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5 }}>Wählen Sie ein anderes Thema oder entdecken Sie alle Beiträge.</Typography>
      <Button onClick={() => { setCategory(""); setServiceSlug(""); }} sx={{ mt: 2 }}>Alle Artikel anzeigen</Button>
    </Box> : <Box component="section" aria-labelledby="blog-empty-heading"
      sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }, bgcolor: brandColors.linen, borderRadius: "8px", overflow: "hidden" }}>
      <Box component="img" src={brandAsset.leftStillLifePath} alt="" aria-hidden="true"
        sx={{ display: "block", width: "100%", height: { xs: 210, md: "100%" }, maxHeight: 400, objectFit: "cover" }} />
      <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, alignSelf: "center" }}>
        <Typography component="h2" variant="h2" id="blog-empty-heading">{content.emptyTitle}</Typography>
        <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>{content.emptyDescription}</Typography>
        <Button href="/therapieverfahren" endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 2.5 }}>Therapieverfahren entdecken</Button>
      </Box>
    </Box>}
  </Container>;
}
