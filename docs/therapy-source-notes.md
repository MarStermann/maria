# Quellen und redaktionelle Einordnung der Therapiedetailseiten

Die sieben bestehenden Service-Einträge wurden am 19. September 2026 auf Grundlage der Originalwebsite in eine einheitliche, redaktionell erweiterbare Struktur überführt. Die Originalseiten wurden geöffnet und gelesen. Die Abrufansicht des Webwerkzeugs kennzeichnete die Praxisquellen als vor fünf Monaten gecrawlt; ein unveränderter Live-Stand zu diesem Datum ist damit nicht zugesichert.

Jeder Eintrag enthält eine Einführung, zwei methodenspezifische Textabschnitte, drei mögliche Patientenfragen, Vorbereitungshinweise, einen Ablauf, drei FAQs und explizite Quellenlinks. Diese Texte sind neu formulierte Entwürfe, keine Übernahme ganzer Originalartikel. Praktische Hinweise zur Vorbereitung und zum Gespräch wurden redaktionell ergänzt; sie sind keine verifizierte Zusage eines festen Praxisablaufs.

## Originalquellen

| Service | Originalseite | Übernommener sachlicher Ausgangspunkt |
| --- | --- | --- |
| Ohrakupunktur | https://www.alscher-scheunemann.de/therapieverfahren/ohrakupunktur-hamburg/ | Feine Nadeln an der Ohrmuschel, europäische Entwicklung durch Paul Nogier, liegende Anwendung; fünf bis sieben Nadeln je Ohr und etwa 25 Minuten als ursprüngliche Orientierungswerte. |
| Pflanzenheilkunde | https://www.alscher-scheunemann.de/therapieverfahren/pflanzenheilkunde/ | Unterscheidung zwischen traditionellem Wissen und wissenschaftlicher Betrachtung; Teemischungen und Fertigpräparate. |
| Fußreflexzonentherapie | https://www.alscher-scheunemann.de/therapieverfahren/fussreflexzonen-therapie/ | Manuelle Anwendung mit abgestuftem Druck an Fußbereichen; Reflexzonen als Vorstellung der Methode gekennzeichnet. |
| Naturheilkundliche Frauenheilkunde | https://www.alscher-scheunemann.de/therapieverfahren/naturheilkundliche-frauenheilkunde/ | Zyklus, Kinderwunsch und Wechseljahre als Gesprächsthemen; keine gynäkologischen Untersuchungen in der Praxis; ergänzende Verfahren. |
| Komplex-Homöopathie | https://www.alscher-scheunemann.de/therapieverfahren/komplex-homoeopathie/ | Mehrere Einzelmittel in einem Präparat, niedrigere Verdünnungen, Urtinkturen und unterschiedliche Darreichungsformen. |
| Allergien und Heuschnupfen | https://www.alscher-scheunemann.de/therapieverfahren/heuschnupfen-naturheilkundliche-allergiebehandlung/ | Saisonaler Verlauf, Gespräch möglichst vor der Belastungszeit, vorhandene naturheilkundliche Verknüpfungen. |
| Mikrobiologische Therapie | https://www.alscher-scheunemann.de/therapieverfahren/mikrobiologische-therapie/ | Individuelle Betrachtung von Verdauung und vorhandenen Befunden; Stuhluntersuchungen nur mit konkreter Fragestellung; keine pauschalen Darmkuren. |

## Medizinische Einordnung

Die Originalwebsite ist eine Quelle für das dargestellte Praxisangebot, kein Nachweis der medizinischen Wirksamkeit. Folgende weitreichende Aussagen der Originalseiten wurden deshalb nicht übernommen:

- Diagnose oder gezielte Behandlung aller Organe über Ohr- oder Fußzonen.
- Pflanzenheilkunde als allgemeine erste Wahl bei Erkrankungen oder pauschale Wirkung gegen Erreger.
- Garantierte Hormonregulation, Heilung oder verbesserte Chancen auf eine Schwangerschaft.
- Homöopathische Wirkverstärkung, Entgiftung, Entsäuerung oder pauschale Eignung bei Erkrankungen.
- Verlässliche Änderung der Allergiebereitschaft oder „Regeneration“ vermeintlich erschöpfter Nebennieren.
- Automatische Zuordnung unspezifischer Beschwerden zu Dysbiose oder „Leaky Gut“ sowie garantierter Behandlungserfolg aus einem Laborbefund.

Die Entwürfe erklären Grenzen ausdrücklich und lassen notwendige ärztliche Versorgung bestehen. Die fehlende belastbare spezifische Wirksamkeitsevidenz der Homöopathie ist in Einführung, FAQ und Hinweis sichtbar. Fachliche Einordnung wurde anhand folgender unabhängiger Primäranbieter recherchiert; passende Quellen stehen auch direkt in den Service-Einträgen:

- [NCCIH: Akupunktur](https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety)
- [NCCIH: Heilpflanzen](https://www.nccih.nih.gov/health/herbsataglance)
- [NCCIH: Pflanzen und Arzneimittelinteraktionen](https://www.nccih.nih.gov/health/tips/tips-how-herbs-can-interact-with-medicines)
- [NCCIH: Reflexzonentherapie](https://www.nccih.nih.gov/health/reflexology)
- [NCCIH: Ergänzende Verfahren einordnen](https://www.nccih.nih.gov/health/are-you-considering-a-complementary-health-approach)
- [NCCIH: Homöopathie](https://www.nccih.nih.gov/health/homeopathy)
- [IQWiG: Heuschnupfen](https://www.gesundheitsinformation.de/heuschnupfen.html)
- [NCCIH: Probiotika](https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety)

## Bilder und Freigabe

Die sieben bereits zugeordneten Dateien unter `apps/web/public/wordpress images/` bleiben erhalten. Alle Motive wurden visuell angesehen und mit beschreibenden Alttexten versehen. Es handelt sich um Symbolmotive beziehungsweise eine schematische Illustration, nicht um belegte Aufnahmen realer Patientinnen oder Patienten. Die bestehenden Fokuspositionen wurden beibehalten. Für Frauenheilkunde und Komplex-Homöopathie ist nach Browserprüfung `imageScale: 1.4` hinterlegt, um eingebrannte Textbänder im Hero-Ausschnitt auszublenden; die anderen Motive verwenden `imageScale: 1`.

Die Bestandsbilder enthalten eingebrannten Text, teilweise mit medizinischer Wertung. Besonders das Homöopathiebild bezeichnet die Methode als „bewährten Baustein“. Der Bildausschnitt soll diese Werbezeile nicht als unkommentierte Wirksamkeitsaussage zeigen. Die Darmschleimhautgrafik ist keine fachlich freigegebene anatomische Lehrgrafik.

`imageSource` enthält eine kurze Bildunterschrift zum Originalbestand. Die konkrete zugehörige Originalseite steht im `sources`-Array und oben in dieser Dokumentation. `imagePermission` hält ausdrücklich fest, dass Nutzungsrechte und Freigabe durch die Praxis noch zu bestätigen sind. Ein Recht zur Veröffentlichung wurde nicht behauptet. Alle Einträge bleiben `review`, `medicalReviewRequired` bleibt `true`, und `reviewedBy` sowie `lastReviewedAt` bleiben leer. Die Überarbeitung ist damit redaktionell vorbereitet, aber nicht medizinisch oder rechtlich zur Veröffentlichung freigegeben.
