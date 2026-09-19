import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import { YarrowIllustration } from "@/components/yarrow-illustration";
import { editablePages } from "@/content/editable";
import { brandColors, brandTypography } from "@/theme/brand";

type AboutContent = typeof editablePages.about;

const valueIcons = {
  heart: FavoriteBorderRoundedIcon,
  person: PersonOutlineRoundedIcon,
  leaf: SpaOutlinedIcon,
  time: AccessTimeRoundedIcon
};

export function AboutPage({ content = editablePages.about }: { content?: AboutContent } = {}) {
  return (
    <Box component="article" sx={{ bgcolor: brandColors.canvas, overflow: "hidden", pb: { xs: 1, md: 2 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, lg: 7 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 0, md: 3.5, lg: 5.5 },
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            alignItems: "stretch"
          }}
        >
          <Box
            sx={{
              position: "relative",
              minWidth: 0,
              minHeight: { xs: 525, sm: 575, md: 640, lg: 650 },
              order: { xs: 2, md: 0 },
              ml: { xs: -2.5, sm: -4, lg: -7 },
              mr: { xs: -2.5, sm: -4, md: -3.5, lg: -5.5 }
            }}
          >
            <Box
              component="img"
              src={content.portrait.src}
              alt={content.portrait.alt}
              width={1536}
              height={1024}
              fetchPriority="high"
              sx={{
                position: "absolute",
                inset: 0,
                display: "block",
                width: "100%",
                height: { xs: 410, sm: 535, md: "100%" },
                objectFit: "cover",
                objectPosition: content.portrait.objectPosition,
                maskImage: "linear-gradient(to bottom, #000 76%, transparent 100%)"
              }}
            />
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `linear-gradient(90deg, ${brandColors.canvas} 0%, transparent 5%, transparent 65%, ${brandColors.canvas} 100%)`
              }}
            />
            <Box
              component="aside"
              sx={{
                position: "absolute",
                bottom: { xs: 8, sm: 18, md: "auto" },
                top: { md: 155, lg: 165 },
                left: { xs: 20, sm: 30, lg: 50 },
                bgcolor: "rgba(251, 247, 238, 0.92)",
                border: "1px solid rgba(214, 198, 174, 0.2)",
                borderRadius: "8px",
                boxShadow: "0 12px 35px rgba(85, 70, 45, 0.06)",
                m: 0,
                p: { xs: 2, md: 2.5 },
                width: { xs: 204, sm: 216, lg: 245 }
              }}
            >
              <FormatQuoteRoundedIcon aria-hidden="true" sx={{ color: brandColors.olive, fontSize: 35, transform: "rotate(180deg)" }} />
              <Typography sx={{ color: brandColors.olive, fontSize: { xs: "0.94rem", lg: "1.08rem" }, lineHeight: 1.7 }}>
                {content.quote}
              </Typography>
              <GoldRule />
            </Box>
          </Box>

          <Box sx={{ pt: { xs: 3.5, md: 5, lg: 6 }, pb: { xs: 3, md: 3.5 }, minWidth: 0 }}>
            <Typography component="h1" sx={{ color: brandColors.olive, fontFamily: brandTypography.heading, fontSize: { xs: "2.5rem", md: "3.2rem" }, fontWeight: 400, lineHeight: 1.1 }}>
              {content.title}
            </Typography>
            <Typography sx={{ color: brandColors.olive, fontSize: { xs: "0.8rem", lg: "0.9rem" }, fontWeight: 600, letterSpacing: ".075em", lineHeight: 1.6, mt: 1, textTransform: "uppercase" }}>
              {content.eyebrow}
            </Typography>
            <GoldRule />
            <Stack spacing={2} sx={{ mt: 2.5 }}>
              <Typography sx={{ lineHeight: 1.75 }}>{content.lead}</Typography>
              {content.paragraphs.map((paragraph, index) => (
                <Typography key={index} sx={{ lineHeight: 1.75 }}>{paragraph}</Typography>
              ))}
            </Stack>

            <Box component="ul" sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, minmax(0, 1fr))" }, listStyle: "none", gap: { xs: 2.5, sm: 0 }, m: 0, mt: { xs: 3.5, md: 4 }, p: 0 }}>
              {content.values.map((value, index) => {
                const Icon = valueIcons[value.icon as keyof typeof valueIcons] ?? SpaOutlinedIcon;
                return (
                  <Box component="li" key={value.title} sx={{ borderLeft: { xs: index % 2 ? `1px solid ${brandColors.taupe}` : 0, sm: index ? `1px solid ${brandColors.taupe}` : 0 }, px: { xs: 1.3, lg: 1.8 }, textAlign: "center" }}>
                    <Icon aria-hidden="true" sx={{ color: brandColors.olive, fontSize: { xs: 39, lg: 44 }, mb: 1 }} />
                    <Typography component="h2" sx={{ color: brandColors.olive, fontFamily: brandTypography.body, fontSize: { xs: "0.78rem", lg: "0.8rem" }, fontWeight: 600, lineHeight: 1.5, minHeight: { sm: "3em", lg: "auto" }, textTransform: "uppercase" }}>
                      {value.title}
                    </Typography>
                    <Typography sx={{ fontSize: "0.76rem", lineHeight: 1.6, mt: 0.75 }}>{value.text}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: { xs: 2, md: 3 }, gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))" }, mt: { xs: 0, md: -1.5 }, position: "relative" }}>
          {content.sections.map((section, index) => (
            <Box component="section" key={index} sx={{ bgcolor: brandColors.linen, borderRadius: "8px", overflow: "hidden", p: { xs: 2.75, lg: 3.75 }, position: "relative" }}>
              <YarrowIllustration animated={false} title="" sx={{ bottom: 8, height: 152, opacity: 0.27, position: "absolute", right: -16, width: 152 }} />
              <Box sx={{ position: "relative", pr: { xs: 0, lg: 8 } }}>
                <Typography component="h2" sx={sectionHeading}>{section.heading}</Typography>
                <GoldRule />
                <Typography sx={{ fontSize: "0.94rem", lineHeight: 1.7, mt: 1.4, whiteSpace: "pre-line" }}>{section.body}</Typography>
              </Box>
            </Box>
          ))}
          <Box component="section" sx={{ bgcolor: brandColors.linen, borderRadius: "8px", overflow: "hidden", p: { xs: 2.75, lg: 3.75 }, position: "relative" }}>
            <YarrowIllustration animated={false} title="" sx={{ bottom: 8, height: 152, opacity: 0.27, position: "absolute", right: -16, transform: "rotate(-15deg)", width: 152 }} />
            <Box sx={{ position: "relative" }}>
              <Typography component="h2" sx={sectionHeading}>{content.priorities.heading}</Typography>
              <GoldRule />
              <Stack component="ul" spacing={1.35} sx={{ listStyle: "none", m: 0, mt: 2, p: 0, pr: { xs: 0, lg: 5 } }}>
                {content.priorities.items.map((item) => (
                  <Stack component="li" direction="row" spacing={1.4} key={item} sx={{ alignItems: "flex-start" }}>
                    <CheckCircleOutlineRoundedIcon aria-hidden="true" sx={{ color: brandColors.olive, flex: "0 0 auto", fontSize: 20, mt: "2px !important" }} />
                    <Typography sx={{ fontSize: "0.94rem", lineHeight: 1.6 }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box component="section" sx={{ alignItems: "center", bgcolor: brandColors.mist, borderRadius: "8px", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1.5, md: 2.5 }, mt: 2, px: { xs: 2.75, lg: 4 }, py: 2 }}>
          <SpaOutlinedIcon aria-hidden="true" sx={{ color: brandColors.olive, display: { xs: "none", sm: "block" }, flex: "0 0 auto", fontSize: 34 }} />
          <Typography sx={{ color: brandColors.olive, flex: 1, fontFamily: brandTypography.heading, fontSize: { xs: "1.2rem", lg: "1.3rem" }, lineHeight: 1.5 }}>{content.cta.text}</Typography>
          <Button endIcon={<ArrowForwardRoundedIcon />} href={content.cta.href} sx={{ alignSelf: { xs: "flex-start", sm: "center" }, flex: "0 0 auto", minHeight: 44, whiteSpace: "nowrap" }}>
            {content.cta.label}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

const sectionHeading = {
  color: brandColors.olive,
  fontFamily: brandTypography.heading,
  fontSize: { xs: "1.55rem", lg: "1.7rem" },
  fontWeight: 400,
  lineHeight: 1.25
};

function GoldRule() {
  return <Box aria-hidden="true" sx={{ bgcolor: brandColors.gold, height: "1px", mt: 1.5, width: 46 }} />;
}
