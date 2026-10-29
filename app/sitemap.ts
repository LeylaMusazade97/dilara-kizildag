import type { MetadataRoute } from "next";
import { seoUrl, type SeoPath } from "./seo";
import { siteUrl } from "./seo";
import { seriesOrder } from "./gallery/series-data";
import { defaultSeries, galleryHref } from "./gallery/series-routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: SeoPath; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/gallery", priority: 0.9 },
    { path: "/about", priority: 0.8 },
  ];
  // Omit lastModified until an authoritative content-change date is available.
  const mainPages = pages.flatMap(({ path, priority }) =>
    (["tr", "en"] as const).map((language) => ({
      url: seoUrl(path, language),
      changeFrequency: "monthly" as const,
      priority,
    })),
  );
  const seriesPages = seriesOrder.filter((key) => key !== defaultSeries).flatMap((key) =>
    (["tr", "en"] as const).map((language) => ({
      url: new URL(galleryHref(key, language), siteUrl).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );
  return [...mainPages, ...seriesPages];
}
