import Link from "next/link";

export default function NotFoundPage() {
  return (
    <article className="content-page">
      <p className="eyebrow">404</p>
      <h1>Seite nicht gefunden</h1>
      <p className="page-lead">
        Die angeforderte Seite existiert nicht oder wurde noch nicht veroeffentlicht.
      </p>
      <div className="action-row">
        <Link className="button button-primary" href="/">
          Zur Startseite
        </Link>
      </div>
    </article>
  );
}
