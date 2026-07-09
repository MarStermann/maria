"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { brandColors } from "@/theme/brand";
import { mariaTheme } from "@/theme/theme";

export function ThemeRegistry({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppRouterCacheProvider options={{ key: "maria" }}>
      <ThemeProvider theme={mariaTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ".skip-link": {
              background: brandColors.oliveDark,
              color: brandColors.white,
              left: "1rem",
              padding: "0.75rem 1rem",
              position: "absolute",
              top: "-4rem",
              zIndex: 1600
            },
            ".skip-link:focus": {
              top: "1rem"
            }
          }}
        />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
