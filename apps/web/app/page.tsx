import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography
} from "@mui/material";

import { JsonLd } from "@/components/json-ld";
import { Eyebrow } from "@/components/static-page";
import { YarrowIllustration } from "@/components/yarrow-illustration";
import { siteConfig } from "@/content/site";
import { buildLocalBusinessJsonLd, createPageMetadata } from "@/lib/seo";
import { brandColors, brandTypography } from "@/theme/brand";

export const metadata = createPageMetadata({
  title: "Heilpraktikerin in Hamburg für Akupunktur und Naturheilkunde",
  description:
    "Maria Alscher-Scheunemann in Hamburg begleitet mit Akupunktur, klassischer Naturheilkunde und ganzheitlicher Frauenheilkunde.",
  path: "/"
});

const serviceLine = [
  "Akupunktur",
  "Klassische Naturheilkunde",
  "Ganzheitliche Frauenheilkunde"
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <Box
        component="section"
        sx={{
          bgcolor: brandColors.canvas,
          overflowX: "clip",
          overflowY: "visible",
          position: "relative"
        }}
      >
        <YarrowIllustration
          title=""
          sx={{
            bottom: { xs: -68, md: -86 },
            height: { xs: 280, md: 390 },
            left: { xs: -104, md: -74 },
            opacity: 0.12,
            pointerEvents: "none",
            position: "absolute",
            width: { xs: 280, md: 390 }
          }}
        />
        <YarrowIllustration
          title=""
          sx={{
            height: { xs: 320, md: 460 },
            opacity: 0.1,
            pointerEvents: "none",
            position: "absolute",
            right: { xs: -118, md: -96 },
            top: { xs: 42, md: 54 },
            width: { xs: 320, md: 460 }
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            alignItems: "center",
            display: "flex",
            minHeight: { xs: "auto", md: "calc(100svh - 82px)" },
            pb: { xs: 12, md: 13 },
            pt: { xs: 3, md: 3.5 },
            position: "relative"
          }}
        >
          <Box
            sx={{
              mx: "auto",
              textAlign: "center",
              width: "min(100%, 920px)"
            }}
          >
            <YarrowIllustration
              framed
              sx={{
                height: { xs: 126, md: 156 },
                mx: "auto",
                width: { xs: 126, md: 156 }
              }}
            />
            <Typography
              component="h1"
              sx={{
                color: brandColors.olive,
                fontFamily: brandTypography.heading,
                fontSize: { xs: "2.45rem", sm: "3.45rem", md: "4.35rem" },
                fontWeight: 500,
                letterSpacing: 0,
                lineHeight: 1.02,
                mt: { xs: 1.8, md: 2.1 }
              }}
            >
              {siteConfig.name}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                mt: 1.5
              }}
            >
              <Box sx={{ bgcolor: brandColors.gold, height: 1, width: { xs: 48, sm: 84 } }} />
              <Typography
                component="p"
                sx={{
                  color: brandColors.gold,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase"
                }}
              >
                {siteConfig.role}
              </Typography>
              <Box sx={{ bgcolor: brandColors.gold, height: 1, width: { xs: 48, sm: 84 } }} />
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 0.75, md: 1.5 }}
              sx={{ alignItems: "center", justifyContent: "center", mt: 3 }}
            >
              {serviceLine.map((item, index) => (
                <Box
                  component="span"
                  key={item}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                    gap: { xs: 0, md: 1.5 }
                  }}
                >
                  {index > 0 ? (
                    <Box
                      aria-hidden="true"
                      component="span"
                      sx={{
                        bgcolor: brandColors.gold,
                        display: { xs: "none", md: "inline-block" },
                        height: 18,
                        width: 1
                      }}
                    />
                  ) : null}
                  <Typography
                    component="span"
                    sx={{
                      color: brandColors.olive,
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase"
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Typography
              color="text.secondary"
              sx={{
                fontFamily: brandTypography.heading,
                fontSize: { xs: "1.35rem", md: "1.7rem" },
                fontStyle: "italic",
                lineHeight: 1.45,
                mx: "auto",
                mt: 3,
                maxWidth: 620
              }}
            >
              {siteConfig.branding.quote}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "center", mt: 3.5 }}>
              <Button
                href="/kontakt"
                size="large"
                startIcon={<EventAvailableRoundedIcon />}
                variant="contained"
              >
                Termin anfragen
              </Button>
              <Button
                endIcon={<ArrowForwardRoundedIcon />}
                href="/leistungen"
                size="large"
                variant="outlined"
              >
                Leistungen ansehen
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: brandColors.linen,
          borderBottom: `1px solid ${brandColors.taupe}`,
          isolation: "isolate",
          mt: 0,
          overflow: "visible",
          pt: { xs: 12, md: 13 },
          pb: { xs: 7, md: 9 },
          position: "relative"
        }}
      >
        <HeroEarthTransition />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.82fr) minmax(0, 1.18fr)" },
              mb: 4
            }}
          >
            <Box>
              <Eyebrow>Leistungen</Eyebrow>
              <Typography component="h2" variant="h2">
                Naturheilkundliche Schwerpunkte
              </Typography>
            </Box>
            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, minmax(0, 1fr))" }
            }}
          >
            {siteConfig.services.map((service) => (
              <Card component="article" key={service.slug} variant="outlined" sx={{ bgcolor: "background.paper" }}>
                <CardContent sx={{ p: 3 }}>
                  <SpaRoundedIcon sx={{ color: "secondary.main", mb: 2 }} />
                  <Typography component="h3" variant="h3">
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                    {service.summary}
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardRoundedIcon />}
                    href={`/leistungen/${service.slug}`}
                    sx={{ mt: 2, px: 0 }}
                  >
                    Mehr erfahren
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Container component="section" maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.82fr) minmax(0, 1.18fr)" }
          }}
        >
          <Box>
            <Eyebrow>Ablauf</Eyebrow>
            <Typography component="h2" variant="h2">
              Vom ersten Kontakt zur Begleitung
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Ein einfacher Ablauf macht die Entscheidung leichter und reduziert Unsicherheit
              vor dem ersten Termin.
            </Typography>
          </Box>
          <Stack component="ol" spacing={1.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
            {[
              "Kontakt aufnehmen und kurz schildern, worum es geht.",
              "Ersttermin mit ausführlicher Anamnese vereinbaren.",
              "Individuelle nächste Schritte transparent besprechen."
            ].map((item, index) => (
              <Box
                component="li"
                key={item}
                sx={{
                  alignItems: "center",
                  bgcolor: "background.paper",
                  border: `1px solid ${brandColors.taupe}`,
                  borderLeft: `4px solid ${brandColors.gold}`,
                  borderRadius: 1,
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "48px 1fr",
                  p: 2.25
                }}
              >
                <Chip label={index + 1} size="small" sx={{ bgcolor: brandColors.mist }} />
                <Typography>{item}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}

function HeroEarthTransition() {
  return (
    <Box
      aria-hidden="true"
      component="svg"
      preserveAspectRatio="none"
      sx={{
        height: { xs: 168, md: 202 },
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        top: { xs: -82, md: -104 },
        width: "100%",
        zIndex: 0
      }}
      viewBox="0 0 1440 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 72C151 47 274 41 426 61C572 80 719 111 873 88C1036 64 1194 38 1440 64V220H0Z"
        fill={brandColors.linen}
      />
      <path
        d="M0 73C151 48 274 42 426 62C572 81 719 112 873 89C1036 65 1194 39 1440 65"
        fill="none"
        stroke={brandColors.taupe}
        strokeWidth="2"
      />
      <path
        d="M0 101C155 81 304 87 445 104C619 126 767 131 931 105C1102 78 1266 82 1440 101L1440 126C1266 107 1102 103 931 130C767 156 619 151 445 129C304 112 155 106 0 126Z"
        fill={brandColors.mist}
        opacity="0.46"
      />
      <path
        d="M0 131C176 116 338 131 503 144C660 156 798 157 958 135C1123 112 1281 116 1440 134L1440 151C1281 133 1123 129 958 152C798 174 660 173 503 161C338 148 176 133 0 148Z"
        fill={brandColors.taupe}
        opacity="0.24"
      />
      <g fill="none" stroke={brandColors.olive} strokeLinecap="round" strokeLinejoin="round">
        <BoundaryPlant x={194} y={76} scale={0.88} />
        <BoundaryPlant x={426} y={62} scale={0.68} />
        <BoundaryPlant x={1018} y={78} scale={0.76} />
        <BoundaryPlant x={1228} y={58} scale={0.96} />
      </g>
      <g fill="none" stroke={brandColors.sage} strokeLinecap="round" opacity="0.72">
        <RootSystem x={194} y={79} scale={0.9} />
        <RootSystem x={426} y={64} scale={0.7} />
        <RootSystem x={1018} y={80} scale={0.76} />
        <RootSystem x={1228} y={61} scale={1} />
      </g>
      <g fill={brandColors.gold} opacity="0.32">
        <circle cx="99" cy="136" r="2.4" />
        <circle cx="318" cy="119" r="1.8" />
        <circle cx="617" cy="151" r="2.1" />
        <circle cx="861" cy="127" r="1.7" />
        <circle cx="1130" cy="143" r="2.2" />
        <circle cx="1322" cy="117" r="1.8" />
      </g>
    </Box>
  );
}

function BoundaryPlant({
  x,
  y,
  scale
}: Readonly<{ x: number; y: number; scale: number }>) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0C-1-24 3-47 13-69" strokeWidth="2" />
      <path d="M2-27C-15-43-32-49-50-49" strokeWidth="1.35" />
      <path d="M1-17C18-34 36-41 55-39" strokeWidth="1.35" />
      <path d="M-18-42c-13-10-26-14-39-13" strokeWidth="1.05" />
      <path d="M-27-47l-15-10M-27-47l-12 9M-39-51l-13-8M-39-51l-10 8" strokeWidth="0.95" />
      <path d="M24-35c14-8 27-11 41-8" strokeWidth="1.05" />
      <path d="M33-38l15-9M33-38l11 10M45-41l13-8M45-41l9 9" strokeWidth="0.95" />
      <g fill={brandColors.white} stroke={brandColors.taupe} strokeWidth="0.55">
        <MiniBloom x={13} y={-73} />
        <MiniBloom x={-2} y={-65} scale={0.82} />
        <MiniBloom x={30} y={-62} scale={0.78} />
      </g>
    </g>
  );
}

function RootSystem({
  x,
  y,
  scale
}: Readonly<{ x: number; y: number; scale: number }>) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0C2 20-1 43-8 67" strokeWidth="1.35" />
      <path d="M-4 22C-22 31-36 44-48 64" strokeWidth="1.05" />
      <path d="M-7 40C-21 47-30 57-37 72" strokeWidth="0.85" />
      <path d="M-5 31C12 40 26 53 37 71" strokeWidth="1.05" />
      <path d="M-2 50C10 57 18 68 24 83" strokeWidth="0.85" />
      <path d="M-12 58C-25 63-36 72-45 86" strokeWidth="0.75" />
      <path d="M-1 16C10 19 21 27 31 39" strokeWidth="0.85" />
    </g>
  );
}

function MiniBloom({
  x,
  y,
  scale = 1
}: Readonly<{ x: number; y: number; scale?: number }>) {
  const petal = 3.4 * scale;
  const offset = 4.4 * scale;

  return (
    <g>
      <circle cx={x - offset} cy={y} r={petal} />
      <circle cx={x} cy={y - offset} r={petal} />
      <circle cx={x + offset} cy={y} r={petal} />
      <circle cx={x} cy={y + offset} r={petal} />
      <circle cx={x} cy={y} fill={brandColors.goldSoft} r={1.4 * scale} stroke="none" />
    </g>
  );
}
