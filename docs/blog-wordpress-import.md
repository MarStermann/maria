# Blog und WordPress-Übernahme

Der Blog liegt unter `/blog`, einzelne Artikel unter `/blog/<slug>`. Die Redaktion unter `/admin/` bietet **Blogartikel** zum Anlegen und Bearbeiten sowie **Seiten → Blogübersicht** für die Einleitung und den Zustand ohne Artikel. Die übernommenen Inhalte werden anhand der Originalseiten redaktionell neu formuliert; ihre Herkunft bleibt in `wordpress.originalUrl` und `sources` dokumentiert.

## Artikel pflegen

Jeder Artikel liegt als JSON in `apps/web/src/content/editable/articles/<slug>.json`. Dateiname und `slug` müssen übereinstimmen. Einmal gespeicherte Slugs beibehalten; URL-Änderungen brauchen eine Weiterleitung. Titel, Kurzbeschreibung, Bild mit Alt-Text, Markdown-Inhalt, Artikeldatum, Themen und SEO-Felder sind unabhängig voneinander pflegbar. Das optionale Open-Graph-Bild fällt auf das Artikelbild zurück.

Neue Einträge beginnen als `draft`. Für die gemeinsame Durchsicht kann der Status auf `review` gesetzt werden: Dann erscheinen sie zusätzlich während `vite serve` in der lokalen Website, gekennzeichnet als **Redaktionsvorschau**. Das ist keine fachliche Freigabe. `draft` und `archived` bleiben auf die CMS-Vorschau beschränkt. Review-Artikel und die lokale Blogvorschau sind `noindex`; Review-Artikel werden aus der Sitemap ausgeschlossen.

Nur `published` wird beim Build in Website-Bundle, Karten und statische Routen übernommen. Bei `medicalReviewRequired: true` müssen zusätzlich `reviewedBy` und ein gültiges `lastReviewedAt` gesetzt sein. Unvollständige freigegebene Artikel stoppen den Build. Das Artikeldatum sortiert die Liste, es plant keine automatische Veröffentlichung. `VITE_ALLOW_INDEXING=false` bleibt bis zum geprüften Launch bestehen. Der leere Blog ist zusätzlich `noindex`.

Die CMS-Vorschau bietet Detailseite und Blogübersicht mit Artikelkarte, auch für ungespeicherte Entwürfe. Speichern ändert lokale Dateien. Das Vite-Inhaltsmodul trennt die lokale Review-Vorschau vom Build bereits beim Einlesen: Nicht freigegebene Texte werden nicht in das Produktions-Bundle serialisiert. `publishedArticles` bleibt immer die freigegebene Auswahl; `siteArticles` enthält ausschließlich während der lokalen Entwicklung zusätzlich Review-Inhalte.

## Einen neuen Artikel einer Seite zuordnen

1. Unter **Blogartikel → Neuer Artikel** Titel, Kurzbeschreibung, Bild, Datum und Inhalt ergänzen.
2. Unter **Zugeordnete Therapieverfahren** ein oder mehrere Verfahren nach Namen auswählen. Der Artikel wird automatisch im Artikelbereich dieser Detailseiten angezeigt, sobald sein Status dafür sichtbar ist.
3. Unter **Zugeordnete Beschwerdeseiten** bei Bedarf passende Beschwerden wählen. Die Auswahl stammt direkt aus dem Beschwerdenkatalog; Slugs müssen nicht abgetippt werden.
4. Unter **Weiterführende Artikel** bei Bedarf Beiträge auswählen, die auf der Artikeldetailseite zuerst empfohlen werden sollen. Weitere Empfehlungen kommen aus gemeinsamen Therapie- und Beschwerdezuordnungen. Der aktuelle Beitrag wird nie als eigene Empfehlung angezeigt.
5. Lokal speichern und im Status **In Prüfung** die Zuordnung und Darstellung kontrollieren. Fachlich sensible Texte erst nach tatsächlicher Prüfung freigeben und Namen/Datum der Prüfung eintragen.

Die Beziehungen liegen am Artikel: `serviceSlugs`, `complaintSlugs` und `relatedArticleSlugs`. Eine neue Zuordnung erfordert keine Anpassung der betroffenen React-Seite. Bestehende Artikel ohne diese Felder bleiben kompatibel und erhalten beim Einlesen leere Listen. Die Artikeldetailseite verweist zurück auf ihre zugeordneten Therapieverfahren und Beschwerdeseiten.

