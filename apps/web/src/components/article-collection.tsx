import { Box } from "@mui/material";
import type { Article } from "@maria/content-model";
import { ArticleCard } from "@/components/article-card";

export function ArticleCollection({ articles, layout = "cards", headingComponent = "h3" }: {
  articles: readonly Article[];
  layout?: string;
  headingComponent?: "h2" | "h3";
}) {
  const [first, ...rest] = articles;
  if (!first) return null;
  if (layout === "featured") return <Box data-article-layout="featured" sx={{ display: "grid", gap: 3 }}>
    <ArticleCard article={first} variant="featured" headingComponent={headingComponent} loading="eager" />
    {rest.length > 0 && <ArticleCollection articles={rest} layout="list" headingComponent={headingComponent} />}
  </Box>;
  return <Box data-article-layout={layout === "list" ? "list" : "cards"} sx={{ display: "grid", gap: 3,
    gridTemplateColumns: layout === "list" ? "1fr" : { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" } }}>
    {articles.map((article, index) => <ArticleCard key={article.slug} article={article} variant={layout === "list" ? "list" : "card"} headingComponent={headingComponent} loading={index < 3 ? "eager" : "lazy"} />)}
  </Box>;
}
