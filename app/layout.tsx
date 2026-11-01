import type { Metadata } from "next";
import { headers } from "next/headers";
import { languageFrom } from "./language";
import { siteUrl } from "./seo";
import "./globals.css";
import "./typography.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "x17ismULxBpbmXYdYD9Cc7X_GKftmiUAHVcJSymy4pA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  title: {
    default: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
    template: "%s | Dilara Kızıldağ",
  },
  description: "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
  alternates: {
    canonical: "/",
    languages: {
      tr: "/",
      en: "/?lang=en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Dilara Kızıldağ",
    title: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
    description: "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
    images: [
      {
        url: "/art/responsive/dilara-portrait-1024.webp",
        width: 1024,
        height: 1516,
        alt: "Dilara Kızıldağ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
    description: "Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
    images: ["/art/responsive/dilara-portrait-1024.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = languageFrom((await headers()).get("x-portfolio-language") ?? undefined);
  return (
    <html lang={language}>
      <body className="antialiased">
        <a className="skip-link" href="#main-content">İçeriğe geç</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: "Dilara Kızıldağ",
                  url: siteUrl,
                  inLanguage: ["tr", "en"],
                  publisher: { "@id": `${siteUrl}/#person` },
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Dilara Kızıldağ",
                  url: siteUrl,
                  jobTitle: "Ressam, görsel sanatçı ve sanat eğitimcisi",
                  image: `${siteUrl}/art/responsive/dilara-portrait-1024.webp`,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "İstanbul",
                    addressCountry: "TR",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Marmara Üniversitesi",
                  },
                  sameAs: ["https://www.instagram.com/regresart/"],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
