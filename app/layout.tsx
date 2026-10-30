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
  title: {
    default: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
    template: "%s | Dilara Kızıldağ",
  },
  description: "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Dilara Kızıldağ",
    title: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
    description: "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
  },
  twitter: {
    card: "summary",
    title: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
    description: "Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
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
              "@type": "Person",
              name: "Dilara Kızıldağ",
              url: siteUrl,
              jobTitle: "Ressam, görsel sanatçı ve sanat eğitimcisi",
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
            }),
          }}
        />
      </body>
    </html>
  );
}
