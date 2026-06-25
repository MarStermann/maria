import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Kontakt zur Naturheilpraxis Maria in [Ort]. Termin anfragen, Anliegen kurz schildern und naechste Schritte klaeren.",
  path: "/kontakt"
});

export default function ContactPage() {
  return (
    <article className="content-page">
      <p className="eyebrow">Kontakt</p>
      <h1>Termin anfragen</h1>
      <p className="page-lead">
        Schreiben Sie eine kurze Nachricht mit Ihrem Anliegen. Die konkreten Kontaktwege,
        Sprechzeiten und Datenschutzdetails werden vor Launch ergaenzt.
      </p>
      <section className="info-grid">
        <div className="info-card">
          <h2>E-Mail</h2>
          <p>{siteConfig.contact.email}</p>
        </div>
        <div className="info-card">
          <h2>Telefon</h2>
          <p>{siteConfig.contact.phone}</p>
        </div>
        <div className="info-card">
          <h2>Ort</h2>
          <p>{siteConfig.city}</p>
        </div>
      </section>
      <section className="legal-note">
        <h2>Hinweis</h2>
        <p>
          Bitte senden Sie keine sensiblen Gesundheitsdaten ueber ein unverschluesseltes
          Kontaktformular, bevor die Datenschutz- und Sicherheitsanforderungen umgesetzt sind.
        </p>
      </section>
    </article>
  );
}
