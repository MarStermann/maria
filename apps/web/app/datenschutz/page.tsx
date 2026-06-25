import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Datenschutz",
  description: "Datenschutzhinweise der Naturheilpraxis Maria. Platzhalter bis zur rechtlichen Freigabe.",
  path: "/datenschutz",
  noIndex: true
});

export default function DatenschutzPage() {
  return (
    <article className="content-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Datenschutz</h1>
      <div className="legal-note">
        <h2>Platzhalter</h2>
        <p>
          Die Datenschutzerklaerung muss vor Launch passend zu Hosting, CMS, Formularen,
          Analytics, Consent-Management und E-Mail-Prozessen erstellt und freigegeben werden.
        </p>
      </div>
    </article>
  );
}
