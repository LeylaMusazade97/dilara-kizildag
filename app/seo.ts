import type { Metadata } from "next";
import type { Language } from "./language";
import { series, englishArtworkTitles, type AvailableSeries } from "./gallery/series-data";
import { defaultSeries, galleryHref } from "./gallery/series-routing";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dilarakizildag.com").replace(/\/$/, "");
export const siteHost = new URL(siteUrl).host;

const defaultOgImage = {
  url: "/art/responsive/dilara-portrait-1024.webp",
  width: 1024,
  height: 1516,
  alt: "Dilara Kızıldağ",
};
export type SeoPath = "/" | "/about" | "/gallery";

const copy = {
  "/": {
    tr: {
      title: "Dilara Kızıldağ | Ressam ve Görsel Sanatçı",
      description: "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği.",
    },
    en: {
      title: "Dilara Kızıldağ | Painter and Visual Artist",
      description: "Explore selected artworks, painting series, exhibitions, and the artistic practice of Istanbul-based painter and visual artist Dilara Kızıldağ.",
    },
  },
  "/about": {
    tr: {
      title: "Hakkında | Dilara Kızıldağ",
      description: "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın biyografisi, sanat pratiği, sergileri ve projeleri.",
    },
    en: {
      title: "About | Dilara Kızıldağ",
      description: "Discover the biography, artistic practice, exhibitions, and projects of Istanbul-based painter and visual artist Dilara Kızıldağ.",
    },
  },
  "/gallery": {
    tr: {
      title: "Galeri ve Seriler | Dilara Kızıldağ",
      description: "Dilara Kızıldağ’ın Hortlak Şefkat İster, Defterle Aramızda, Cam Altı ve Meyhane Serisi çalışmalarını keşfedin.",
    },
    en: {
      title: "Gallery and Series | Dilara Kızıldağ",
      description: "Explore Dilara Kızıldağ’s selected artworks and series, including Hortlak Şefkat İster, Defterle Aramızda, reverse-glass paintings, and Meyhane.",
    },
  },
} satisfies Record<SeoPath, Record<Language, { title: string; description: string }>>;

export function seoUrl(path: SeoPath, language: Language): string {
  const url = new URL(path, siteUrl);
  if (language === "en") url.searchParams.set("lang", "en");
  return url.href;
}

export function pageMetadata(path: SeoPath, language: Language): Metadata {
  const { title, description } = copy[path][language];
  const url = seoUrl(path, language);
  return {
    title: { absolute: title },
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: { tr: seoUrl(path, "tr"), en: seoUrl(path, "en"), "x-default": seoUrl(path, "tr") },
    },
    openGraph: {
      type: "website",
      locale: language === "en" ? "en_US" : "tr_TR",
      alternateLocale: language === "en" ? ["tr_TR"] : ["en_US"],
      url,
      siteName: "Dilara Kızıldağ",
      title,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

// SEO summaries are separate from the full, visible series descriptions.
const defterSeoDescription: Record<Language, string> = {
  tr: "Dilara Kızıldağ’ın 2017’den beri tuttuğu defterlerde her çizim bir yeniden karşılaşma; her sayfa, yolculuklarda toplanan anlara ve hikâyelere dönüş.",
  en: "In Dilara Kızıldağ’s notebooks, kept since 2017, each drawing is a renewed encounter with moments, places, and stories gathered along the way.",
};

// Keep the existing SEO summaries independent of the updated visible copy.
const meyhaneSeoDescription: Record<Language, string> = {
  "tr": "Bir meyhanede zaman başka türlü akar. Rakı yavaş yavaş içilir, meze acele edilmeden paylaşılır, muhabbet muhabbeti açtıkça konular ve bakışlar derinleşir.",
  "en": "Time moves differently in a meyhane. Rakı is sipped slowly, meze is passed around without haste, and as one conversation opens onto another, subjects deepen, perspectives shift, and time seems to loosen its grip."
};

export function galleryMetadata(key: AvailableSeries, language: Language): Metadata {
  // The default series shares the existing gallery canonical and metadata.
  if (key === defaultSeries) return pageMetadata("/gallery", language);
  const content = series[key];
  const label = language === "en" ? content.labelEn : content.label;
  const descriptions = language === "en" ? content.descriptionEn : content.description;
  const description = key === "defter" ? defterSeoDescription[language] : key === "meyhane" ? meyhaneSeoDescription[language] : descriptions?.[0] ?? `${label}: ${content.works.map((work) => language === "en" ? (englishArtworkTitles[work.title] ?? work.title) : work.title).join("; ")}.`;
  const url = (lang: Language) => new URL(galleryHref(key, lang), siteUrl).href;
  const title = `${label} | Dilara Kızıldağ`;
  const pageUrl = url(language);
  const artwork = content.works[0]?.src;
  const images = artwork
    ? [{ url: artwork.replace("/art/", "/art/responsive/").replace(/\.webp$/, "-1024.webp"), alt: label }]
    : [defaultOgImage];
  return {
    title: { absolute: title },
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: pageUrl, languages: { tr: url("tr"), en: url("en"), "x-default": url("tr") } },
    openGraph: {
      type: "website",
      locale: language === "en" ? "en_US" : "tr_TR",
      url: pageUrl,
      siteName: "Dilara Kızıldağ",
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: [images[0].url] },
  };
}
