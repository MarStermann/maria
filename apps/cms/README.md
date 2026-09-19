# Decap CMS

Decap CMS ist kostenlos installiert und für die lokale Redaktion eingerichtet. Es benötigt keine Datenbank, keinen Cloud-Dienst und kein Benutzerkonto. Der Dateiserver läuft ausschließlich auf `127.0.0.1:8081`; Vite stellt die Oberfläche unter `/admin/` bereit.

## Starten

Im Projektordner:

```bash
npm install
npm run dev
```

Website: <http://localhost:3000>. Redaktion: <http://localhost:3000/admin/>. Beim ersten Aufruf „Lokale Redaktion öffnen“ anklicken. Mit `Strg+C` werden beide Server beendet. Läuft das Frontend bereits separat, genügt `npm run dev:cms` in einem zweiten Terminal.

## Inhalte bearbeiten

Unter **Seiten** stehen Startseite, Über mich, Beschwerden – Übersicht, Kontakt und Therapieverfahren – Übersicht zur Verfügung. Auf der Startseite sind Werte-Leiste, Portrait, Beschwerdekarten mit Bildern und Links sowie der Leitgedanke einzeln bearbeitbar. Der bestehende Hero bleibt als eigener Abschnitt erhalten. Bei **Über mich** lassen sich Portrait, Leitgedanke, Absätze, Werte, persönlicher Weg, wichtige Grundsätze und die Abschlussleiste pflegen. Bildausschnitt und Vergrößerung steuern die Darstellung vorhandener Motive.

**Beschwerden – Übersicht** enthält Seitentitel, Einleitung, Blasentitel und Beispiele sowie die Texte von Suche, Detailansicht und Hinweisen. Unter **Beschwerdenkatalog** stehen die sieben Körperregionen mit Unterbereichen, Beschwerden, Verknüpfungen zu Therapieverfahren und SEO-Angaben zur Verfügung. Die Positionen der Körperregionen und bestehenden URL-Kennungen bleiben geschützt. Der gesamte Katalog einschließlich seiner Detailseiten verwendet diese Daten. Unter **Therapieverfahren** stehen die sieben bestehenden Einträge mit Beschreibung, Ablauf, Hinweis und Bild zur Verfügung.

**Suchmaschinen und Teilen** enthält SEO-Titel, Meta-Beschreibung, Vorschaubild und den Ausschluss einzelner Seiten von der Indexierung. Canonical-URLs, Sitemap und strukturierte Daten bleiben Aufgabe des Frontends und berücksichtigen die angebundenen Inhalte.

1. Eintrag öffnen und Felder bearbeiten.
2. Die Seitenvorschau rechts kontrollieren. Sie verwendet dieselben React-Komponenten, Bilder, Schriften und Styles wie die Website und zeigt auch ungespeicherte Änderungen sofort.
3. **Lokal speichern** anklicken. Änderungen werden direkt als JSON unter `apps/web/src/content/editable/` gespeichert.
4. Über **Website ansehen** den gespeicherten Stand prüfen. Der Entwicklungsserver übernimmt gespeicherte Inhalte automatisch.

In der Vorschau stehen **Desktop** (1280 px), **Tablet** (768 px) und **Mobil** (390 px) zur Verfügung. Die gewählte Breite wird auf den verfügbaren Platz verkleinert, ohne das Seitenlayout zu verändern. **Groß öffnen** zeigt den aktuellen Entwurf in einem eigenen Tab und übernimmt weitere Eingaben aus dem geöffneten Editor automatisch. Bei Therapieverfahren kann zwischen der Detailseite und der **Therapieübersicht mit Bild** gewechselt werden, um auch die Therapiekarte zu kontrollieren.

Bearbeitet wird weiterhin in den Formularfeldern links. Links innerhalb der Entwurfsvorschau wechseln nicht auf andere Seiten; dafür gibt es **Website ansehen**. Das synchrone Scrollen ist standardmäßig aus, weil Formularfelder und Seitenabschnitte unterschiedliche Höhen haben; die Decap-Schaltfläche kann es bei Bedarf aktivieren.

Bilder können über die Medienbibliothek hochgeladen werden. Neue Dateien liegen unter `apps/web/public/uploads/` und sind über `/uploads/` erreichbar. Bestehende Bilder außerhalb dieses Ordners bleiben nutzbar. Bei Therapiebildern können Bildbeschreibung, Quelle und Nutzungsfreigabe erfasst werden. Nur Bilder mit geklärten Rechten verwenden.

