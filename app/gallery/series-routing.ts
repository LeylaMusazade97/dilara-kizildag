import type { Language } from "../language";
import { seriesOrder, type AvailableSeries } from "./series-data";

export const defaultSeries: AvailableSeries = "hortlak";

export function resolveSeries(value: string | string[] | undefined): AvailableSeries | null {
  if (value === undefined) return defaultSeries;
  const key = Array.isArray(value) ? value[0] : value;
  return seriesOrder.includes(key as AvailableSeries) ? key as AvailableSeries : null;
}

export function galleryHref(key: AvailableSeries, language: Language): string {
  const query = new URLSearchParams();
  if (key !== defaultSeries) query.set("series", key);
  if (language === "en") query.set("lang", "en");
  return `/gallery${query.size ? `?${query}` : ""}`;
}
