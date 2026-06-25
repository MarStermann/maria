import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
  noIndex?: boolean;
};

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export function absoluteUrl(path: string = "/") {
  return new URL(path, siteConfig.baseUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og-default.svg",
  noIndex = false
}: PageMetadataInput): Metadata {
  const shouldIndex = allowIndexing && !noIndex;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(path),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`
        }
      ]
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex
    }
  };
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
    priceRange: "$$",
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
        url: absoluteUrl(`/leistungen/${service.slug}`)
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
    url: absoluteUrl(`/leistungen/${service.slug}`),
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.baseUrl
    }
  };
}

function removeUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)
  ) as T;
}
