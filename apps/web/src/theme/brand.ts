export const brandColors = {
  canvas: "#fbf7ee",
  linen: "#f1eadf",
  cream: "#f7f1e6",
  mist: "#e8e5d8",
  taupe: "#d6c6ae",
  sage: "#7f8764",
  sageSoft: "#c8cdb8",
  olive: "#344a2f",
  oliveDark: "#263820",
  gold: "#b8871f",
  goldSoft: "#d9b86f",
  charcoal: "#2e352b",
  muted: "#6e7164",
  blush: "#efe2dc",
  white: "#fffdf8"
} as const;

export const brandTypography = {
  heading:
    'Georgia, "Times New Roman", "Cormorant Garamond", "Libre Baskerville", serif',
  body:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
} as const;

export const brandAsset = {
  fileName: "Brand Image Neu.png",
  publicPath: "/Brand Image Neu.png",
  emblemPath: "/brand-neu-emblem.png",
  heroBackgroundDesktopPath: "/brand-hero-background-desktop-v2.png",
  heroBackgroundMobilePath: "/brand-hero-background-mobile-v2.png",
  leftStillLifePath: "/brand-left-still-life.png",
  botanicalLeftPath: "/brand-neu-botanical-cutout.png",
  acupunctureEarPath: "/brand-generated-acupuncture-ear.png",
  complaintsBodyPath: "/vitruvian-woman-complaints.webp",
  complaintsXrayPaths: {
    kopf: "/xray/xray-kopf.webp",
    "seelisch-mental": "/xray/xray-seelisch-mental.webp",
    "haut-haare": "/xray/xray-haut-haare.webp",
    bewegungsapparat: "/xray/xray-bewegungsapparat.webp",
    "atemwege-immunsystem": "/xray/xray-atemwege-immunsystem.webp",
    "magen-darm": "/xray/xray-magen-darm.webp",
    "frauenheilkunde-unterbauch": "/xray/xray-frauenheilkunde-unterbauch.webp"
  },
  rightMotifPath: "/brand-neu-soft-motif.png"
} as const;