## Artikel in Bereiche einbinden

Auf der Startseite ist unter **Artikelabschnitt** standardmäßig **Aktuelles** gewählt. Unter **Welche Beiträge anzeigen?** stehen Aktuelles, neueste Artikel, ein Themenbereich oder eine eigene Auswahl zur Verfügung. Anzahl, Überschrift, Beschreibung, Sichtbarkeit und Darstellung (Karten, kompakte Liste, hervorgehobener Beitrag) sind einstellbar. Ohne passende Artikel wird der gesamte eingebundene Abschnitt ausgeblendet. Der Blog selbst behält einen verständlichen Hinweis ohne aktuelle Beiträge.

## Aktuelles und Themenbereiche pflegen

- Im Artikel **In Aktuelles anzeigen** aktivieren, um ihn zusätzlich unter `/blog/aktuelles` und in allen Aktuelles-Bausteinen einzubinden. Das Artikeldatum steuert die Reihenfolge. Die Kennzeichnung ist unabhängig von Themen und Therapiezuordnungen und kann jederzeit entfernt werden, ohne den Artikel zu löschen.
- Unter **Themenbereiche → Neuer Themenbereich** Name, URL-Kürzel, Beschreibung, Reihenfolge und SEO-Felder eingeben, anschließend prüfen und freigeben. Kleine Ordnungszahlen stehen zuerst. Naturheilkunde, Frauengesundheit und Praxisalltag sind als erste Bereiche angelegt.
- Im Artikel unter **Themenbereiche zuordnen** einen oder mehrere Bereiche auswählen. Die Beziehung liegt in `topicSlugs`; `categories` bleiben zusätzliche freie Schlagwörter. Namen lassen sich ändern, ohne Zuordnungen anzutasten; das URL-Kürzel bleibt nach dem ersten Speichern bestehen.
- Jeder freigegebene Themenbereich erhält automatisch `/blog/themen/<slug>`, eine Themenkarte und einen Eintrag im Blogfilter. Leere Themen sind `noindex`. Entwürfe und archivierte Themen erscheinen nur in der CMS-Vorschau; Archivieren entfernt weder zugeordnete Artikel noch deren übrige Verknüpfungen.
- **Seiten → Blogübersicht → Aktuelles** steuert Überschrift, Einleitung, Darstellungsform, Anzahl und Sichtbarkeit des Abschnitts. **Startseite → Artikelabschnitt** verwendet dieselben Darstellungen. Vorschauen für Artikel und Themen zeigen Detailseite oder Blogübersicht vor dem Speichern.

```tsx
<NewsSection layout="cards" limit={3} />
<NewsSection layout="list" limit={2} />
<NewsSection layout="featured" limit={3} />
<ArticleSection source="topic" topicSlug="frauengesundheit" heading="Frauengesundheit" layout="cards" />
```

`NewsSection` und `ArticleSection` aus `@/components/article-section` lassen sich in jedem Seitencontainer einbinden. Der zugehörige Vertrag `ArticleSection` ist auch als modularer `PageSection` verfügbar.

Andere React-Bereiche können dieselbe Komponente innerhalb ihres Containers verwenden:

```tsx
<ArticleSection
  heading="Zum Weiterlesen"
  serviceSlug={service.slug}
  limit={2}
/>

<ArticleSection complaintSlug={entry.topic.slug} limit={3} />
```

Mit `serviceSlug` oder `complaintSlug` werden nur entsprechend zugeordnete Artikel ausgewählt. Ein zusätzliches `articleSlugs` priorisiert passende Einträge in der gewählten Reihenfolge; danach folgen weitere Treffer nach Artikeldatum. Fehlen passende Treffer, bleibt der Abschnitt verborgen. Fremde Beiträge werden nicht als Ersatz angezeigt.

Ohne Seitenfilter und ohne `articleSlugs` werden die neuesten Artikel angezeigt. Eine manuelle Auswahl ohne Seitenfilter bleibt eine reine Auswahl in der angegebenen Reihenfolge. `ArticleCard` ist die einzelne Karte mit Titel, Bild, Kurzbeschreibung und Link. Der providerneutrale Vertrag in `packages/content-model` enthält `Article` und `ArticleSection`; `PageSection` erlaubt auch Artikelabschnitte.

## Therapiedetailseiten pflegen

