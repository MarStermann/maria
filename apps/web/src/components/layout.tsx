import type { PropsWithChildren } from "react";
import { useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box, Button, Collapse, Container, IconButton, Link, Stack, Typography } from "@mui/material";

import { ScrollRestoration } from "@/components/scroll-restoration";
import { ThemeRegistry } from "@/components/theme-registry";
import { siteConfig } from "@/content/site";
import { brandAsset, brandColors, brandTypography } from "@/theme/brand";

export function Layout({ children }: PropsWithChildren) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavId = "mobile-site-navigation";

  return (
    <ThemeRegistry>
      <ScrollRestoration />
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(14px)",
          bgcolor: "rgba(251, 247, 238, 0.92)",
          borderBottom: `1px solid ${brandColors.taupe}`,
          position: "sticky",
          top: 0,
          zIndex: 1100
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={{ xs: 1.5, md: 2 }}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: { xs: 70, md: 82 },
              py: { xs: 1, md: 1.5 }
            }}
          >
            <Link
              color="inherit"
              href="/"
              sx={{
                alignItems: "center",
                flex: "1 1 auto",
                display: "inline-flex",
                gap: 1.25,
                minWidth: 0,
                textDecoration: "none"
              }}
            >
              <Box
                alt=""
                aria-hidden="true"
                component="img"
                src={brandAsset.emblemPath}
                sx={{
                  borderRadius: "50%",
                  flex: "0 0 auto",
                  height: { xs: 42, md: 46 },
                  objectFit: "cover",
                  width: 42
                }}
              />
              <Box>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    fontFamily: brandTypography.heading,
                    fontSize: { xs: "1.03rem", sm: "1.25rem", md: "1.35rem" },
                    lineHeight: 1.05,
                    overflowWrap: "anywhere"
                  }}
                >
                  {siteConfig.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  component="span"
                  sx={{ display: { xs: "none", sm: "block" }, fontSize: "0.78rem" }}
                >
                  {siteConfig.role}
                </Typography>
              </Box>
            </Link>
            <Stack
              aria-label="Hauptnavigation"
              component="nav"
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
                display: { xs: "none", lg: "flex" },
                flexShrink: 0,
                whiteSpace: "nowrap",
                width: "auto"
              }}
            >
              {siteConfig.navigation.map((item) => (
                <Button color="inherit" href={item.href} key={item.href}>
                  {item.label}
                </Button>
              ))}
              <Button
                href={siteConfig.contact.appointmentUrl}
                startIcon={<EventAvailableRoundedIcon />}
                variant="contained"
              >
                Termin anfragen
              </Button>
            </Stack>
            <Stack
              direction="row"
              spacing={0.75}
              sx={{
                alignItems: "center",
                display: { xs: "flex", lg: "none" },
                flex: "0 0 auto"
              }}
            >
              <Button
                href={siteConfig.contact.appointmentUrl}
                size="small"
                startIcon={<EventAvailableRoundedIcon />}
                sx={{ minHeight: 40, px: 1.35 }}
                variant="contained"
              >
                Termin
              </Button>
              <IconButton
                aria-controls={isMobileNavOpen ? mobileNavId : undefined}
                aria-expanded={isMobileNavOpen}
                aria-label={isMobileNavOpen ? "Navigation schließen" : "Navigation öffnen"}
                onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
                sx={{
                  border: `1px solid ${brandColors.taupe}`,
                  color: "primary.main",
                  height: 40,
                  width: 40
                }}
              >
                {isMobileNavOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
              </IconButton>
            </Stack>
          </Stack>
          <Collapse in={isMobileNavOpen} timeout="auto" unmountOnExit>
            <Stack
              aria-label="Hauptnavigation"
              component="nav"
              id={mobileNavId}
              spacing={0.75}
              sx={{
                borderTop: `1px solid ${brandColors.taupe}`,
                display: { xs: "flex", lg: "none" },
                pb: 1.5,
                pt: 1.25
              }}
            >
              {siteConfig.navigation.map((item) => (
                <Button
                  color="inherit"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  sx={{ justifyContent: "flex-start" }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Collapse>
        </Container>
      </Box>
      <Box component="main" id="main">
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.dark",
          color: "primary.contrastText",
          mt: 8,
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ justifyContent: "space-between" }}
          >
            <Box>
              <Typography component="strong" sx={{ fontFamily: brandTypography.heading }}>
                {siteConfig.name}
              </Typography>
              <Typography sx={{ color: "rgba(255, 253, 248, 0.74)", mt: 0.75 }}>
                {siteConfig.role} in {siteConfig.city}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Link color="inherit" href="/impressum">
                Impressum
              </Link>
              <Link color="inherit" href="/datenschutz">
                Datenschutz
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </ThemeRegistry>
  );
}
