import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { siteConfig } from "@/content/site";

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
  themeColor: "#315f4d",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main">
          Zum Inhalt springen
        </a>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              M
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <nav className="site-nav" aria-label="Hauptnavigation">
            {siteConfig.navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="nav-cta" href={siteConfig.contact.appointmentUrl}>
              Termin anfragen
            </Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <strong>{siteConfig.name}</strong>
              <p>Heilpraktikerin in {siteConfig.city}</p>
            </div>
            <div className="footer-links">
              <Link href="/impressum">Impressum</Link>
              <Link href="/datenschutz">Datenschutz</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
