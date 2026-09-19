import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Button } from "@mui/material";

import { StaticPage } from "@/components/static-page";

export function NotFoundPage() {
  return (
    <StaticPage
      eyebrow="404"
      lead="Die angeforderte Seite existiert nicht oder wurde noch nicht veröffentlicht."
      title="Seite nicht gefunden"
    >
      <Button href="/" startIcon={<HomeRoundedIcon />} variant="contained">
        Zur Startseite
      </Button>
    </StaticPage>
  );
}
