import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/content/site";
import { buildLocalBusinessJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Heilpraktikerin in [Ort]",
  description:
    "Naturheilpraxis Maria in [Ort]: persoenliche Anamnese, transparente naturheilkundliche Begleitung und ruhige Terminplanung.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <section className="page-shell hero">
        <div>
          <p className="eyebrow">Heilpraktikerin in {siteConfig.city}</p>
          <h1>{siteConfig.name}</h1>
          <p className="hero-lead">
            Persoenliche naturheilkundliche Begleitung mit Zeit fuer Anamnese,
            klare Einordnung und einen Behandlungsplan, der zu Ihrer Situation passt.
          </p>
          <div className="action-row">
            <Link className="button button-primary" href="/kontakt">
              Termin anfragen
            </Link>
            <Link className="button button-secondary" href="/leistungen">
              Leistungen ansehen
            </Link>
          </div>
          <div className="trust-strip" aria-label="Praxiswerte">
            <div className="trust-item">
              <strong>Ruhige Anamnese</strong>
              <span>Strukturierter erster Termin mit Raum fuer Fragen.</span>
            </div>
            <div className="trust-item">
              <strong>Transparente Schritte</strong>
              <span>Sie wissen, was empfohlen wird und warum.</span>
            </div>
            <div className="trust-item">
              <strong>Individuell geplant</strong>
              <span>Keine Standardpakete, keine pauschalen Versprechen.</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Ruhige Praxisatmosphaere">
          <div className="appointment-note">
            <strong>Ersttermin</strong>
            <p>Vorgeschichte, aktuelle Fragen und naechste Schritte in Ruhe besprechen.</p>
          </div>
        </div>
      </section>

      <section className="band band-tinted">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Leistungen</p>
              <h2>Orientierung ohne Druck</h2>
            </div>
            <p>
              Die Website startet mit wenigen, klar abgegrenzten Leistungsseiten.
              Jede Seite kann spaeter im CMS fachlich geprueft erweitert werden.
            </p>
          </div>
          <div className="service-grid">
            {siteConfig.services.map((service) => (
              <article className="service-card" key={service.slug}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link href={`/leistungen/${service.slug}`}>Mehr erfahren</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ablauf</p>
              <h2>Vom ersten Kontakt zur Begleitung</h2>
            </div>
            <p>
              Ein einfacher Ablauf macht die Entscheidung leichter und reduziert
              Unsicherheit vor dem ersten Termin.
            </p>
          </div>
          <ol className="process-list">
            <li>Kontakt aufnehmen und kurz schildern, worum es geht.</li>
            <li>Ersttermin mit ausfuehrlicher Anamnese vereinbaren.</li>
            <li>Individuelle naechste Schritte transparent besprechen.</li>
          </ol>
        </div>
      </section>
    </>
  );
}
