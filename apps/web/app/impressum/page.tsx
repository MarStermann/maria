import { Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Impressum",
  description: "Impressum von Maria Alscher-Scheunemann.",
  path: "/impressum",
  noIndex: true
});

export default function ImpressumPage() {
  return (
    <StaticPage eyebrow="Rechtliches" title="Impressum">
      <Typography color="text.secondary">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
      </Typography>
    </StaticPage>
  );
}
