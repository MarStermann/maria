import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Alert, Box, Breadcrumbs, Button, Chip, Container, Link, Paper, Stack, Typography } from "@mui/material";

import { JsonLd } from "@/components/json-ld";
import { ArticleSection } from "@/components/article-section";
import { TherapyCarousel } from "@/components/therapy-carousel";
import { complaintEntries, type ComplaintEntry, type ComplaintRegion } from "@/content/complaints";
import { siteConfig } from "@/content/site";
import { buildComplaintPageJsonLd, type ComplaintFaq } from "@/lib/seo";
import { brandAsset, brandColors } from "@/theme/brand";

type ComplaintDetailPageProps = {
  entry: ComplaintEntry;
};

const anamnesisFocus: Record<ComplaintRegion["id"], readonly string[]> = {
  kopf: [
    "Beginn, Häufigkeit und Dauer der Beschwerden",
    "Begleitsymptome sowie mögliche Bezüge zu Nacken, Schlaf oder Stress",
    "Vorhandene Befunde, Medikamente und bisherige Behandlungen"
  ],
  "seelisch-mental": [
    "Belastende Situationen, Tagesverlauf und persönliche Erholungsphasen",
    "Schlaf, körperliche Anspannung und vegetative Begleitsymptome",
    "Bereits bestehende ärztliche oder psychotherapeutische Unterstützung"
  ],
  "haut-haare": [
    "Beginn, Verlauf und bisherige dermatologische Diagnostik",
    "Hautpflege, Ernährung, Stress und mögliche hormonelle Veränderungen",
    "Medikamente, Allergien und bekannte persönliche Auslöser"
  ],
  bewegungsapparat: [
    "Lokalisation, Beweglichkeit und zeitlicher Verlauf",
    "Belastung im Alltag, Beruf, Sport und Erholungsphasen",
    "Ärztliche Befunde sowie bereits erfolgte Behandlungen"
  ],
  "atemwege-immunsystem": [
    "Saison, Häufigkeit, Verlauf und mögliche Auslöser",
    "Schlaf, Stress, Ernährung und Erholung nach Infekten",
    "Allergologische Befunde, Medikamente und ärztliche Diagnosen"
  ],
  "magen-darm": [
    "Zeitpunkt, Verlauf und Zusammenhang mit Mahlzeiten",
    "Stuhlverhalten, Ernährung, Medikamente, Stress und Zyklus",
    "Vorhandene ärztliche Befunde und bisherige Ernährungsversuche"
  ],
  "frauenheilkunde-unterbauch": [
    "Zyklusverlauf, Blutung, Schmerzen und weitere Begleitsymptome",
    "Hormonelle Lebensphase, Medikamente und bisherige Behandlungen",
    "Gynäkologische Diagnosen und bereits vorliegende Befunde"
  ]
};

