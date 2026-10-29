export type Language = "tr" | "en";
export type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;
export function languageFrom(value: string | string[] | undefined): Language { return value === "en" || (Array.isArray(value) && value[0] === "en") ? "en" : "tr"; }
export function localHref(path: string, language: Language, extra?: Record<string, string>) {
  const [pathname, hash = ""] = path.split("#"); const [base, query = ""] = pathname.split("?"); const params = new URLSearchParams(query);
  if (language === "en") params.set("lang", "en"); else params.delete("lang");
  Object.entries(extra ?? {}).forEach(([key, value]) => params.set(key, value));
  return `${base}${params.toString() ? `?${params}` : ""}${hash ? `#${hash}` : ""}`;
}
export function LanguageSwitcher({ language, path, extra }: { language: Language; path: string; extra?: Record<string, string> }) {
  return <details className="language-switcher"><summary aria-label={language === "tr" ? "Seçili dil: Türkçe" : "Selected language: English"}>{language === "tr" ? "TR" : "EN"}<svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg></summary><div className="language-options"><a href={localHref(path, "tr", extra)} aria-current={language === "tr" ? "true" : undefined}>TR</a><a href={localHref(path, "en", extra)} aria-current={language === "en" ? "true" : undefined}>EN</a></div></details>;
}
