import { Box } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { TherapyCard } from "@/components/therapy-card";
import { siteConfig } from "@/content/site";
import { editablePages } from "@/content/editable";

export function ServicesPage({ content = editablePages.servicesPage, services = siteConfig.services }: {
  content?: typeof editablePages.servicesPage;
  services?: typeof siteConfig.services;
} = {}) {
  return (
    <StaticPage
      eyebrow={content.eyebrow}
      lead={content.lead}
      title={content.title}
    >
      <Box
        component="section"
        sx={{
          alignItems: "stretch",
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }
        }}
      >
        {services.map((service, index) => (
          <TherapyCard key={service.slug} loading={index > 1 ? "lazy" : "eager"} service={service} />
        ))}
      </Box>
    </StaticPage>
  );
}
