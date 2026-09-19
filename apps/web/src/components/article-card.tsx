import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Article } from "@maria/content-model";
import { ArticleImage } from "@/components/article-image";
import { articlePath, formatArticleDate } from "@/lib/article-content";
import { publishedTopics } from "@/content/article-topics";

export function ArticleCard({ article, headingComponent = "h2", loading = "lazy", variant = "card" }: {
  article: Article;
  headingComponent?: "h2" | "h3";
  loading?: "eager" | "lazy";
  variant?: "card" | "list" | "featured";
}) {
  const compact = variant === "list";
  const horizontal = variant !== "card";
  const topicLabel = publishedTopics.find(topic => article.topicSlugs?.includes(topic.slug))?.title ?? article.categories[0];
  return (
    <Card component="article" variant="outlined" data-article-card={article.slug}
      sx={{ height: "100%", borderRadius: "8px", overflow: "hidden", "&:hover, &:focus-within": { borderColor: "primary.main" } }}>
      <CardActionArea href={articlePath(article.slug)} aria-label={`Artikel lesen: ${article.title}`}
        sx={{ height: "100%", display: "flex", flexDirection: horizontal ? { xs: compact ? "row" : "column", sm: "row" } : "column", alignItems: "stretch", "&.Mui-focusVisible": { outline: "3px solid", outlineColor: "secondary.main", outlineOffset: -3 } }}>
        <Box sx={{ flexShrink: 0, overflow: "hidden", alignSelf: compact ? "flex-start" : "stretch", mt: compact ? 2 : 0, ml: compact ? 2 : 0,
          borderRadius: compact ? "4px" : 0, height: compact ? { xs: 80, sm: 112 } : undefined,
          width: horizontal ? { xs: compact ? 80 : "100%", sm: compact ? 144 : "48%" } : "100%", "& img": { height: "100%" } }}>
          <ArticleImage src={article.image} alt={article.imageAlt} loading={loading} position={article.imagePosition} scale={article.imageScale} />
        </Box>
        <CardContent sx={{ minWidth: 0, display: "flex", flex: 1, flexDirection: "column", p: compact ? { xs: 2, md: 2.5 } : { xs: 2.5, md: 3 } }}>
          <Typography color="text.secondary" sx={{ fontSize: "0.78rem", mb: 1.5 }}>
            {topicLabel && <>{topicLabel} · </>}
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          </Typography>
          <Typography component={headingComponent} variant={variant === "featured" ? "h2" : "h3"} sx={{ overflowWrap: "anywhere", ...(compact ? { fontSize: { xs: "1.12rem", sm: "1.35rem" } } : {}) }}>{article.title}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, flex: 1, lineHeight: 1.75, overflowWrap: "anywhere", fontSize: compact ? "0.9rem" : undefined,
            ...(compact ? { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" } : {}) }}>{article.teaser}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "primary.main", borderTop: "1px solid", borderColor: "divider", mt: compact ? 1.5 : 2.5, pt: compact ? 1.5 : 2 }}>
            <Typography component="span" sx={{ fontSize: "0.9rem", fontWeight: 700 }}>Artikel lesen</Typography>
            <ArrowForwardRoundedIcon fontSize="small" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
