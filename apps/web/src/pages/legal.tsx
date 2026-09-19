import { Box, Link, Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { siteConfig } from "@/content/site";

function PracticeContact() {
  return <Box component="address" sx={{ fontStyle: "normal", overflowWrap: "anywhere" }}>
    <Typography>{siteConfig.name}</Typography>
    <Typography>{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.locality}</Typography>
    <Typography sx={{ mt: 2 }}>Telefon: <Link href="tel:+494043271084">{siteConfig.contact.phone}</Link></Typography>
    <Typography>E-Mail: <Link href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</Link></Typography>
  </Box>;
}

export function ImpressumPage() {
  return (
    <StaticPage eyebrow="Rechtliches" title="Impressum">
      <Box>
        <Typography component="h2" variant="h3" sx={{ mb: 2 }}>Naturheilpraxis</Typography>
        <PracticeContact />
      </Box>
      <Box>
        <Typography component="h2" variant="h3" sx={{ mb: 2 }}>Berufsangaben</Typography>
        <Typography color="text.secondary">Berufsbezeichnung: Heilpraktikerin. Die Erlaubnis wurde am 19. Juni 1997 in Deutschland durch die Behörde für Arbeit, Gesundheit und Soziales erteilt.</Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>Verantwortlich für den Inhalt: {siteConfig.name}.</Typography>
        <Typography sx={{ mt: 2 }}><Link href="https://www.alscher-scheunemann.de/berufsrechtliche-angaben-und-impressum/">Vollständige berufsrechtliche Angaben und Impressum der Praxis</Link></Typography>
      </Box>
    </StaticPage>
  );
}

export function DatenschutzPage() {
  return (
    <StaticPage eyebrow="Rechtliches" title="Datenschutz">
      <Box>
        <Typography component="h2" variant="h3" sx={{ mb: 2 }}>Verantwortlich für den Datenschutz</Typography>
        <PracticeContact />
      </Box>
      <Box>
        <Typography component="h2" variant="h3" sx={{ mb: 2 }}>Fragen zum Datenschutz</Typography>
        <Typography color="text.secondary">Bei Fragen zum Umgang mit Ihren personenbezogenen Daten können Sie sich direkt an die Praxis wenden.</Typography>
        <Typography sx={{ mt: 2 }}><Link href="https://www.alscher-scheunemann.de/datenschutzhinweise/">Datenschutzhinweise der Praxis lesen</Link></Typography>
      </Box>
    </StaticPage>
  );
}
