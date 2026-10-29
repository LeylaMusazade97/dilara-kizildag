import SeriesGallery from "./series-gallery";
import GalleryWall from "./gallery-wall";
import { LanguageSwitcher, languageFrom, localHref, type PageSearchParams } from "../language";
import { galleryMetadata } from "../seo";
import { notFound } from "next/navigation";
import { resolveSeries, galleryHref } from "./series-routing";

export async function generateMetadata({ searchParams }: { searchParams: PageSearchParams }) {
  const params = await searchParams;
  const selectedSeries = resolveSeries(params.series);
  if (selectedSeries === null) notFound();
  return galleryMetadata(selectedSeries, languageFrom(params.lang));
}

export default async function GalleryPage({searchParams}:{searchParams:PageSearchParams}) {
  const params=await searchParams; const language=languageFrom(params.lang); const en=language==="en";
  const selectedSeries = resolveSeries(params.series);
  if (selectedSeries === null) notFound();
  return (
    <main className="gallery-page" id="main-content" lang={language}>
      <section className="gallery-hero" aria-labelledby="gallery-title">
        <nav className="gallery-nav" aria-label="Ana navigasyon">
          <LanguageSwitcher language={language} path={galleryHref(selectedSeries, "tr")}/><a href={localHref("/",language)}>{en?"Home":"Ana Sayfa"}</a><a href={localHref("/gallery",language)} aria-current="page">{en?"Gallery":"Galeri"}</a><a href={localHref("/about",language)}>{en?"About":"Hakkında"}</a>
        <a href="https://asilyolculukgeridonmek.wordpress.com/" target="_blank" rel="noopener noreferrer">Blog</a></nav>

        <h1 className="sr-only" id="gallery-title">Galeri</h1>
        <GalleryWall language={language} />
      </section>

      <SeriesGallery key={`${selectedSeries}-${language}`} language={language} activeSeries={selectedSeries} />

      <footer>
        <p className="footer-call">{en?"For an exhibition, project, or collaborative idea, please get in touch.":"Bir sergi, proje ya da ortak üretim fikri için benimle iletişime geçin."}</p>
        <div className="footer-info">
          <a href="mailto:dilaraartspace@gmail.com">dilaraartspace@gmail.com</a>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=%C5%9Ei%C5%9Fli%2C%20%C4%B0stanbul" target="_blank" rel="noreferrer">{en?"Şişli, Istanbul":"Şişli, İstanbul"}</a>
          <a href="https://www.instagram.com/regresart/" target="_blank" rel="noreferrer">@regresart</a>
        </div>
        <div className="footer-base"><span>{en?"Dilara Kizildag":"Dilara Kızıldağ"}</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
