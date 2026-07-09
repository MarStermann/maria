import type { Metadata, Viewport } from "next";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";

import { ScrollRestoration } from "@/components/scroll-restoration";
import { ThemeRegistry } from "@/components/theme-registry";
import { siteConfig } from "@/content/site";
import { brandColors, brandTypography } from "@/theme/brand";

import "./globals.css";

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: {
    index: allowIndexing,
    follow: allowIndexing
  }
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: brandColors.olive,
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <ScrollRestoration />
        <ThemeRegistry>
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
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                  alignItems: { xs: "flex-start", md: "center" },
                  justifyContent: "space-between",
                  minHeight: 82,
                  py: 1.5
                }}
              >
                <Link
                  color="inherit"
                  href="/"
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                    gap: 1.25,
                    textDecoration: "none"
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      alignItems: "center",
                      border: `1px solid ${brandColors.gold}`,
                      borderRadius: "50%",
                      color: "primary.main",
                      display: "inline-flex",
                      height: 42,
                      justifyContent: "center",
                      width: 42
                    }}
                  >
                    <SpaRoundedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        display: "block",
                        fontFamily: brandTypography.heading,
                        fontSize: { xs: "1.2rem", sm: "1.35rem" },
                        lineHeight: 1.05
                      }}
                    >
                      {siteConfig.name}
                    </Typography>
                    <Typography color="text.secondary" component="span" sx={{ fontSize: "0.78rem" }}>
                      Heilpraktikerin
                    </Typography>
                  </Box>
                </Link>
                <Stack
                  component="nav"
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 1.5 }}
                  sx={{
                    alignItems: { xs: "stretch", sm: "center" },
                    width: { xs: "100%", md: "auto" }
                  }}
                  aria-label="Hauptnavigation"
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
              </Stack>
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
                    Heilpraktikerin in {siteConfig.city}
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
      </body>
    </html>
  );
}