Globale Praxisdaten, Navigation und Rechtstexte bleiben derzeit im Quellcode. Neue Seiten oder neue Therapierouten benötigen eine entsprechende Ergänzung im Frontend und in der CMS-Konfiguration. Der Vertrag in `packages/content-model` bleibt anbieterunabhängig. Die Beschwerden-Inhalte liegen als normale JSON-Dateien unter `apps/web/src/content/editable/complaints/` und sind ebenfalls an keinen CMS-Anbieter gebunden.

## Prüfung und Veröffentlichung

**Blogartikel** ist eine eigene Kollektion mit neuen Einträgen, Artikelbild, Kurzbeschreibung, Markdown-Text, Originaldatum und WordPress-Herkunft. Über **In Aktuelles anzeigen** wird ein Beitrag als aktuelle Nachricht gekennzeichnet. Unter **Themenbereiche** lassen sich neue Themen mit Name, Beschreibung, Reihenfolge und SEO-Feldern anlegen. Artikel können mehreren Themen zugeordnet werden. Freigegebene Themen erhalten automatisch eine Übersichtsseite und einen Blogfilter.

**Seiten → Blogübersicht** pflegt die Übersichtsseite einschließlich des Aktuelles-Abschnitts. Unter **Startseite → Artikelabschnitt** lassen sich Aktuelles, neueste Artikel, ein Themenbereich oder ausgewählte Artikel einbinden. Beide Abschnitte bieten Karten, eine kompakte Liste oder einen hervorgehobenen Beitrag. Die Vorschau zeigt bei Artikeln und Themen wahlweise die Detailseite oder die Blogübersicht. Hinweise zum späteren Import stehen in [docs/blog-wordpress-import.md](../../docs/blog-wordpress-import.md).

Bei Blogartikeln gilt: Nur `published` erscheint im Produktionsbuild. Lokal zeigt die Website zusätzlich `review` zur Vorschau im regulären Seitenlayout; der Freigabestatus wird in den CMS-Feldern gepflegt und nicht als Banner auf der Website angezeigt. Medizinisch prüfpflichtige Artikel benötigen zur Freigabe zusätzlich Prüfname und gültiges Prüfdatum. Nicht freigegebene Artikel werden nicht in das öffentliche Website-Bundle übernommen. Neue freigegebene Artikel erhalten beim Build automatisch eine Detailroute; ohne passende Artikel bleibt der Startseitenabschnitt verborgen.

Jeder Eintrag hat die Zustände `draft`, `review`, `published` und `archived`. Diese Felder dokumentieren den fachlichen Prüfprozess; die lokale Redaktion hat keine getrennten Benutzerrollen. Entwürfe und archivierte Inhalte bleiben in der lokalen Vorschau sichtbar.

`VITE_ALLOW_INDEXING=false` bleibt bis zur Abnahme bestehen. Ein indexierbarer Build verlangt für alle angebundenen Einträge einschließlich Beschwerden-Übersicht und aller sieben Katalogregionen den Status **Freigegeben**, einen Prüfnamen und ein Prüfdatum. Nach fachlichen Änderungen muss die Freigabe erneut geprüft und dokumentiert werden. Rechtstexte, Praxisangaben, Bildrechte und medizinische Aussagen benötigen zusätzlich die Abnahme der Praxis; das Statusfeld ersetzt diese nicht.

**Lokal speichern** veröffentlicht nichts im Internet. Änderungen erscheinen erst nach einem separaten Build und Deployment auf der Online-Website. Für die Versionshistorie werden die geänderten JSON-Dateien und hochgeladenen Bilder wie übriger Quellcode in Git übernommen.

Der normale Website-Build enthält weder die Redaktion noch ihre Vorschauseiten. `npm run build:cms` erzeugt einen separaten Build für die geschützte Redaktion auf Unraid. Dort sichern eine Anmeldung und ein eigener Server die Inhaltszugriffe ab; Speichern erstellt einen Git-Commit und startet das Deployment über GitHub Actions. Einrichtung, Adressen und Wiederherstellung stehen unter [Unraid-Deployment](../../docs/unraid-deployment.md). Die lokale Redaktion über `npm run dev` bleibt unverändert verfügbar. Der lokale Decap-Dateiserver darf nicht öffentlich freigegeben werden.

## Technische Einstiegspunkte

- `scripts/dev.mjs`: startet Vite und den Decap-Dateiserver gemeinsam.
- `apps/web/public/admin/config.yml`: Felder, Dateien, Medienpfade und lokales Backend.
- `apps/web/admin/`: Oberfläche, deutsche Beschriftungen und Inhaltsvorschau.
- `apps/web/src/content/editable.ts`: verbindet die Inhalte mit React und prüft den Freigabestatus für indexierbare Builds.

Prüfen: `npm run typecheck` und `npm run build`. Build-Vorschau: `npm run start` (normalerweise Port 4173; ohne CMS-Dateiserver).
