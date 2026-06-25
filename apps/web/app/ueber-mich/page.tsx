import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Ueber mich",
  description:
    "Lernen Sie Maria [Nachname] und die Haltung der Naturheilpraxis Maria kennen. Platzhalter fuer Qualifikationen und Praxisprofil.",
  path: "/ueber-mich"
});

export default function AboutPage() {
  return (
    <article className="content-page">
      <p className="eyebrow">Ueber mich</p>
      <h1>{siteConfig.practitionerName}</h1>
      <p className="page-lead">
        Diese Seite sammelt spaeter Qualifikationen, Haltung, Arbeitsweise und Praxisgeschichte.
        Aktuell bleiben alle fachlichen Angaben Platzhalter, bis sie verifiziert sind.
      </p>
      <section>
        <h2>Arbeitsweise</h2>
        <p>
          Im Mittelpunkt stehen sorgfaeltiges Zuhoeren, transparente Empfehlungen und eine
          Begleitung, die den Menschen nicht auf einzelne Beschwerden reduziert.
        </p>
      </section>
      <section className="legal-note">
        <h2>Launch-Blocker</h2>
        <p>
          Qualifikationen, Berufsbezeichnung, Mitgliedschaften und Zertifikate erst nach
          Nachweis und Freigabe veroeffentlichen.
        </p>
      </section>
    </article>
  );
}
