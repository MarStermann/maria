# Maria

Grundlage für die Website einer Heilpraktikerin: React/Vite Frontend, MUI Theme, statisches Prerendering, Decap CMS für die lokale Redaktion, CMS-neutrales Content-Modell und lokale Agentenregeln für SEO, Design, Marketing und sensible Gesundheitskommunikation.

## Status

Die Website befindet sich im Aufbau. Inhalte, Adresse, Qualifikationen, Rechtstexte und Bildrechte müssen vor Launch fachlich/rechtlich geprüft werden. Die lokale Redaktion mit Decap CMS ist eingerichtet.

## Struktur

- `apps/web` - Vite/React Website mit MUI Theme, statischem Prerendering, Metadata, Sitemap, Robots und ersten SEO-Seiten.
- `apps/cms` - Anleitung für Decap CMS und den lokalen Redaktionsablauf.
- `apps/web/admin` - Separater Einstieg für die Redaktion.
- `apps/web/public/admin/config.yml` - Bearbeitbare Felder und Inhaltstypen.
- `apps/web/src/content/editable` - Inhaltsdateien, die CMS und Website gemeinsam verwenden.
- `packages/content-model` - Provider-neutrale TypeScript-Typen für CMS-Inhalte.
- `docs/branding.md` - Aus dem Branding-Bild extrahierte Farbwelt, Typografie, Tonalität und UI-Regeln.
- `docs/frontend-architecture.md` - Trennung zwischen statischer Marketing-Website und späterem CMS-Bereich.
- `docs/current-wordpress-site.md` - Referenz zur bestehenden WordPress-Seite, Praxisdaten und Redirect-Migration.
- `AGENTS.md` - Projektregeln für Codex/Agents.
- `.codex/skills/maria-healthcare-marketing` - Lokaler Skill für SEO, Marketing und medizinisch vorsichtige Inhalte.

## Setup

Mit Node.js 20.19+ oder 22.12+ im Projektordner, beispielsweise im WebStorm-Terminal:

```bash
npm install
npm run dev
```

`npm run dev` startet Frontend und lokalen CMS-Dateiserver zusammen:

- Website: <http://localhost:3000>
- Redaktion: <http://localhost:3000/admin/> – „Lokale Redaktion öffnen“ anklicken; kein Konto erforderlich.
- Beenden: `Strg+C` im Terminal.

In der Redaktion eine Seite auswählen, Text oder SEO-Felder ändern und „Lokal speichern“ wählen. Die Website übernimmt gespeicherte Änderungen im Entwicklungsbetrieb. Die Seitenvorschau zeigt schon ungespeicherte Änderungen im echten Website-Layout, wahlweise für Desktop, Tablet oder Mobil. „Groß öffnen“ öffnet den Entwurf in einem eigenen Tab; „Website ansehen“ zeigt den gespeicherten Stand.

Falls das Frontend separat läuft: `npm run dev:cms` in einem zweiten Terminal. Nur das Frontend: `npm run dev:web`. Die Ports 3000 und 8081 müssen frei sein.

Speichern im CMS ändert lokale Dateien. Es erstellt weder einen Git-Commit noch eine Online-Veröffentlichung. Weitere Hinweise und der genaue Bearbeitungsumfang stehen in [apps/cms/README.md](apps/cms/README.md).

Der Produktions-Build erzeugt statische HTML-Dateien für alle bekannten Routen sowie `robots.txt`, `sitemap.xml` und `manifest.webmanifest`.

## Wichtige Umgebungsvariablen

```bash
VITE_SITE_URL=https://www.alscher-scheunemann.de
VITE_ALLOW_INDEXING=false
CMS_API_URL=
CMS_API_TOKEN=
```

`VITE_ALLOW_INDEXING` bleibt bis zur Abnahme auf `false`, damit Platzhalterseiten nicht indexiert werden. Die bisherigen `NEXT_PUBLIC_*` Namen werden vorerst weiterhin unterstützt.

## Frontend-Strategie

Die Website bleibt statisch und SEO-orientiert. Decap bearbeitet gezielte Textblöcke auf Startseite, Über mich, Kontakt und der Therapieübersicht sowie die vorhandenen Therapieverfahren einschließlich ihrer SEO-Felder. Das Layout bleibt in React. Ein Build übernimmt die gespeicherten Inhalte direkt in die HTML-Dateien.

## Blog

`/blog` enthält die Artikelübersicht. Blogartikel lassen sich in der lokalen Redaktion anlegen und als Karte oder Detailseite vorab ansehen. Auf der Startseite kann der Artikelabschnitt die neuesten oder ausgewählte freigegebene Beiträge zeigen. Ohne Beiträge bleibt er verborgen. Datenformat, Freigabe und die Vorbereitung des späteren WordPress-Imports stehen in [docs/blog-wordpress-import.md](docs/blog-wordpress-import.md).

## Nächste Entscheidungen

- Die geschützte Unraid-Redaktion und die automatische GitHub-Pipeline sind unter [Unraid-Deployment](docs/unraid-deployment.md) beschrieben.
- Domain, Praxisdaten, rechtliche Pflichtangaben und Datenschutz klären.
- Echte Bildwelt/Branding entwickeln.
- Leistungsseiten mit fachlich geprüften Inhalten ausarbeiten.
- Analytics/Consent-Strategie festlegen.
