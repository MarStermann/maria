import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Box, Button, Stack, Typography } from "@mui/material";

import { JsonLd } from "@/components/json-ld";
import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/content/site";
import { buildServiceJsonLd, createPageMetadata } from "@/lib/seo";
import { brandColors } from "@/theme/brand";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/leistungen/${service.slug}`
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildServiceJsonLd(service)} />
      <StaticPage eyebrow="Leistung" lead={service.summary} title={service.title}>
        <Box component="section">
          <Typography component="h2" variant="h2">
            Was Sie erwartet
          </Typography>
          <Stack component="ul" spacing={1.5} sx={{ listStyle: "none", mt: 2.5, p: 0 }}>
            {[
              "Ein ruhiges Gespräch über Ihre aktuelle Situation.",
              "Transparente Erklärung möglicher nächster Schritte.",
              "Eine Empfehlung, die Ihre persönlichen Grenzen respektiert."
            ].map((item) => (
              <Box
                component="li"
                key={item}
                sx={{
                  bgcolor: "background.paper",
                  border: `1px solid ${brandColors.taupe}`,
                  borderLeft: `4px solid ${brandColors.gold}`,
                  borderRadius: 1,
                  p: 2.25
                }}
              >
                <Typography>{item}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button
            href="/kontakt"
            startIcon={<EventAvailableRoundedIcon />}
            variant="contained"
          >
            Termin anfragen
          </Button>
          <Button
            href="/leistungen"
            startIcon={<ArrowBackRoundedIcon />}
            variant="outlined"
          >
            Zurück zu den Leistungen
          </Button>
        </Stack>
      </StaticPage>
    </>
  );
}
