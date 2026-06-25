import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/leistungen",
  "/ueber-mich",
  "/kontakt"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const serviceRoutes = siteConfig.services.map((service) => `/leistungen/${service.slug}` as const);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
