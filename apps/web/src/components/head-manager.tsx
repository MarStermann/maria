import { useEffect } from "react";

import { siteConfig } from "@/content/site";
import { absoluteUrl, getPageTitle, shouldIndexPage, type PageMeta } from "@/lib/seo";

type HeadManagerProps = {
  meta: PageMeta;
};

export function HeadManager({ meta }: HeadManagerProps) {
  useEffect(() => {
    const title = getPageTitle(meta);
    const canonicalUrl = absoluteUrl(meta.path);
    const imageUrl = absoluteUrl(meta.image ?? "/og-default.svg");
    const robots = shouldIndexPage(meta) ? "index,follow" : "noindex,nofollow";

    document.title = title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "application-name", siteConfig.name);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:width", String(meta.imageWidth ?? 1200));
    upsertMeta("property", "og:image:height", String(meta.imageHeight ?? 630));
    upsertMeta("property", "og:image:alt", `${siteConfig.name} - ${meta.title}`);
    upsertLink("canonical", canonicalUrl);
  }, [meta]);

  return null;
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.append(element);
  }

  element.href = href;
}
