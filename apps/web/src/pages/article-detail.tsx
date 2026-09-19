import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import Markdown from "react-markdown";
import type { Article } from "@maria/content-model";
import { ArticleImage } from "@/components/article-image";
import { ArticleCard } from "@/components/article-card";
import { articlePreviewEnabled, siteArticles } from "@/content/articles";
import { editableServices } from "@/content/editable";
import { complaintEntries } from "@/content/complaints";
import { publishedTopics, topicPath } from "@/content/article-topics";
import { formatArticleDate, selectRelatedArticles } from "@/lib/article-content";

export function ArticleDetailPage({ article }: { article: Article }) {
  const services = editableServices.filter(service => article.serviceSlugs?.includes(service.slug));
  const complaints = complaintEntries.filter(entry => article.complaintSlugs?.includes(entry.topic.slug));
  const relatedArticles = selectRelatedArticles(article, siteArticles, 2, articlePreviewEnabled);
  return <Container component="article" maxWidth="md" sx={{ py: { xs: 5, md: 8 }, overflowWrap: "anywhere" }}>
    <Button href="/blog" startIcon={<ArrowBackRoundedIcon />} sx={{ mb: 4 }}>Alle Artikel</Button>
    <Typography color="text.secondary" sx={{ fontSize: "0.9rem", mb: 2 }}>
      {article.categories.length > 0 && <>{article.categories.join(" · ")} · </>}
      <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
      {article.author && <> · {article.author}</>}
    </Typography>
    <Typography component="h1" variant="h1">{article.title}</Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
      {article.isNews && <Link href="/blog/aktuelles" sx={{ fontSize: "0.9rem" }}>Aktuelles</Link>}
      {publishedTopics.filter(topic => article.topicSlugs?.includes(topic.slug)).map(topic => <Link key={topic.slug} href={topicPath(topic.slug)} sx={{ fontSize: "0.9rem" }}>{topic.title}</Link>)}
    </Box>
    <Typography color="text.secondary" sx={{ fontSize: "1.2rem", lineHeight: 1.8, mt: 3 }}>{article.teaser}</Typography>
    <Box component="figure" sx={{ mx: 0, my: 4 }}>
      <Box sx={{ borderRadius: "8px", overflow: "hidden" }}><ArticleImage src={article.image} alt={article.imageAlt} loading="eager" position={article.imagePosition} scale={article.imageScale} /></Box>
      {article.imageSource && <Typography component="figcaption" color="text.secondary" sx={{ mt: 1, fontSize: "0.8rem" }}>{article.imageSource}</Typography>}
    </Box>
    <Box sx={{ maxWidth: 720, mx: "auto", fontSize: "1.05rem", lineHeight: 1.9,
      "& h2, & h3, & h4": { fontFamily: "Georgia, serif", color: "primary.main", lineHeight: 1.35, mt: 4 },
      "& a": { color: "primary.main", textUnderlineOffset: "3px" }, "& img": { height: "auto", borderRadius: "8px" },
      "& blockquote": { borderLeft: "3px solid", borderColor: "secondary.main", ml: 0, pl: 3, color: "text.secondary" },
      "& pre": { overflowX: "auto", p: 2, bgcolor: "background.paper" } }}>
      <Markdown skipHtml components={{ h1: ({ children }) => <h2>{children}</h2> }}>{article.body}</Markdown>
      {article.sources?.length ? <Box component="aside" sx={{ borderTop: "1px solid", borderColor: "divider", mt: 5, pt: 3 }}>
        <Typography component="h2" variant="h3">Quellen und weiterführende Informationen</Typography>
        <Box component="ul" sx={{ pl: 2.5 }}>{article.sources.map(source => <li key={source}>
          {/^https?:\/\//.test(source) ? <Link href={source}>{source}</Link> : source}
        </li>)}</Box>
      </Box> : null}
      {(services.length > 0 || complaints.length > 0) && <Box component="aside" sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: "8px", mt: 4, p: { xs: 2.5, sm: 3 } }}>
        {services.length > 0 && <>
          <Typography component="h2" variant="h3" sx={{ "&&": { mt: 0 } }}>Passende Therapieverfahren</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Mehr zum Ablauf und zu den Grenzen der Verfahren:</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}>{services.map(service => <Button key={service.slug} href={`/therapieverfahren/${service.slug}`} endIcon={<ArrowForwardRoundedIcon />} sx={{ textAlign: "left" }}>{service.title}</Button>)}</Box>
        </>}
        {complaints.length > 0 && <>
          <Typography component="h2" variant="h3" sx={{ "&&": { mt: services.length ? 3 : 0 } }}>Verwandte Themen</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>{complaints.map(({ topic }) => <Button key={topic.slug} href={`/beschwerden/${topic.slug}`} size="small">{topic.title}</Button>)}</Box>
        </>}
      </Box>}
    </Box>
    {relatedArticles.length > 0 && <Box component="section" aria-labelledby="related-articles-heading" sx={{ mt: 6 }}>
      <Typography component="h2" variant="h2" id="related-articles-heading" sx={{ mb: 3 }}>Zum Weiterlesen</Typography>
      <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" } }}>{relatedArticles.map(related => <ArticleCard key={related.slug} article={related} headingComponent="h3" />)}</Box>
    </Box>}
    <Button href="/blog" startIcon={<ArrowBackRoundedIcon />} sx={{ mt: 5 }}>Zurück zum Blog</Button>
  </Container>;
}
