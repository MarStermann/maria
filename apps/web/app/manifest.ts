import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Praxis Maria",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf7",
    theme_color: "#315f4d",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
