import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Leistungen",
  description:
    "Leistungen von Maria Alscher-Scheunemann: Akupunktur, klassische Naturheilkunde, Frauenheilkunde, Diagnostik und Beratung.",
  path: "/leistungen"
});

export default function ServicesPage() {
  return (
    <StaticPage
      eyebrow="Leistungen"
      lead="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
      title="Akupunktur und Naturheilkunde"
    >
      <Box
        component="section"
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }
        }}
      >
        {siteConfig.services.map((service) => (
          <Card component="article" key={service.slug} variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <SpaRoundedIcon sx={{ color: "secondary.main", mb: 2 }} />
              <Typography component="h2" variant="h3">
                {service.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                {service.summary}
              </Typography>
              <Button
                endIcon={<ArrowForwardRoundedIcon />}
                href={`/leistungen/${service.slug}`}
                sx={{ mt: 2, px: 0 }}
              >
                Details ansehen
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </StaticPage>
  );
}
