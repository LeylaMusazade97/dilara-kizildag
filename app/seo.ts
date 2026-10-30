import type { Metadata } from "next";
import type { Language } from "./language";
import { series, englishArtworkTitles, type AvailableSeries } from "./gallery/series-data";
import { defaultSeries, galleryHref } from "./gallery/series-routing";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://dilara-kizildag-portfolio.leilamusaz.chatgpt.site";
}

export const siteUrl = resolveSiteUrl();
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
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: seoUrl(path, language),
      languages: { tr: seoUrl(path, "tr"), en: seoUrl(path, "en") },
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
  return {
    title: { absolute: `${label} | Dilara Kızıldağ` },
    description,
    alternates: { canonical: url(language), languages: { tr: url("tr"), en: url("en") } },
  };
}
