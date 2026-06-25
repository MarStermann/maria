# Maria

Grundlage fuer die Website einer Heilpraktikerin: React/Next.js Frontend, CMS-neutrales Content-Modell und lokale Agentenregeln fuer SEO, Design, Marketing und sensible Gesundheitskommunikation.

## Status

Dies ist ein First-Commit-Setup. Inhalte, Adresse, Qualifikationen, Rechtstexte, CMS-Auswahl und echte Bildwelt sind Platzhalter und muessen vor Launch fachlich/rechtlich geprueft werden.

## Struktur

- `apps/web` - Next.js/React Website mit App Router, Metadata, Sitemap, Robots und ersten Seiten.
- `apps/cms` - CMS-Blueprint und Content-Modell als Entscheidungsgrundlage.
- `packages/content-model` - Provider-neutrale TypeScript-Typen fuer CMS-Inhalte.
- `AGENTS.md` - Projektregeln fuer Codex/Agents.
- `.codex/skills/maria-healthcare-marketing` - Lokaler Skill fuer SEO, Marketing und medizinisch vorsichtige Inhalte.

## Setup

Node.js ist in dieser Umgebung noch nicht installiert. Sobald Node verfuegbar ist:

```bash
npm install
npm run dev
```

Die Website laeuft dann standardmaessig unter `http://localhost:3000`.

## Wichtige Umgebungsvariablen

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_ALLOW_INDEXING=false
CMS_API_URL=
CMS_API_TOKEN=
```

`NEXT_PUBLIC_ALLOW_INDEXING` bleibt bis zur Abnahme auf `false`, damit Platzhalterseiten nicht indexiert werden.

## Naechste Entscheidungen

- CMS auswaehlen: Sanity, Storyblok, Strapi, Directus oder ein anderes System.
- Domain, Praxisdaten, rechtliche Pflichtangaben und Datenschutz klaeren.
- Echte Bildwelt/Branding entwickeln.
- Leistungsseiten mit fachlich geprueften Inhalten ausarbeiten.
- Analytics/Consent-Strategie festlegen.
