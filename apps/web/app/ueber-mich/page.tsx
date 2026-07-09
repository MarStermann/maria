import { Box, Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Über mich",
  description:
    "Lernen Sie Maria Alscher-Scheunemann und die Haltung ihrer naturheilkundlichen Arbeit kennen.",
  path: "/ueber-mich"
});

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="Über mich"
      lead="Seit 1998 begleitet Maria Alscher-Scheunemann Menschen in ihrer naturheilkundlichen Praxis in Hamburg."
      title={siteConfig.practitionerName}
    >
      <Box component="section">
        <Typography component="h2" variant="h2">
          Arbeitsweise
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Im Mittelpunkt stehen sorgfältiges Zuhören, transparente Empfehlungen und eine
          Begleitung, die den Menschen nicht auf einzelne Beschwerden reduziert.
        </Typography>
      </Box>
    </StaticPage>
  );
}
