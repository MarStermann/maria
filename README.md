# Maria

Grundlage für die Website einer Heilpraktikerin: React/Next.js Frontend, MUI Theme, CMS-neutrales Content-Modell und lokale Agentenregeln für SEO, Design, Marketing und sensible Gesundheitskommunikation.

## Status

Dies ist ein First-Commit-Setup. Inhalte, Adresse, Qualifikationen, Rechtstexte, CMS-Auswahl und echte Bildwelt sind Platzhalter und müssen vor Launch fachlich/rechtlich geprüft werden.

## Struktur

- `apps/web` - Next.js/React Website mit App Router, MUI Theme, Metadata, Sitemap, Robots und ersten statischen SEO-Seiten.
- `apps/cms` - CMS-Blueprint und Content-Modell als Entscheidungsgrundlage.
- `packages/content-model` - Provider-neutrale TypeScript-Typen für CMS-Inhalte.
- `docs/branding.md` - Aus dem Branding-Bild extrahierte Farbwelt, Typografie, Tonalität und UI-Regeln.
- `docs/frontend-architecture.md` - Trennung zwischen statischer Marketing-Website und späterem CMS-Bereich.
- `docs/current-wordpress-site.md` - Referenz zur bestehenden WordPress-Seite, Praxisdaten und Redirect-Migration.
- `AGENTS.md` - Projektregeln für Codex/Agents.
- `.codex/skills/maria-healthcare-marketing` - Lokaler Skill für SEO, Marketing und medizinisch vorsichtige Inhalte.

## Setup

Node.js ist in dieser Umgebung noch nicht installiert. Sobald Node verfügbar ist:

```bash
npm install
npm run dev
```

Die Website läuft dann standardmäßig unter `http://localhost:3000`.

## Wichtige Umgebungsvariablen

```bash
NEXT_PUBLIC_SITE_URL=https://www.alscher-scheunemann.de
NEXT_PUBLIC_ALLOW_INDEXING=false
CMS_API_URL=
CMS_API_TOKEN=
```

`NEXT_PUBLIC_ALLOW_INDEXING` bleibt bis zur Abnahme auf `false`, damit Platzhalterseiten nicht indexiert werden.

## Frontend-Strategie

Die erste Phase konzentriert sich auf statische, SEO-optimierte Seiten: Home, Leistungen, Leistungsdetails, Über mich, Kontakt und Rechtliches. Artikel, Blogbeiträge und redaktionelle Inhalte kommen später über das Headless CMS in einem getrennten Bereich hinzu.

## Nächste Entscheidungen

- CMS auswählen: Sanity, Storyblok, Strapi, Directus oder ein anderes System.
- Domain, Praxisdaten, rechtliche Pflichtangaben und Datenschutz klären.
- Echte Bildwelt/Branding entwickeln.
- Leistungsseiten mit fachlich geprüften Inhalten ausarbeiten.
- Analytics/Consent-Strategie festlegen.
