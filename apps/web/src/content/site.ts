export const siteConfig = {
  name: "Naturheilpraxis Maria",
  practitionerName: "Maria [Nachname]",
  city: "[Ort]",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  description:
    "Ruhige, persoenliche Naturheilpraxis fuer individuelle Anamnese, transparente Begleitung und achtsame Therapieplanung.",
  contact: {
    phone: "[Telefon]",
    email: "kontakt@example.com",
    appointmentUrl: "/kontakt"
  },
  address: {
    street: "",
    postalCode: "",
    locality: "[Ort]",
    country: "DE"
  },
  services: [
    {
      title: "Erstanamnese",
      slug: "erstanamnese",
      summary:
        "Ausfuehrliches Erstgespraech mit Raum fuer Vorgeschichte, aktuelle Fragen und die gemeinsame Planung der naechsten Schritte.",
      metaDescription:
        "Erstanamnese in der Naturheilpraxis Maria: ruhiges Erstgespraech, individuelle Einordnung und transparente naechste Schritte."
    },
    {
      title: "Naturheilkundliche Begleitung",
      slug: "naturheilkundliche-begleitung",
      summary:
        "Individuelle Begleitung mit sorgfaeltiger Auswahl naturheilkundlicher Verfahren nach persoenlicher Situation und Zielsetzung.",
      metaDescription:
        "Naturheilkundliche Begleitung in [Ort]: individuell geplant, transparent erklaert und fachlich sorgfaeltig begleitet."
    },
    {
      title: "Praevention und Alltag",
      slug: "praevention-alltag",
      summary:
        "Praktische Impulse fuer Routinen, Ressourcen und alltagstaugliche Gesundheitsentscheidungen im persoenlichen Rahmen.",
      metaDescription:
        "Praevention und Alltag in der Naturheilpraxis Maria: klare Impulse fuer nachhaltige Routinen und persoenliche Ressourcen."
    }
  ],
  navigation: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Ueber mich", href: "/ueber-mich" },
    { label: "Kontakt", href: "/kontakt" }
  ]
} as const;

export type ServiceSlug = (typeof siteConfig.services)[number]["slug"];
