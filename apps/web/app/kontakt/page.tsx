import { Box, Card, CardContent, Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Kontakt zu Maria Alscher-Scheunemann in Hamburg. Termin anfragen, Anliegen kurz schildern und nächste Schritte klären.",
  path: "/kontakt"
});

export default function ContactPage() {
  return (
    <StaticPage
      eyebrow="Kontakt"
      lead="Rufen Sie gerne an oder schreiben Sie eine kurze Nachricht mit Ihrem Anliegen. Ein kurzer persönlicher Kontakt im Vorfeld hilft oft, erste Fragen zu klären."
      title="Termin anfragen"
    >
      <Box
        component="section"
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }
        }}
      >
        {[
          ["E-Mail", siteConfig.contact.email],
          ["Telefon", siteConfig.contact.phone],
          ["Adresse", `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.locality}`],
          ["Sprechzeiten", siteConfig.openingHours]
        ].map(([label, value]) => (
          <Card key={label} variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Typography component="h2" variant="h3">
                {label}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </StaticPage>
  );
}
