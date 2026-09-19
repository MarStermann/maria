import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box, Breadcrumbs, Button, Container, Link, Stack, Typography } from "@mui/material";

import { ArticleSection } from "@/components/article-section";
import { Eyebrow } from "@/components/static-page";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/content/site";
import { buildServiceJsonLd } from "@/lib/seo";
import { brandColors } from "@/theme/brand";

type Service = (typeof siteConfig.services)[number];

export function ServicePage({ service }: { service: Service }) {
  return <>
    <JsonLd data={buildServiceJsonLd(service)} />
    <Box component="article" sx={{ "& section[id]": { scrollMarginTop: 110 }, overflowWrap: "break-word" }}>
      <Box sx={{ bgcolor: brandColors.linen, borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <Breadcrumbs aria-label="Brotkrümelnavigation" sx={{ mb: { xs: 3, md: 5 }, fontSize: "0.85rem" }}>
            <Link color="inherit" href="/" underline="hover">Startseite</Link>
            <Link color="inherit" href="/therapieverfahren" underline="hover">Therapieverfahren</Link>
            <Typography color="text.primary" sx={{ fontSize: "inherit" }}>{service.title}</Typography>
          </Breadcrumbs>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(0, 1fr)" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
            <Box sx={{ minWidth: 0 }}>
              <Eyebrow>Naturheilpraxis · Hamburg</Eyebrow>
              <Typography component="h1" variant="h1" sx={{ fontSize: { xs: "clamp(2.3rem, 8.4vw, 3.2rem)", md: "clamp(2.8rem, 4.1vw, 3.7rem)" }, hyphens: "auto", overflowWrap: "anywhere" }}>{service.title}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: "1.05rem", md: "1.15rem" }, lineHeight: 1.8, mt: 2.5 }}>{service.summary}</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3.5, alignItems: { sm: "center" } }}>
                <Button href="/kontakt" startIcon={<EventAvailableRoundedIcon />} variant="contained">Termin anfragen</Button>
                <Button href="#ablauf" endIcon={<ArrowForwardRoundedIcon />}>Ablauf kennenlernen</Button>
              </Stack>
            </Box>
            <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
              <Box sx={{ overflow: "hidden", borderRadius: "8px" }}>
              <Box component="img" src={service.image} alt={service.imageAlt} decoding="async" fetchPriority="high"
                sx={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover", objectPosition: service.imagePosition || "center bottom", transform: `scale(${service.imageScale || 1})`, transformOrigin: "center bottom" }} />
              </Box>
              {service.imageSource && <Typography component="figcaption" color="text.secondary" sx={{ fontSize: "0.75rem", mt: 1 }}>{service.imageSource}</Typography>}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 300px" }, gap: { xs: 5, md: 8 }, alignItems: "start" }}>
          <Stack spacing={{ xs: 5, md: 6 }} sx={{ minWidth: 0 }}>
            <Box component="section" id="ueberblick">
              <Eyebrow>Das Verfahren verstehen</Eyebrow>
              <Typography component="h2" variant="h2">Das Verfahren im Überblick</Typography>
              <Typography color="text.secondary" sx={{ mt: 2, whiteSpace: "pre-line" }}>{service.introduction}</Typography>
              {service.sections?.map(section => <Box key={section.heading} sx={{ mt: 3.5 }}>
                <Typography component="h3" variant="h3">{section.heading}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1.25, whiteSpace: "pre-line" }}>{section.body}</Typography>
              </Box>)}
            </Box>

            {!!service.patientQuestions?.length && <Box component="section" id="anliegen" sx={{ borderLeft: `3px solid ${brandColors.gold}`, pl: { xs: 2.5, md: 3.5 } }}>
              <Typography component="h2" variant="h3">Fragen, die wir gemeinsam besprechen</Typography>
              <Stack component="ul" spacing={1.25} sx={{ pl: 2.25, mb: 0, mt: 2 }}>
                {service.patientQuestions.map(question => <Typography component="li" key={question}>{question}</Typography>)}
              </Stack>
            </Box>}

            <Box component="section" id="ablauf">
              <Eyebrow>Schritt für Schritt</Eyebrow>
              <Typography component="h2" variant="h2">So läuft die Begleitung ab</Typography>
              <Stack component="ol" spacing={0} sx={{ listStyle: "none", p: 0, mt: 3, mb: 0 }}>
                {service.process.map((item, index) => <Box component="li" key={item} sx={{ display: "flex", gap: 2.5, py: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
                  <Typography aria-hidden="true" sx={{ color: "secondary.main", fontFamily: "Georgia, serif", fontSize: "1.65rem", lineHeight: 1.3, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</Typography>
                  <Typography>{item}</Typography>
                </Box>)}
              </Stack>
            </Box>

            {!!service.faqs?.length && <Box component="section" id="fragen">
              <Eyebrow>Gut informiert</Eyebrow>
              <Typography component="h2" variant="h2">Häufige Fragen</Typography>
              <Box sx={{ mt: 3, borderTop: "1px solid", borderColor: "divider" }}>
                {service.faqs.map(faq => <Box component="details" key={faq.question} sx={{ borderBottom: "1px solid", borderColor: "divider", "&[open] .faq-chevron": { transform: "rotate(180deg)" } }}>
                  <Box component="summary" sx={{ cursor: "pointer", listStyle: "none", display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between", py: 2.5, "&::-webkit-details-marker": { display: "none" }, "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 4 } }}>
                    <Typography component="h3" sx={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.5 }}>{faq.question}</Typography>
                    <ExpandMoreRoundedIcon className="faq-chevron" sx={{ flexShrink: 0, color: "primary.main" }} />
                  </Box>
                  <Typography color="text.secondary" sx={{ pb: 2.5, pr: { sm: 5 } }}>{faq.answer}</Typography>
                </Box>)}
              </Box>
            </Box>}
            <Box component="section" id="einordnung" sx={{ p: { xs: 2.5, sm: 3 }, bgcolor: brandColors.mist, borderRadius: "8px" }}>
              <Typography component="h2" variant="h3">Möglichkeiten und Grenzen</Typography>
              <Typography sx={{ mt: 1.5 }}>{service.notice}</Typography>
            </Box>
            {!!service.sources?.length && <Box component="section">
              <Typography component="h2" sx={{ fontSize: "0.95rem", fontWeight: 700 }}>Quellen und weiterführende Informationen</Typography>
              <Stack component="ul" spacing={0.75} sx={{ pl: 2.25, mt: 1.5, mb: 0 }}>
                {service.sources.map(source => <Box component="li" key={source.url}><Link href={source.url} underline="always" sx={{ fontSize: "0.875rem", textUnderlineOffset: 3 }}>{source.label}</Link></Box>)}
              </Stack>
            </Box>}
          </Stack>

          <Stack component="aside" spacing={3} sx={{ minWidth: 0 }}>
            <Box component="nav" aria-label="Auf dieser Seite" sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 3, display: { xs: "none", md: "block" } }}>
              <Typography sx={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, mb: 1.5 }}>Auf dieser Seite</Typography>
              <Stack spacing={0.75}>
                {[{ href: "#ueberblick", label: "Das Verfahren" }, { href: "#ablauf", label: "Ablauf der Begleitung" }, { href: "#fragen", label: "Häufige Fragen" }, { href: "#einordnung", label: "Möglichkeiten und Grenzen" }].map(item => <Link key={item.href} href={item.href} underline="hover" sx={{ py: 0.5 }}>{item.label}</Link>)}
              </Stack>
            </Box>
            {!!service.preparationNotes?.length && <Box sx={{ p: 3, bgcolor: brandColors.linen, borderRadius: "8px" }}>
              <Typography component="h2" variant="h3">Für Ihren Termin</Typography>
              <Stack component="ul" spacing={1.5} sx={{ pl: 2, mb: 0, mt: 2 }}>
                {service.preparationNotes.map(note => <Typography component="li" key={note} sx={{ fontSize: "0.93rem" }}>{note}</Typography>)}
              </Stack>
            </Box>}
            <Box sx={{ p: 3, bgcolor: brandColors.olive, color: brandColors.white, borderRadius: "8px" }}>
              <Typography component="h2" variant="h3">Raum für Ihre Fragen</Typography>
              <Typography sx={{ mt: 1.5, mb: 2.5, fontSize: "0.95rem" }}>Wir besprechen Ihr Anliegen und klären gemeinsam, welche nächsten Schritte zu Ihrer Situation passen.</Typography>
              <Button href="/kontakt" variant="contained" fullWidth sx={{ bgcolor: brandColors.white, color: brandColors.oliveDark, "&:hover": { bgcolor: brandColors.cream } }}>Termin anfragen</Button>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ mt: { xs: 4, md: 6 }, borderTop: "1px solid", borderColor: "divider" }}>
          <ArticleSection serviceSlug={service.slug} layout="list" heading="Wissen zum Weiterlesen" description={`Hintergründe und weiterführende Artikel zum Thema ${service.title}.`} limit={3} />
        </Box>
        <Button href="/therapieverfahren" startIcon={<ArrowBackRoundedIcon />} sx={{ mt: 3 }}>Alle Therapieverfahren</Button>
      </Container>
    </Box>
  </>;
}
