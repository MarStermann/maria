import Link from "next/link";

import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Leistungen",
  description:
    "Leistungen der Naturheilpraxis Maria: Erstanamnese, naturheilkundliche Begleitung und alltagstaugliche Praevention.",
  path: "/leistungen"
});

export default function ServicesPage() {
  return (
    <div className="content-page">
      <p className="eyebrow">Leistungen</p>
      <h1>Naturheilkundliche Begleitung</h1>
      <p className="page-lead">
        Die Leistungsseiten sind bewusst klar gehalten. Spaeter koennen sie aus dem CMS
        mit fachlich geprueften Details, FAQ und internen Links erweitert werden.
      </p>
      <section className="service-grid">
        {siteConfig.services.map((service) => (
          <article className="service-card" key={service.slug}>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <Link href={`/leistungen/${service.slug}`}>Details ansehen</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
