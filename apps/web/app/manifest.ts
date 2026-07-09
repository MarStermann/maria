import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Maria A.-S.",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ee",
    theme_color: "#344a2f",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
