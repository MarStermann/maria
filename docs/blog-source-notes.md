# Quellen und Redaktion der Blogartikel

Stand der Recherche und redaktionellen Neufassung: 19. September 2026.

Aktueller Veröffentlichungsstand: Die neun Artikel wurden anschließend auf ausdrücklichen Nutzerauftrag freigegeben. Der Freigabeweg und die Bereinigung der Besucheransicht sind in [publication-2026-09-19.md](publication-2026-09-19.md) dokumentiert. Die folgenden Abschnitte beschreiben den Recherche- und Entwurfsstand vor dieser Freigabe.

## Inhalt und Zuordnung

Die neun Artikel sind eigenständige Neufassungen für Patientinnen und Patienten. Als Ausgangspunkt wurden die tatsächlichen Therapieseiten und zwei vorhandene Blogartikel der [bisherigen Praxiswebsite](https://www.alscher-scheunemann.de/) gelesen. Beschreibungen von Methoden wurden von nicht ausreichend belegten Wirkungsversprechen getrennt. Quellenhinweise zur medizinischen Einordnung stehen zusätzlich in den jeweiligen `sources` und als lesbare Links im Text.

Alle Artikel liegen in `apps/web/src/content/editable/articles/`. Pro Artikel gibt es individuelle Titel, Teaser, SEO-Metadaten, vier H2-Abschnitte und etwa 400–421 Wörter. Alle sieben Therapieverfahren erhalten mindestens einen zugeordneten Artikel. Direkte Verbindungen zu passenden Beschwerdeseiten stehen ausschließlich in `complaintSlugs`; sie sind redaktionelle Themenzuordnungen und keine Aussage über die Wirksamkeit eines Verfahrens.

| Artikel / Dateiname ohne .json | Originalquelle | Artikeldatum | Verfahren |
| --- | --- | --- | --- |
| `ohrakupunktur-was-sie-vor-dem-ersten-termin-wissen-sollten` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/ohrakupunktur-hamburg/) | 2026-09-19 | `ohrakupunktur` |
| `pflanzenheilkunde-warum-die-auswahl-entscheidend-ist` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/pflanzenheilkunde/) | 2026-09-19 | `pflanzenheilkunde` |
| `fussreflexzonentherapie-beruehrung-und-grenzen` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/fussreflexzonen-therapie/) | 2026-09-19 | `fussreflexzonentherapie` |
| `zyklusbeschwerden-gut-vorbereitet-ins-gespraech` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/naturheilkundliche-frauenheilkunde/) | 2026-09-19 | `naturheilkundliche-frauenheilkunde` |
| `komplex-homoeopathie-begriffe-und-einordnung` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/komplex-homoeopathie/) | 2026-09-19 | `komplex-homoeopathie` |
| `heuschnupfen-beschwerden-und-begleitung-einordnen` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/heuschnupfen-naturheilkundliche-allergiebehandlung/) | 2026-09-19 | `allergien-heuschnupfen` |
| `mikrobiom-warum-pauschale-darmkuren-nicht-weiterhelfen` | [Original](https://www.alscher-scheunemann.de/therapieverfahren/mikrobiologische-therapie/) | 2026-09-19 | `mikrobiologische-therapie` |
| `wechseljahre-veraenderungen-in-ruhe-einordnen` | [Original](https://www.alscher-scheunemann.de/wechseljahre-natuerlich-begleiten/) | 2026-06-05 | `naturheilkundliche-frauenheilkunde`, `pflanzenheilkunde`, `fussreflexzonentherapie` |
| `kinderwunsch-begleitung-ohne-erfolgsdruck` | [Original](https://www.alscher-scheunemann.de/kinderwunsch/) | 2026-06-01 | `naturheilkundliche-frauenheilkunde`, `ohrakupunktur` |

Die Datumsangaben für Wechseljahre (5. Juni 2026) und Kinderwunsch (1. Juni 2026) sind auf der [Original-Startseite](https://www.alscher-scheunemann.de/) einschließlich des dort sichtbaren Beitragsdatums verifiziert. Die sieben aus Therapieseiten entwickelten Erklärartikel tragen das Erstelldatum 19. September 2026; für sie wird kein historisches Veröffentlichungsdatum erfunden. Das Feld `publishedAt` dient der redaktionellen Datierung und bedeutet bei Status `review` keine Veröffentlichung.

Die vollständigen Originalseiten wurden über die Web-Recherche gelesen. Der Wechseljahre-Artikel war im Web-Cache nicht abrufbar und wurde ergänzend direkt und ausschließlich lesend über HTTPS abgerufen. Keine WordPress-IDs, neue Autorenangaben oder medizinische Freigaben wurden erfunden.

## Medizinische Einordnung

Nicht übernommen wurden unter anderem pauschale Heilungs- und Regulationsversprechen, Erfolgsberichte als Behandlungsnachweis, pauschale Organzuordnungen als Diagnose, die Abwertung wirksamer Allergiemedikamente, „Nebennierenschwäche“ als vorausgesetzte Allergieursache und Entgiftung als Kinderwunschbehandlung. Ebenso enthalten die Neufassungen keine Dosierungen, Teerezepte, Behandlungsintervalle oder Selbstbehandlungspläne.

Zusätzliche öffentliche Quellen:

- [NCCIH: Akupunktur, Wirksamkeit und Sicherheit](https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety) – differenzierte Evidenz, Abgrenzung von Ohr- und Körperakupunktur sowie Kinderwunsch.
- [NCCIH: Reflexzonentherapie](https://www.nccih.nih.gov/health/reflexology) – fehlender Beleg für die behauptete gezielte Organwirkung.
- [NCCIH: Homöopathie](https://www.nccih.nih.gov/health/homeopathy) – Forschungsstand und produktabhängige Sicherheitsfragen.
- [BfArM: Allgemeine Fragen zu Arzneimitteln](https://www.bfarm.de/DE/Arzneimittel/_FAQ/Zulassung/Allgemeine-Fragen/faq-liste.html?cms_fid=566918) – Registrierung und Zulassung unterscheiden.
- [IQWiG: Medikamentenanwendung](https://www.gesundheitsinformation.de/medikamenten-anwendung.html) – Wechselwirkungen und Medikamentenübersicht.
- [IQWiG: Untersuchungen bei Endometriose](https://www.gesundheitsinformation.de/untersuchungen-bei-endometriose.html) – hilfreiche Angaben in der Anamnese.
- [IQWiG: Heuschnupfen](https://www.gesundheitsinformation.de/heuschnupfen.html) und [Medikamente bei Heuschnupfen](https://www.gesundheitsinformation.de/welche-medikamente-koennen-heuschnupfen-lindern.html) – Diagnostik und wirksame Behandlungsmöglichkeiten.
- [DGE: Das Mikrobiom – Update für die Ernährungsberatung](https://www.dge.de/blog/2026/das-mikrobiom-update-fuer-die-ernaehrungsberatung/) – Grenzen kommerzieller Mikrobiomtests.
- [NCCIH: Probiotika, Nutzen und Sicherheit](https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety) – stammspezifische Aussagekraft und Risiken.
- [IQWiG: Reizdarmsyndrom](https://www.gesundheitsinformation.de/reizdarmsyndrom.html) – offene Ursachenfragen.
- [IQWiG: Wechseljahrsbeschwerden](https://www.gesundheitsinformation.de/wechseljahrsbeschwerden.html) – unterschiedliche Verläufe und Behandlungsmöglichkeiten.
- [IQWiG: Fruchtbarkeitsstörungen](https://www.gesundheitsinformation.de/fruchtbarkeitsstoerungen.html) – Abklärung beider Partner und mögliche Ursachen.

Diese Recherche ersetzt keine Freigabe durch die Praxisinhaberin beziehungsweise die zuständige medizinische Prüfung. `review.status` bleibt überall `review`, `medicalReviewRequired` ist `true`, `reviewedBy` und `lastReviewedAt` bleiben leer. Keine öffentlichen Autorenangaben wurden ergänzt. Indexierung bleibt über die bestehenden Projekteinstellungen gesperrt.

## Bilder

Es werden ausschließlich bereits im Repository vorhandene Motive unter `apps/web/public/wordpress images/` verwendet. Alle neun Motive wurden vor der Auswahl visuell geprüft. Die Angaben beschreiben den Bildbestand, nicht die Urheberschaft oder eine bestätigte Nutzungslizenz.

| Artikelthema | Lokale Datei | Bildfokus / Vergrößerung |
| --- | --- | --- |
| Ohrakupunktur: Was Sie vor dem ersten Termin wissen sollten | `/wordpress images/Ohrakupunktur-Mann-1.webp` | `center 76%` / 1 |
| Pflanzenheilkunde: Warum die Auswahl entscheidend ist | `/wordpress images/Pflanzenheilkunde-Homepage-1.webp` | `center 74%` / 1 |
| Fußreflexzonentherapie: Berührung, Ablauf und Grenzen | `/wordpress images/Fussreflexzonentheapie-Homepage.webp` | `center bottom` / 1 |
| Zyklusbeschwerden: Beobachtungen, die im Gespräch helfen | `/wordpress images/Frauenheilkunde-Homepage.webp` | `center bottom` / 1.65 |
| Komplex-Homöopathie: Begriffe verstehen und Grenzen kennen | `/wordpress images/Homoeopahtie-pdf-1-scaled-1.webp` | `center bottom` / 1.65 |
| Heuschnupfen: Beschwerden und Begleitung sinnvoll einordnen | `/wordpress images/Heuschnupfen-1.webp` | `center 88%` / 1 |
| Mikrobiom: Warum eine pauschale Darmkur zu kurz greift | `/wordpress images/Darmschleimhaut-1.webp` | `center 52%` / 1 |
| Wechseljahre: Veränderungen in Ruhe einordnen | `/wordpress images/Wechseljahre-Homepage.webp` | `center bottom` / 1 |
| Kinderwunsch: Begleitung ohne zusätzlichen Erfolgsdruck | `/wordpress images/Kinderwunschbild.webp` | `center bottom` / 1 |

Die kurze Bildquellenangabe lautet „Symbolbild · Originalwebsite der Praxis“. Das Feld `imagePermission` hält die noch erforderliche Rechteklärung fest. Die konkreten Originalseiten sind je Artikel in `sources` und `wordpress.originalUrl` gespeichert. Herkunft und Wortlaut der auf den Bildern selbst enthaltenen Aussagen müssen vor Veröffentlichung ebenfalls geprüft werden; der Bildfokus dient allein einer sauberen Darstellung.

## Spätere Redaktion

- `serviceSlugs`: ein oder mehrere vorhandene Therapieverfahren; ein neuer Artikel kann so zentral auf passenden Detailseiten erscheinen.
- `complaintSlugs`: optionale direkte Zuordnung zu vorhandenen Beschwerde-Themenslugs.
- `relatedArticleSlugs`: redaktionell gewählte weiterführende Artikel.
- `topicSlugs`: `naturheilkunde` für Verfahrensartikel, `frauengesundheit` für Frauenartikel; beim Zyklusartikel beide.
- `imagePosition` und `imageScale`: Bildfokus und Darstellung ohne Änderung der Originaldateien.
- Keiner der neun medizinischen Artikel ist als aktuelle Praxisnachricht (`isNews: true`) gekennzeichnet.

Neue Inhalte können dasselbe JSON-Schema beziehungsweise die CMS-Felder verwenden. Kategorien dienen der sichtbaren Einordnung; die verbindlichen Seitenverknüpfungen sind die Slug-Felder. Veröffentlichungen benötigen weiterhin eine echte redaktionelle und medizinische Freigabe.
