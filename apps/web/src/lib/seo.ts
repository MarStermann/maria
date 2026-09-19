import { siteConfig } from "@/content/site";
import type { ComplaintEntry } from "@/content/complaints";
import { publicEnv } from "@/lib/env";

export type PageMeta = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  noIndex?: boolean;
};

export type SitemapRoute = {
  path: `/${string}`;
  meta: PageMeta;
  changeFrequency?: "weekly" | "monthly";
  priority?: number;
  includeInSitemap?: boolean;
};

export function absoluteUrl(path: string = "/") {
  return new URL(path, siteConfig.baseUrl).toString();
}

export function createPageMeta({
  title,
  description,
  path,
  image = "/og-default.svg",
  imageWidth = 1200,
  imageHeight = 630,
  noIndex = false
}: PageMeta): PageMeta {
  return {
    title,
    description,
    path,
    image,
    imageWidth,
    imageHeight,
    noIndex
  };
}

export function getPageTitle(meta: PageMeta) {
  return `${meta.title} | ${siteConfig.name}`;
}

export function shouldIndexPage(meta: PageMeta) {
  return publicEnv.allowIndexing && !meta.noIndex;
}

export function renderHeadTags(meta: PageMeta) {
  const title = getPageTitle(meta);
  const canonicalUrl = absoluteUrl(meta.path);
  const imageUrl = absoluteUrl(meta.image ?? "/og-default.svg");
  const robots = shouldIndexPage(meta) ? "index,follow" : "noindex,nofollow";

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta name="application-name" content="${escapeHtml(siteConfig.name)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`,
    `<meta property="og:image:width" content="${meta.imageWidth ?? 1200}">`,
    `<meta property="og:image:height" content="${meta.imageHeight ?? 630}">`,
    `<meta property="og:image:alt" content="${escapeHtml(`${siteConfig.name} - ${meta.title}`)}">`
  ].join("\n    ");
}

export function generateRobotsTxt() {
  if (!publicEnv.allowIndexing) {
    return "User-agent: *\nDisallow: /\n";
  }

  return `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
}

export function generateSitemapXml(routes: SitemapRoute[]) {
  const now = new Date().toISOString();
  const entries = routes
    .filter((route) => route.includeInSitemap !== false && !route.meta.noIndex)
    .map((route) => {
      const changeFrequency = route.changeFrequency ?? (route.path === "/" ? "weekly" : "monthly");
      const priority = route.priority ?? (route.path === "/" ? 1 : 0.7);

      return [
        "  <url>",
        `    <loc>${escapeXml(absoluteUrl(route.path))}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        `    <changefreq>${changeFrequency}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    ""
  ].join("\n");
}

export function generateManifestJson() {
  return `${JSON.stringify(
    {
      name: siteConfig.name,
      short_name: "Praxis Alscher",
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
    },
    null,
    2
  )}\n`;
}

export function buildLocalBusinessJsonLd() {
  const hasAddress = Boolean(siteConfig.address.street && siteConfig.address.postalCode);

  return removeUndefined({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    image: absoluteUrl("/og-default.svg"),
    telephone: siteConfig.contact.phone.startsWith("[") ? undefined : siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          postalCode: siteConfig.address.postalCode,
          addressLocality: siteConfig.address.locality,
          addressCountry: siteConfig.address.country
        }
      : undefined,
    areaServed: siteConfig.city.startsWith("[") ? undefined : siteConfig.city,
    makesOffer: siteConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: absoluteUrl(`/therapieverfahren/${service.slug}`)
      }
    }))
  });
}

export function buildServiceJsonLd(service: (typeof siteConfig.services)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/therapieverfahren/${service.slug}`),
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.baseUrl
    }
  };
}

export type ComplaintFaq = {
  question: string;
  answer: string;
};

export function buildComplaintPageJsonLd(entry: ComplaintEntry, faqs: readonly ComplaintFaq[]) {
  const pagePath = `/beschwerden/${entry.topic.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: entry.topic.title,
        description: entry.topic.metaDescription,
        url: absoluteUrl(pagePath),
        about: {
          "@type": "Thing",
          name: entry.topic.title
        },
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.baseUrl
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: absoluteUrl("/")
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Beschwerden",
            item: absoluteUrl("/beschwerden")
          },
          {
            "@type": "ListItem",
            position: 3,
            name: entry.topic.title,
            item: absoluteUrl(pagePath)
          }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };
}

function removeUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)
  ) as T;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(value: string) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}
