import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Impressum",
  description: "Impressum der Naturheilpraxis Maria. Platzhalter bis zur rechtlichen Freigabe.",
  path: "/impressum",
  noIndex: true
});

export default function ImpressumPage() {
  return (
    <article className="content-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Impressum</h1>
      <div className="legal-note">
        <h2>Platzhalter</h2>
        <p>
          Das Impressum muss vor Launch mit vollstaendigen Anbieterkennzeichnungen,
          Berufsangaben, Aufsichts-/Erlaubnisinformationen und Kontaktangaben ergaenzt
          und rechtlich geprueft werden.
        </p>
      </div>
    </article>
  );
}