export function ComplaintDetailPage({ entry }: ComplaintDetailPageProps) {
  const { group, region, topic } = entry;
  const linkedTherapies = topic.therapySlugs
    .map((slug) => siteConfig.services.find((service) => service.slug === slug))
    .filter((service): service is (typeof siteConfig.services)[number] => Boolean(service));
  const relatedEntries = complaintEntries
    .filter((candidate) => candidate.topic.slug !== topic.slug && candidate.region.id === region.id)
    .sort((a, b) => Number(b.group.label === group.label) - Number(a.group.label === group.label))
    .slice(0, 4);
  const contextLabel = group.label === region.label ? region.label : `${region.label} · ${group.label}`;
  const therapyNames = linkedTherapies.map((service) => service.title).join(", ");
  const faqs: readonly ComplaintFaq[] = [
    {
      question: `Wann ist bei „${topic.title}“ eine ärztliche Abklärung wichtig?`,
      answer:
        topic.careNote ??
        "Neu aufgetretene, starke, anhaltende oder deutlich zunehmende Beschwerden sollten ärztlich abgeklärt werden. Bei akuten Warnzeichen hat die medizinische Versorgung Vorrang."
    },
    {
      question: "Welche Informationen helfen im Erstgespräch?",
      answer: `Hilfreich sind Angaben zu Verlauf, Auslösern und Begleitsymptomen sowie vorhandene Befunde, Medikamentenlisten und bisherige Behandlungen. Für das Anliegen „${topic.title}“ werden die Fragen an Ihre persönliche Situation angepasst.`
    },
    {
      question: `Welche naturheilkundlichen Verfahren können zu „${topic.title}“ besprochen werden?`,
      answer: `${therapyNames || "Mögliche Verfahren"} können je nach Anamnese besprochen werden. Die Auflistung ist keine Behandlungsempfehlung und sagt nichts über die Eignung im Einzelfall aus.`
    }
  ];

  return (
    <>
      <JsonLd data={buildComplaintPageJsonLd(entry, faqs)} />
      <Box component="article">
        <Box sx={{ bgcolor: brandColors.linen, borderBottom: `1px solid ${brandColors.taupe}` }}>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
            <Breadcrumbs aria-label="Brotkrümelnavigation" sx={{ mb: 3 }}>
              <Link color="inherit" href="/" underline="hover">
                Startseite
              </Link>
              <Link color="inherit" href="/beschwerden" underline="hover">
                Beschwerden
              </Link>
              <Typography color="text.primary">{topic.title}</Typography>
            </Breadcrumbs>
            <Box
              sx={{
                alignItems: "center",
                display: "grid",
                gap: { xs: 4, md: 7 },
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.25fr) minmax(280px, 0.75fr)" }
              }}
            >
              <Box>
                <Typography component="p" variant="overline">
                  {contextLabel}
                </Typography>
                <Typography component="h1" sx={{ maxWidth: 760 }} variant="h1">
                  {topic.title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: { xs: "1.05rem", md: "1.16rem" }, lineHeight: 1.75, mt: 2.5, maxWidth: 760 }}>
                  {topic.description}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mt: 3.5 }}>
                  <Button href="/kontakt" startIcon={<EventAvailableRoundedIcon />} variant="contained">
                    Termin anfragen
                  </Button>
                  <Button href="/beschwerden" startIcon={<ArrowBackRoundedIcon />} variant="outlined">
                    Alle Beschwerden
                  </Button>
                </Stack>
              </Box>
              <Box
                sx={{
                  aspectRatio: "1",
                  border: `1px solid ${brandColors.goldSoft}`,
                  borderRadius: "50%",
                  boxShadow: "0 18px 45px rgba(38, 56, 32, 0.2)",
                  justifySelf: "center",
                  maxWidth: 340,
                  overflow: "hidden",
                  width: "100%"
                }}
              >
                <Box
                  alt={`Schematische Illustration zu ${topic.title}`}
                  component="img"
                  decoding="async"
                  src={brandAsset.complaintsXrayPaths[region.id]}
                  sx={{ display: "block", height: "100%", objectFit: "cover", width: "100%" }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 5, md: 7 },
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(280px, 0.65fr)" }
            }}
          >
            <Stack spacing={6} sx={{ minWidth: 0 }}>
              <Box component="section">
                <Typography component="h2" variant="h2">
                  {topic.title} individuell einordnen
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
                  Beschwerden können ähnliche Namen tragen und dennoch sehr unterschiedliche Hintergründe haben. Deshalb stehen nicht einzelne Symptome oder ein festes Verfahren am Anfang, sondern Ihr Verlauf, Ihre Lebenssituation und bereits vorhandene medizinische Befunde.
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8, mt: 1.5 }}>
                  {region.description} Die naturheilkundliche Begleitung versteht sich dabei als Ergänzung und ersetzt keine notwendige ärztliche Diagnostik oder Behandlung.
                </Typography>
              </Box>

              <Box component="section">
                <Typography component="h2" variant="h2">
                  Was im Erstgespräch wichtig ist
                </Typography>
                <Stack component="ul" spacing={1.25} sx={{ listStyle: "none", m: 0, mt: 2.5, p: 0 }}>
                  {anamnesisFocus[region.id].map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{
                        bgcolor: brandColors.canvas,
                        border: `1px solid ${brandColors.taupe}`,
                        borderLeft: `4px solid ${brandColors.gold}`,
                        borderRadius: "8px",
                        p: 2.25
                      }}
                    >
                      <Typography sx={{ lineHeight: 1.65 }}>{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box component="section">
                <Typography component="h2" variant="h2">
                  Mögliche naturheilkundliche Verfahren
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.75, mt: 2 }}>
                  Welche Verfahren im Zusammenhang mit „{topic.title}“ passen könnten, wird erst nach der persönlichen Anamnese entschieden. Die folgenden Praxisangebote dienen als Orientierung.
                </Typography>
                <TherapyCarousel label="Mögliche naturheilkundliche Verfahren" services={linkedTherapies} />
              </Box>

              <Box component="section">
                <Typography component="h2" variant="h2">
                  Häufige Fragen: {topic.title}
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 2.5 }}>
                  {faqs.map((faq) => (
                    <Paper elevation={0} key={faq.question} sx={{ border: `1px solid ${brandColors.taupe}`, borderRadius: "8px", p: 2.5 }}>
                      <Typography component="h3" sx={{ fontSize: "1.08rem", fontWeight: 800, lineHeight: 1.45 }}>
                        {faq.question}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 1 }}>
                        {faq.answer}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Stack component="aside" spacing={3}>
              <Paper elevation={0} sx={{ border: `1px solid ${brandColors.taupe}`, borderRadius: "8px", p: 2.5 }}>
                <Typography component="h2" variant="h3">
                  Kurz eingeordnet
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", mt: 2, rowGap: 0.75 }}>
                  <Chip label={region.shortLabel} size="small" variant="outlined" />
                  {group.label !== region.label ? <Chip label={group.label} size="small" variant="outlined" /> : null}
                  <Chip label="Hamburg" size="small" variant="outlined" />
                </Stack>
                {topic.careNote ? (
                  <Alert severity="info" sx={{ mt: 2.25 }}>
                    {topic.careNote}
                  </Alert>
                ) : null}
              </Paper>

              <Paper elevation={0} sx={{ border: `1px solid ${brandColors.taupe}`, borderRadius: "8px", p: 2.5 }}>
                <Typography component="h2" variant="h3">
                  Verwandte Beschwerden
                </Typography>
                <Stack spacing={1.25} sx={{ mt: 2 }}>
                  {relatedEntries.map((related) => (
                    <Link
                      href={`/beschwerden/${related.topic.slug}`}
                      key={related.topic.slug}
                      sx={{ alignItems: "center", display: "flex", fontWeight: 750, gap: 0.5, justifyContent: "space-between", textDecoration: "none" }}
                    >
                      {related.topic.title}
                      <ArrowForwardRoundedIcon sx={{ flex: "0 0 auto", fontSize: "1rem" }} />
                    </Link>
                  ))}
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ bgcolor: brandColors.olive, borderRadius: "8px", color: brandColors.white, p: 2.75 }}>
                <Typography component="h2" variant="h3">
                  Persönlich besprechen
                </Typography>
                <Typography sx={{ lineHeight: 1.7, mt: 1.25, opacity: 0.9 }}>
                  Im Erstgespräch klären wir, welche nächsten Schritte zu Ihrer Situation passen und wann eine ärztliche Abklärung Vorrang hat.
                </Typography>
                <Button color="inherit" href="/kontakt" sx={{ bgcolor: brandColors.white, color: brandColors.oliveDark, mt: 2, "&:hover": { bgcolor: brandColors.cream } }} variant="contained">
                  Termin anfragen
                </Button>
              </Paper>
            </Stack>
          </Box>
          <ArticleSection complaintSlug={topic.slug} layout="list" heading="Wissen zum Weiterlesen" limit={3} />
        </Container>
      </Box>
    </>
  );
}
