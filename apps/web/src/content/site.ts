import { editableServices } from "./editable";

import { publicEnv } from "@/lib/env";

export const siteConfig = {
  name: "Maria Alscher-Scheunemann",
  practitionerName: "Maria Alscher-Scheunemann",
  role: "Heilpraktikerin",
  city: "Hamburg",
  baseUrl: publicEnv.siteUrl,
  description:
    "Heilpraktikerin in Hamburg mit Schwerpunkten Akupunktur, Naturheilkunde, Frauenheilkunde, Diagnostik und Beratung.",
  branding: {
    domain: "www.alscher-scheunemann.de",
    quote: "Weil Gesundheit mehr ist als die Abwesenheit von Krankheit.",
    heroServiceRows: [
      ["Ganzheitliche Frauenheilkunde"],
      ["Naturheilkunde", "Regulationsmedizin"],
      ["Diagnostik", "Therapie", "Beratung"]
    ]
  },
  contact: {
    phone: "040 / 432 710 84",
    email: "info@alscher-scheunemann.de",
    appointmentUrl: "/kontakt"
  },
  openingHours: "Montag bis Freitag nach Vereinbarung",
  address: {
    street: "Seumestraße 20",
    postalCode: "22089",
    locality: "Hamburg",
    country: "DE"
  },
  services: editableServices,
  navigation: [
    { label: "Beschwerden", href: "/beschwerden" },
    { label: "Therapieverfahren", href: "/therapieverfahren" },
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" }
  ]
} as const;

export type ServiceSlug = (typeof siteConfig.services)[number]["slug"];