Unter **Therapieverfahren** lassen sich neben Titel, Bild und Zusammenfassung nun Einleitung, Informationsabschnitte, Fragen für das persönliche Gespräch, Ablauf, Vorbereitung, häufige Fragen und Originalquellen bearbeiten. Die Vorschau verwendet dieselbe Detailseite wie die Website. Neue Abschnitte und Fragen sind strukturierte Listeneinträge und brauchen kein HTML. Der fachliche Review-Status gilt für die gesamte Therapieseite einschließlich ihrer Fragen und Antworten.

## Weitere Originalartikel übernehmen

1. Die gewünschten Beiträge aus WordPress als WXR/XML exportieren und die zugehörigen Originalbilder sichern. WXR enthält Verweise auf Medien, nicht die Bilddateien selbst.
2. Pro Beitrag eine JSON-Datei nach dem untenstehenden Beispiel erzeugen. WordPress-ID und Original-URL erhalten, damit Wiederholungsimporte zugeordnet und Weiterleitungen geplant werden können.
3. `post_title` → `title`, `post_name` → `slug`, Auszug → `teaser`, Datum → `publishedAt`, Kategorien → `categories`, Beitragsbild → `image`/`imageAlt`. Fehlende Kurzbeschreibungen und SEO-Felder redaktionell ergänzen.
4. WordPress-HTML in Markdown umwandeln. Gutenberg-Kommentare, Shortcodes, Skripte, Formulare und eingebettete Dienste gesondert bearbeiten. Rohes HTML wird nicht gerendert. Überschriften beginnen bei Ebene 2; der Seitentitel ist die einzige H1.
5. Vorhandene Originalbilder aus `apps/web/public/wordpress images/` verwenden oder weitere Bilder nach `apps/web/public/uploads/` übernehmen. Lokale Bildpfade verwenden und Rechte/Quelle prüfen. Interne Links auf die neuen Ziele umstellen.
6. Artikel zunächst als `draft` speichern, auch wenn sie in WordPress bereits veröffentlicht waren. Für die lokale gemeinsame Durchsicht `review` setzen. Text, medizinische Aussagen, Links, Bilder und SEO prüfen; anschließend einzeln freigeben. Keine Prüfperson und kein Prüfdatum erfinden.
7. Therapieverfahren und Beschwerdeseiten über ihre stabilen Slugs zuordnen. Bei Wiederholungsimporten bestehende Zuordnungen und redaktionelle Änderungen bewahren.
8. Weiterleitungen von den gesicherten Original-URLs auf `/blog/<slug>` vor einem Domainwechsel in der Hosting-Konfiguration ergänzen. Ein automatischer WXR-Import und Hosting-Weiterleitungen sind nicht Teil dieser Inhaltsübernahme.

```json
{
  "type": "article",
  "slug": "beispiel-artikel",
  "title": "Titel aus WordPress",
  "teaser": "Kurze, redaktionell geprüfte Beschreibung für die Karte.",
  "image": "/uploads/beispiel.webp",
  "imageAlt": "Beschreibung des Bildinhalts",
  "imageSource": "Bildquelle nachtragen",
  "imagePermission": "Nutzungsrecht prüfen",
  "publishedAt": "2026-09-19",
  "categories": ["Praxisalltag"],
  "topicSlugs": ["praxisalltag"],
  "isNews": false,
  "serviceSlugs": ["pflanzenheilkunde"],
  "complaintSlugs": [],
  "relatedArticleSlugs": [],
  "body": "## Zwischenüberschrift\n\nHier steht der übernommene und geprüfte Artikeltext.",
  "seo": {
    "title": "Eigener SEO-Titel",
    "description": "Eigene Meta-Beschreibung des Artikels.",
    "noIndex": false
  },
  "review": {
    "status": "draft",
    "medicalReviewRequired": true,
    "reviewedBy": "",
    "lastReviewedAt": ""
  },
  "wordpress": {
    "id": 123,
    "originalUrl": "https://www.alscher-scheunemann.de/beispiel-artikel/"
  }
}
```

Technische Grundlagen: [Decap-Artikelkollektionen](https://decapcms.org/docs/collection-folder/), [Decap-Beziehungsfelder einschließlich verschachtelter Listen](https://decapcms.org/docs/widgets/relation/), [Markdown-Darstellung mit React Markdown](https://github.com/remarkjs/react-markdown).
