export const siteConfig = {
  name: "Maria Alscher-Scheunemann",
  practitionerName: "Maria Alscher-Scheunemann",
  role: "Heilpraktikerin",
  city: "Hamburg",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alscher-scheunemann.de",
  description:
    "Akupunktur, klassische Naturheilkunde und ganzheitliche Frauenheilkunde mit ruhiger Anamnese und transparenter Begleitung.",
  branding: {
    domain: "www.alscher-scheunemann.de",
    quote: "Weil Gesundheit mehr ist als die Abwesenheit von Krankheit."
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
  services: [
    {
      title: "Akupunktur",
      slug: "akupunktur",
      summary:
        "Ruhige, individuell eingeordnete Akupunktur-Begleitung im Rahmen einer persönlichen Anamnese.",
      metaDescription:
        "Akupunktur bei Maria Alscher-Scheunemann: persönliche Anamnese, transparente Begleitung und ruhige Terminplanung."
    },
    {
      title: "Klassische Naturheilkunde",
      slug: "klassische-naturheilkunde",
      summary:
        "Naturheilkundliche Verfahren werden sorgfältig erklärt und passend zur individuellen Situation besprochen.",
      metaDescription:
        "Klassische Naturheilkunde in der Praxis Maria Alscher-Scheunemann: sorgfältig erklärt und individuell begleitet."
    },
    {
      title: "Ganzheitliche Frauenheilkunde",
      slug: "ganzheitliche-frauenheilkunde",
      summary:
        "Begleitung für frauenbezogene Gesundheitsthemen mit Zeit für Fragen, Kontext und alltagstaugliche nächste Schritte.",
      metaDescription:
        "Ganzheitliche Frauenheilkunde bei Maria Alscher-Scheunemann: ruhige Beratung, Anamnese und individuelle Begleitung."
    },
    {
      title: "Diagnostik, Behandlung und Beratung",
      slug: "diagnostik-behandlung-beratung",
      summary:
        "Strukturierte Einordnung, transparente Empfehlungen und Beratung mit klaren Grenzen der naturheilkundlichen Arbeit.",
      metaDescription:
        "Diagnostik, Behandlung und Beratung bei Maria Alscher-Scheunemann: strukturierte Einordnung und transparente nächste Schritte."
    }
  ],
  navigation: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Kontakt", href: "/kontakt" }
  ]
} as const;

export type ServiceSlug = (typeof siteConfig.services)[number]["slug"];
