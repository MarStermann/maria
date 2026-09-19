import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";

import { JsonLd } from "@/components/json-ld";
import { ArticleSection } from "@/components/article-section";
import { editablePages } from "@/content/editable";
import { siteConfig } from "@/content/site";
import { buildLocalBusinessJsonLd } from "@/lib/seo";
import { brandAsset, brandColors, brandTypography } from "@/theme/brand";

type HomeContent = typeof editablePages.home;
type SectionProps = { content: HomeContent };

export function HomePage({ content = editablePages.home }: { content?: HomeContent } = {}) {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <HomeHero content={content} />
      <ValuesSection content={content} />
      <AboutSection content={content} />
      <ComplaintsSection content={content} />
      <StatementSection content={content} />
      <Container maxWidth="lg"><ArticleSection {...content.articles} /></Container>
    </>
  );
}

function HomeHero({ content }: SectionProps) {
  return (
    <Box
      component="section"
      sx={{
        backgroundImage: {
          xs: `linear-gradient(180deg, rgba(251, 247, 238, 0.98) 0%, rgba(251, 247, 238, 0.95) 48%, rgba(251, 247, 238, 0.76) 100%), url("${brandAsset.heroBackgroundMobilePath}")`,
          md: `linear-gradient(90deg, rgba(251, 247, 238, 0.98) 0%, rgba(251, 247, 238, 0.94) 42%, rgba(251, 247, 238, 0.44) 72%, rgba(251, 247, 238, 0.1) 100%), url("${brandAsset.heroBackgroundDesktopPath}")`
        },
        backgroundPosition: { xs: "center bottom", md: "center center" },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        bgcolor: brandColors.canvas,
        borderBottom: `1px solid ${brandColors.taupe}`,
        minHeight: { md: 596 },
        overflow: "hidden",
        py: { xs: 3.75, md: 4.5 }
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            minHeight: { md: 505 }
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: { xs: 760, md: 650 },
              textAlign: "center",
              width: "100%"
            }}
          >
            <Box
              alt=""
              aria-hidden="true"
              component="img"
              src={brandAsset.emblemPath}
              sx={{
                display: "block",
                borderRadius: "50%",
                height: { xs: 86, sm: 98, md: 112 },
                mixBlendMode: "multiply",
                objectFit: "contain",
                width: { xs: 86, sm: 98, md: 112 }
              }}
            />
            <Typography
              component="h1"
              sx={{
                color: brandColors.olive,
                fontFamily: brandTypography.heading,
                fontSize: { xs: "2.08rem", sm: "2.65rem", lg: "3rem" },
                fontWeight: 500,
                letterSpacing: 0,
                lineHeight: 1.06,
                mt: { xs: 1.35, md: 1.5 },
                textWrap: "balance"
              }}
            >
              {content.hero.title}
            </Typography>

            <Stack
              direction="row"
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{ alignItems: "center", justifyContent: "center", mt: { xs: 1.5, md: 1.75 }, width: "100%" }}
            >
              <Box
                aria-hidden="true"
                sx={{ bgcolor: brandColors.gold, height: "1px", width: { xs: 44, sm: 76 } }}
              />
              <Typography
                component="p"
                sx={{
                  color: brandColors.gold,
                  flex: "0 0 auto",
                  fontSize: { xs: "0.82rem", sm: "0.92rem" },
                  fontWeight: 800,
                  letterSpacing: 0,
                  textTransform: "uppercase"
                }}
              >
                {siteConfig.role}
              </Typography>
              <Box
                aria-hidden="true"
                sx={{ bgcolor: brandColors.gold, height: "1px", width: { xs: 44, sm: 76 } }}
              />
            </Stack>

            <Stack spacing={0.55} sx={{ mt: { xs: 2, md: 2.25 } }}>
              {siteConfig.branding.heroServiceRows.map((row) => (
                <Stack
                  direction="row"
                  key={row.join("-")}
                  spacing={{ xs: 1, sm: 1.35 }}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  {row.map((service, index) => (
                    <Box
                      component="span"
                      key={service}
                      sx={{ alignItems: "center", display: "inline-flex", gap: { xs: 1, sm: 1.35 } }}
                    >
                      {index > 0 ? (
                        <Box
                          aria-hidden="true"
                          component="span"
                          sx={{
                            bgcolor: brandColors.gold,
                            flex: "0 0 1px",
                            height: 17,
                            width: "1px"
                          }}
                        />
                      ) : null}
                      <Typography
                        component="span"
                        sx={{
                          color: brandColors.olive,
                          fontSize: { xs: "0.72rem", sm: "0.82rem", md: "0.88rem" },
                          fontWeight: 700,
                          letterSpacing: 0,
                          lineHeight: 1.35,
                          textTransform: "uppercase"
                        }}
                      >
                        {service}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              ))}
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "center",
                mt: { xs: 2.5, md: 2.75 },
                width: { xs: "100%", sm: "auto" }
              }}
            >
              <Button
                href={siteConfig.contact.appointmentUrl}
                size="large"
                startIcon={<EventAvailableRoundedIcon />}
                variant="contained"
              >
                {content.hero.appointmentLabel}
              </Button>
              <Button
                endIcon={<ArrowForwardRoundedIcon />}
                href="/beschwerden"
                size="large"
                variant="outlined"
              >
                {content.hero.secondaryLabel}
              </Button>
            </Stack>

            <Typography
              color="text.secondary"
              sx={{
                fontSize: "0.94rem",
                fontWeight: 700,
                lineHeight: 1.6,
                mt: { xs: 1.8, md: 2 },
                textAlign: "center"
              }}
            >
              {content.hero.trustSignals.join(" · ")}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function ValueIcon({ name }: { name: string }) {
  switch (name) {
    case "plant": return <SpaOutlinedIcon />;
    case "time": return <ScheduleOutlinedIcon />;
    case "location": return <PlaceOutlinedIcon />;
    default: return <FavoriteBorderRoundedIcon />;
  }
}

function ValuesSection({ content }: SectionProps) {
  return (
    <Box sx={{ bgcolor: brandColors.canvas, borderBottom: "1px solid rgba(214, 198, 174, 0.55)" }}>
      <Container maxWidth="lg">
        <Box
          component="ul"
          sx={{
            display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
            listStyle: "none", m: 0, p: 0, py: { xs: 2.5, md: 3.25 }, rowGap: 2.5
          }}
        >
          {content.values.items.map((item, index) => (
            <Box
              component="li"
              key={item.text}
              sx={{
                alignItems: "center", display: "flex", gap: { xs: 1.25, sm: 2 },
                px: { xs: 1, sm: 2.5, md: 3 },
                borderLeft: { xs: index % 2 ? `1px solid ${brandColors.taupe}` : 0, md: index ? `1px solid ${brandColors.taupe}` : 0 }
              }}
            >
              <Box aria-hidden="true" sx={{ color: brandColors.gold, display: "flex", flexShrink: 0, "& svg": { fontSize: { xs: 30, md: 36 } } }}>
                <ValueIcon name={item.icon} />
              </Box>
              <Typography sx={{ color: brandColors.oliveDark, fontSize: { xs: "0.8rem", sm: "0.85rem" }, lineHeight: 1.65 }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function AboutSection({ content }: SectionProps) {
  return (
    <Box component="section" aria-labelledby="home-about-heading" sx={{ bgcolor: brandColors.canvas }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.97fr) minmax(0, 1.13fr)" }, maxWidth: 1536, mx: "auto" }}>
        <Box sx={{ minHeight: { xs: 310, sm: 390, md: 440 }, position: "relative", overflow: "hidden" }}>
          <Box
            component="img" src={content.about.image} alt={content.about.imageAlt} loading="lazy" decoding="async"
            sx={{ display: "block", height: "100%", width: "100%", position: "absolute", objectFit: "cover", objectPosition: content.about.imagePosition,
              maskImage: { xs: "linear-gradient(to bottom, #000 78%, transparent 100%)", md: "linear-gradient(to right, #000 65%, transparent 100%)" } }}
          />
        </Box>
        <Box sx={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", pl: { xs: 3, sm: 5, md: 4.5 }, pr: { xs: 3, sm: 5, md: 6.5 }, pt: { xs: 1.5, md: 5 }, pb: { xs: 4, md: 5 } }}>
          <Box
            aria-hidden="true" component="img" alt="" src={content.about.decorationImage} loading="lazy" decoding="async"
            sx={{ position: "absolute", right: -65, bottom: -35, width: 230, opacity: 0.17, pointerEvents: "none", mixBlendMode: "multiply", maskImage: "radial-gradient(ellipse at bottom right, #000 25%, transparent 75%)" }}
          />
          <Box sx={{ maxWidth: 550, position: "relative" }}>
            <Typography id="home-about-heading" component="h2" sx={{ fontFamily: brandTypography.heading, color: brandColors.olive, fontSize: { xs: "1.9rem", md: "2.1rem" }, fontWeight: 500, lineHeight: 1.2, whiteSpace: "pre-line", mb: 2.25 }}>
              {content.about.heading}
            </Typography>
            <Stack spacing={1.3}>
              {content.about.paragraphs.map((paragraph) => (
                <Typography key={paragraph} sx={{ fontSize: "0.94rem", lineHeight: 1.75 }}>{paragraph}</Typography>
              ))}
            </Stack>
            <Button href={content.about.buttonHref} variant="outlined" endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 2.5, borderColor: brandColors.sage, fontSize: "0.83rem" }}>
              {content.about.buttonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ComplaintsSection({ content }: SectionProps) {
  return (
    <Box component="section" aria-labelledby="home-complaints-heading" sx={{ bgcolor: brandColors.canvas, py: { xs: 4, md: 3.5 } }}>
      <Container maxWidth="lg">
        <Typography id="home-complaints-heading" component="h2" sx={{ fontFamily: brandTypography.heading, color: brandColors.olive, fontSize: { xs: "1.8rem", md: "2.05rem" }, fontWeight: 500, lineHeight: 1.2, textAlign: "center", textWrap: "balance", mb: 2.5 }}>
          {content.complaints.heading}
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", lg: "repeat(6, minmax(0, 1fr))" }, gap: { xs: 1.5, md: 2 } }}>
          {content.complaints.items.map((item) => (
            <Link
              key={item.title} href={item.href} underline="none" color="inherit"
              sx={{
                display: "flex", flexDirection: "column", bgcolor: brandColors.white,
                border: "1px solid rgba(130, 112, 80, 0.17)", borderRadius: "8px", overflow: "hidden",
                boxShadow: "0 2px 8px rgba(52, 74, 47, 0.025)",
                transition: "border-color 160ms ease, box-shadow 160ms ease",
                "&:hover": { borderColor: brandColors.sage, boxShadow: "0 5px 16px rgba(52, 74, 47, 0.09)" },
                "&:focus-visible": { outline: `3px solid ${brandColors.gold}`, outlineOffset: 3 }
              }}
            >
              <Box sx={{ aspectRatio: "1.22", overflow: "hidden", bgcolor: brandColors.linen, position: "relative", flexShrink: 0 }}>
                <Box
                  component="img" src={item.image} alt={item.imageAlt} loading="lazy" decoding="async"
                  sx={{
                    display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: item.imagePosition,
                    transform: `scale(${item.imageScale})`, transformOrigin: item.imagePosition
                  }}
                />
              </Box>
              <Box sx={{ px: { xs: 1.25, sm: 1.6 }, pt: 1.5, pb: 1.7, textAlign: "center" }}>
                <Typography component="h3" sx={{ color: brandColors.olive, fontFamily: brandTypography.heading, fontWeight: 500, fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.45, minHeight: "3em", whiteSpace: "pre-line" }}>
                  {item.title}
                </Typography>
                <Typography sx={{ mt: 1, fontSize: "0.78rem", lineHeight: 1.65 }}>{item.text}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
          <Button href={content.complaints.buttonHref} endIcon={<ArrowForwardRoundedIcon />} variant="outlined" sx={{ borderColor: brandColors.sage, fontSize: "0.83rem" }}>
            {content.complaints.buttonLabel}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function StatementSection({ content }: SectionProps) {
  return (
    <Box sx={{ bgcolor: brandColors.mist, overflow: "hidden", position: "relative", py: { xs: 4, md: 4.5 } }}>
      <Box
        component="img" src={content.statement.backgroundImage} alt="" aria-hidden="true" loading="lazy" decoding="async"
        sx={{ position: "absolute", right: 0, top: 0, height: "100%", width: { xs: "65%", md: "46%" }, objectFit: "cover", objectPosition: "left 30%", opacity: { xs: 0.22, md: 0.65 }, mixBlendMode: "multiply", transform: "scaleX(-1)", maskImage: "linear-gradient(to left, transparent, black 65%)" }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 1.5, md: 2.5 }, maxWidth: 710 }}>
          <Typography aria-hidden="true" component="span" sx={{ fontFamily: brandTypography.heading, color: brandColors.sage, fontSize: "5rem", lineHeight: 0.95, opacity: 0.65 }}>“</Typography>
          <Typography sx={{ fontFamily: brandTypography.heading, fontStyle: "italic", fontSize: { xs: "1.1rem", md: "1.22rem" }, lineHeight: 1.7, color: brandColors.olive, pt: 0.3 }}>
            {content.statement.text}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
