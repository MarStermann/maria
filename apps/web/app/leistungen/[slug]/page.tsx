import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/content/site";
import { buildServiceJsonLd, createPageMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/leistungen/${service.slug}`
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildServiceJsonLd(service)} />
      <article className="content-page">
        <p className="eyebrow">Leistung</p>
        <h1>{service.title}</h1>
        <p className="page-lead">{service.summary}</p>
        <section>
          <h2>Was Sie erwartet</h2>
          <ul className="check-list">
            <li>Ein ruhiges Gespraech ueber Ihre aktuelle Situation.</li>
            <li>Transparente Erklaerung moeglicher naechster Schritte.</li>
            <li>Eine Empfehlung, die Ihre persoenlichen Grenzen respektiert.</li>
          </ul>
        </section>
        <section className="legal-note">
          <h2>Wichtiger Hinweis</h2>
          <p>
            Diese Inhalte sind Platzhalter fuer die fachliche Ausarbeitung. Naturheilkundliche
            Begleitung ersetzt keine aerztliche Abklaerung, Notfallversorgung oder verordnete Therapie.
          </p>
        </section>
        <div className="action-row">
          <Link className="button button-primary" href="/kontakt">
            Termin anfragen
          </Link>
          <Link className="button button-secondary" href="/leistungen">
            Zurueck zu den Leistungen
          </Link>
        </div>
      </article>
    </>
  );
}
