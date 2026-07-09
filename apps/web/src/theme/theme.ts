import { createTheme } from "@mui/material/styles";

import { brandColors, brandTypography } from "@/theme/brand";

export const mariaTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: brandColors.olive,
      dark: brandColors.oliveDark,
      contrastText: brandColors.white
    },
    secondary: {
      main: brandColors.gold,
      contrastText: brandColors.oliveDark
    },
    text: {
      primary: brandColors.charcoal,
      secondary: brandColors.muted
    },
    background: {
      default: brandColors.canvas,
      paper: brandColors.white
    },
    divider: "rgba(52, 74, 47, 0.18)"
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: brandTypography.body,
    h1: {
      fontFamily: brandTypography.heading,
      fontSize: "clamp(2.65rem, 6vw, 4.7rem)",
      fontWeight: 500,
      lineHeight: 1.04,
      letterSpacing: 0
    },
    h2: {
      fontFamily: brandTypography.heading,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: 500,
      lineHeight: 1.12,
      letterSpacing: 0
    },
    h3: {
      fontFamily: brandTypography.heading,
      fontSize: "1.45rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: 0
    },
    h4: {
      fontFamily: brandTypography.heading,
      fontWeight: 600,
      letterSpacing: 0
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.72,
      letterSpacing: 0
    },
    body2: {
      lineHeight: 1.65,
      letterSpacing: 0
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "none"
    },
    overline: {
      color: brandColors.gold,
      fontWeight: 700,
      letterSpacing: "0.16em",
      lineHeight: 1.4,
      textTransform: "uppercase"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 44,
          paddingInline: 18
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          background: brandColors.canvas,
          scrollBehavior: "smooth"
        },
        body: {
          background:
            `radial-gradient(circle at 88% 8%, ${brandColors.mist} 0, transparent 26%), ${brandColors.canvas}`,
          color: brandColors.charcoal
        },
        a: {
          color: "inherit",
          textDecoration: "none"
        },
        "::selection": {
          background: brandColors.goldSoft,
          color: brandColors.oliveDark
        }
      }
    }
  }
});
