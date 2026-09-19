import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import type { siteConfig } from "@/content/site";
import { brandAsset } from "@/theme/brand";

export type TherapyCardService = (typeof siteConfig.services)[number];

type TherapyCardProps = {
  service: TherapyCardService;
  headingComponent?: "h2" | "h3";
  loading?: "eager" | "lazy";
};

export function TherapyCard({ service, headingComponent = "h2", loading = "lazy" }: TherapyCardProps) {
  return (
    <Card
      component="article"
      data-therapy-card={service.slug}
      sx={{
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: "0 16px 36px rgba(52, 74, 47, 0.09)",
        height: "100%",
        overflow: "hidden",
        transition: "box-shadow 320ms ease, border-color 320ms ease",
        "&:hover, &:focus-within": {
          borderColor: "primary.main",
          boxShadow: "0 24px 52px rgba(52, 74, 47, 0.16)"
        },
        "&:hover .therapy-card__image, &:focus-within .therapy-card__image": {
          transform: `scale(${(service.imageScale || 1) * 1.045})`
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "& .therapy-card__image": { transition: "none" },
          "&:hover .therapy-card__image, &:focus-within .therapy-card__image": { transform: `scale(${service.imageScale || 1})` }
        }
      }}
      variant="outlined"
    >
      <CardActionArea
        href={`/therapieverfahren/${service.slug}`}
        sx={{
          alignItems: "stretch",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          "&.Mui-focusVisible": { outline: "3px solid", outlineColor: "secondary.main", outlineOffset: -3 }
        }}
      >
        <Box sx={{ flexShrink: 0, height: { xs: 165, sm: 170 }, overflow: "hidden", position: "relative", width: "100%" }}>
          <Box
            alt={service.image ? service.imageAlt : ""}
            aria-hidden={service.image && service.imageAlt ? undefined : true}
            className="therapy-card__image"
            component="img"
            decoding="async"
            loading={loading}
            onError={(event) => {
              const image = event.currentTarget;
              if (image.dataset.fallbackApplied) return;
              image.dataset.fallbackApplied = "true";
              image.alt = "";
              image.setAttribute("aria-hidden", "true");
              image.src = brandAsset.leftStillLifePath;
            }}
            src={service.image || brandAsset.leftStillLifePath}
            sx={{
              display: "block",
              height: "100%",
              objectFit: "cover",
              objectPosition: service.imagePosition || "center",
              transform: `scale(${service.imageScale || 1})`,
              transformOrigin: "center bottom",
              transition: "transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)",
              width: "100%"
            }}
          />
          <Box
            aria-hidden="true"
            component="svg"
            preserveAspectRatio="none"
            viewBox="0 0 500 64"
            sx={{ bottom: -1, color: "background.paper", height: 44, left: 0, position: "absolute", width: "100%" }}
          >
            <path d="M0 30 C92 58 182 6 282 24 C374 41 423 45 500 14 L500 64 L0 64 Z" fill="currentColor" />
          </Box>
        </Box>
        <CardContent sx={{ display: "flex", flex: 1, flexDirection: "column", p: 3, pt: 1.75 }}>
          <Typography component={headingComponent} sx={{ overflowWrap: "anywhere", hyphens: "auto" }} variant="h3">
            {service.title}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1, lineHeight: 1.7, mt: 1.5 }}>
            {service.summary}
          </Typography>
          <Box
            sx={{
              alignItems: "center",
              borderTop: "1px solid",
              borderColor: "divider",
              color: "primary.main",
              display: "flex",
              fontSize: "0.92rem",
              fontWeight: 800,
              justifyContent: "space-between",
              letterSpacing: "0.02em",
              mt: 2.5,
              pt: 1.75
            }}
          >
            <Typography component="span" sx={{ fontWeight: "inherit" }}>Mehr erfahren</Typography>
            <ArrowForwardRoundedIcon fontSize="small" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
