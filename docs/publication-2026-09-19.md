# Veröffentlichung und Besucheransicht vom 19. September 2026

Die neun bisher ausstehenden Blogartikel wurden auf ausdrücklichen Nutzerauftrag auf `published` gesetzt. Der Auftrag lautet: „veröffentliche alle ausstehenden artikel und nimm ÜBERALL alle warnungen und kommentare raus die nicht auch in der live version sein sollten“.

Die Freigabefelder dokumentieren diesen Auftrag mit dem Datum 2026-09-19 und dem Text „Veröffentlichung auf ausdrückliche Nutzerfreigabe im Projektauftrag“. Es wurde keine medizinische Prüferidentität erfunden; die Felder sind kein Nachweis einer unabhängigen fachlichen Prüfung. `medicalReviewRequired` bleibt unverändert. Inhalte, ursprüngliche Artikeldaten, Quellen, Bildnachweise und Rechtevermerke bleiben erhalten.

Redaktionsbanner und Statusmarkierungen wurden aus Blog, Artikelkarten, Artikeldetails und Therapiedetails entfernt. Leere Aktuelles- und Themenabschnitte erscheinen nicht mehr als Ankündigung unfertiger Inhalte. Die CMS-Felder und technischen Validierungen bleiben für die Redaktion erhalten; CMS-Oberfläche, Vorschauseiten und die CMS-Konfiguration werden nicht in den Produktionsstand übernommen. Medizinische Einordnung, Hinweise zur ärztlichen Abklärung und Datenschutz beim Erstkontakt sind reguläre Patienteninformationen und bleiben sichtbar.

Die internen Launch-Texte auf Impressum und Datenschutz wurden durch Praxisangaben und Links zu den bestehenden Rechtstexten ersetzt. Quellen, gelesen am 19. September 2026:

- https://www.alscher-scheunemann.de/berufsrechtliche-angaben-und-impressum/
- https://www.alscher-scheunemann.de/datenschutzhinweise/

Diese lokalen Seiten verweisen auf die bisherigen Rechtstexte. Sie ersetzen keine für das spätere Hosting und die tatsächlichen Datenverarbeitungen abgestimmte Datenschutzerklärung. Die bisherigen Datenschutzhinweise enthalten unter anderem Dienste der WordPress-Website; sie wurden deshalb nicht unverändert in die neue Website kopiert. Vor einer Domain-Umstellung sind eigenständige, bestätigte Rechtstexte sowie Praxisangaben und Bildrechte weiterhin abzustimmen. Die Indexierung bleibt gesperrt. Eine Freigabe der Artikel ist kein Deployment der neuen Gesamtwebsite und keine rechtliche Abnahme.

## Prüfung

- Beide TypeScript-Projekte ohne Fehler geprüft; 14 bestehende Tests für Artikelfreigaben, Zuordnungen und Abschnitte bestanden.
- Client-Build, SSR-Build und Prerendering erfolgreich. Der bestehende Vite-Hinweis zur Größe des JavaScript-Bundles bleibt ein technischer Buildhinweis.
- Alle 62 erzeugten HTML-Seiten über HTTP gegen ihre jeweiligen Dateien abgeglichen; neun Artikeldetailseiten, jeweils eine H1, keine fehlenden lokalen Links oder internen Redaktionshinweise.
- Vite Preview löst jetzt auch Unterseiten ohne abschließenden Schrägstrich auf ihre eigene HTML-Datei auf. Zuvor lieferte die SPA-Ausweichroute dort die Startseite und löste einen Hydrationsfehler aus.
- Browserprüfung im Codex-Browser bei 1440 × 1000 und 390 × 844: Blog, Filter und Zurücksetzen, mobiles Menü, Artikeldetail, Therapiedetail, Impressum und Datenschutz. Keine beobachteten Konsolenfehler oder horizontalen Überläufe im geprüften Produktionsstand.
- Lokale Redaktion und deren Konfiguration sind nicht im Produktionsverzeichnis enthalten. Der Produktionsstand kann lokal unter http://localhost:4173/blog angesehen werden.
