import { Box, Card, CardContent, Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/content/site";
import { editablePages } from "@/content/editable";

export function ContactPage({ content = editablePages.contact }: { content?: typeof editablePages.contact } = {}) {
  return (
    <StaticPage
      eyebrow={content.eyebrow}
      lead={content.lead}
      title={content.title}
    >
      <Box
        component="section"
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }
        }}
      >
        {[
          ["E-Mail", siteConfig.contact.email],
          ["Telefon", siteConfig.contact.phone],
          [
            "Adresse",
            `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.locality}`
          ],
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
      <Box component="section">
        <Typography component="h2" variant="h2">
          {content.privacyHeading}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          {content.privacyText}
        </Typography>
      </Box>
    </StaticPage>
  );
}
