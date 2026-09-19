# Prüfung der Therapieseiten und Artikelzuordnungen

Geprüft am 19. September 2026 im lokalen Vite-Entwicklungsserver.

## Inhalte

- Sieben Therapiedetailseiten mit eigenständigen Einleitungen, je zwei Vertiefungen, vier Ablaufschritten, Vorbereitungshinweisen und drei FAQs.
- Neun redaktionell neu formulierte Blogartikel auf Grundlage der Originalwebsite; alle sieben Verfahren besitzen passende Artikel.
- 18 interne Markdown-Links, 32 Bild- und SEO-Bildverweise sowie Therapie-, Beschwerde- und Artikelreferenzen geprüft.
- Alle 16 medizinischen Einträge bleiben `review`, ohne erfundene Freigabepersonen oder Prüfdaten. Review-Artikel sind nur in der lokalen Entwicklung und Redaktionsvorschau sichtbar.

## Browserprüfung

- Codex In-app Browser, Desktop 1440 × 1000 und Mobil 390 × 844.
- Alle sieben Therapierouten mobil auf eindeutige H1, drei FAQs, Bildfehler und überstehende Inhalte geprüft. Keine Fehler in diesem Umfang festgestellt.
- Desktopansichten von Ohrakupunktur und Frauenheilkunde visuell geprüft; Bildausschnitte der Frauenheilkunde und Homöopathie nachjustiert.
- Therapieübersicht → Therapiekarte → Detailseite durchlaufen.
- Abschnittslink zum Ablauf, FAQ öffnen/schließen und FAQ-Tastaturbedienung mit Enter geprüft.
- Terminaktion führt zur Kontaktseite.
- Frauenheilkunde → Wechseljahre-Artikel → Beschwerdeseite Wechseljahresbeschwerden geprüft; die Beschwerdeseite zeigt den zugeordneten Artikel.
- Frische Browserkonsole für diese Navigation ohne Fehler. Lokale Seiten liefern `noindex,nofollow`.
- Redaktion → Therapieverfahren → Ohrakupunktur: neue Felder sichtbar, eingebettete Detailvorschau und Umschaltung auf 390 Pixel geprüft.

Die lokale Redaktion war vorübergehend durch einen veralteten Vite-Abhängigkeitscache nicht erreichbar. Nach gezieltem Neustart von Vite und CMS lieferte der lokale CMS-Endpunkt wieder `200` und `local_fs`; die Oberfläche und Vorschau wurden anschließend erfolgreich geöffnet.

## Automatisierte Prüfung

- Web- und Content-Model-Typecheck erfolgreich.
- Neun Tests für Artikelstatus, Reihenfolge, explizite Auswahl und Therapie-/Beschwerdezuordnungen erfolgreich.
- CMS-YAML und alle 33 Beschwerdeoptionen der verschachtelten Relation geprüft.
- Separater Produktionsbuild für Client und SSR erfolgreich (`dist/therapy-verification/`, ohne Änderungen an den regulären Build-Ausgaben).
- Sämtliche erzeugten Routen im SSR gerendert. Für alle sieben Therapiedetailseiten eine H1, drei FAQs, die neuen Inhalte und `noindex` geprüft; alle neun neuen Review-Artikel sind aus Produktionsrouten und Sitemap ausgeschlossen.

Die parallel implementierte Erweiterung um Aktuelles und Themenbereiche wurde zusätzlich geprüft: Themenanlage in der Redaktion, Mehrfachzuordnung, automatische Themenarchive sowie regulärer Client-, SSR- und Prerender-Build erfolgreich; insgesamt 14 Tests bestanden. Vor Abschluss wurden alle vorübergehenden QA-Artikel und das QA-Thema entfernt. Fachliche Freigabe der Texte sowie Bestätigung der Bildrechte durch die Praxis sind weiterhin Voraussetzung für die Veröffentlichung.
