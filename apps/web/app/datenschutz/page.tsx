import { Typography } from "@mui/material";

import { StaticPage } from "@/components/static-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Datenschutz",
  description: "Datenschutzhinweise von Maria Alscher-Scheunemann.",
  path: "/datenschutz",
  noIndex: true
});

export default function DatenschutzPage() {
  return (
    <StaticPage eyebrow="Rechtliches" title="Datenschutz">
      <Typography color="text.secondary">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
      </Typography>
    </StaticPage>
  );
}
