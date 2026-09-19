import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Article, ArticleTopic } from "@maria/content-model";
import { publishedTopics, topicPath } from "@/content/article-topics";
import { siteArticles } from "@/content/articles";

export function ArticleTopics({ topics = publishedTopics, articles = siteArticles }: { topics?: readonly ArticleTopic[]; articles?: readonly Article[] }) {
  return <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" } }}>
    {topics.map(topic => {
      const count = articles.filter(article => article.topicSlugs?.includes(topic.slug)).length;
      if (!count) return null;
      return <Card key={topic.slug} variant="outlined" sx={{ borderRadius: "8px", "&:hover, &:focus-within": { borderColor: "primary.main" } }}>
        <CardActionArea href={topicPath(topic.slug)} sx={{ height: "100%", "&.Mui-focusVisible": { outline: "3px solid", outlineColor: "secondary.main", outlineOffset: -3 } }}>
          <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography component="h3" variant="h3" sx={{ overflowWrap: "anywhere" }}>{topic.title}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3, flex: 1 }}>{topic.description}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, color: "primary.main", alignItems: "center" }}>
              <Typography sx={{ fontSize: "0.85rem" }}>{count} {count === 1 ? "Beitrag" : "Beiträge"}</Typography>
              <ArrowForwardRoundedIcon fontSize="small" />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>;
    })}
  </Box>;
}
