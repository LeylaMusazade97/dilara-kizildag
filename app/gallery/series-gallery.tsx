"use client";

import { useRef, useState, type CSSProperties } from "react";
import ResponsiveArtwork, { preventArtworkSave } from "../ResponsiveArtwork";
import ArtworkDialog from "./ArtworkDialog";
import LightboxArtwork from "./LightboxArtwork";
import type { Language } from "../language";
import { series, seriesOrder, englishArtworkTitles, knownTechniques, type AvailableSeries } from "./series-data";
import { galleryHref } from "./series-routing";

export default function SeriesGallery({
  language = "tr",
  activeSeries,
}: {
  language?: Language;
  activeSeries: AvailableSeries;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const active = series[activeSeries];
  const activeLabel = language === "en" ? active.labelEn : active.label;
  const activeDescription =
    language === "en" ? active.descriptionEn : active.description;

  const moveLightbox = (direction: -1 | 1) => {
    setSelectedIndex((index) =>
      index === null
        ? null
        : (index + direction + active.works.length) % active.works.length,
    );
  };

  return (
    <section
      className="gallery-series"
      id="seriler"
      aria-labelledby="gallery-series-title"
    >
      <header className="gallery-series-heading">
        <h2 id="gallery-series-title">
          {language === "en" ? "SERIES" : "SERİLER"}
        </h2>
        <p>{language === "en" ? "Selected works" : "Seçili çalışmalar"}</p>
      </header>

      <nav
        className="gallery-series-nav"
        aria-label={language === "en" ? "Choose a series" : "Seri seçimi"}
      >
        <ul>
          {seriesOrder.map((key) => (
            <li key={key}>
              <a
                className={activeSeries === key ? "is-active" : ""}
                href={`${galleryHref(key, language)}#seriler`}
                aria-current={activeSeries === key ? "page" : undefined}
              >
                {language === "en" ? series[key].labelEn : series[key].label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <h3 className="sr-only">{activeLabel}</h3>

      <div
        key={activeSeries}
        className={`series-grid series-grid--${activeSeries}`}
        aria-label={
          language === "en"
            ? `Works from ${activeLabel}`
            : `${activeLabel} serisi eserleri`
        }
      >
        {active.works.map((work, index) => {
          const workTitle =
            language === "en"
              ? (englishArtworkTitles[work.title] ?? work.title)
              : work.title;
          return (
            <figure
              className={`series-work series-work-${index + 1}${work.shape === "round" ? " series-work--round" : ""}`}
              key={work.src}
            >
              <button
                className="series-work-button"
                onClick={(event) => { openerRef.current = event.currentTarget; setSelectedIndex(index); }}
                aria-label={
                  language === "en"
                    ? `Enlarge ${workTitle}`
                    : `${workTitle} eserini büyüt`
                }
              >
                <span
                  className="series-work-stage"
                  onContextMenu={preventArtworkSave}
                  onDragStart={preventArtworkSave}
                  style={
                    work.background
                      ? ({
                          "--work-background": work.background,
                        } as CSSProperties)
                      : undefined
                  }
                >
                  <ResponsiveArtwork
                    loading="lazy"
                    decoding="async"
                    src={work.src}
                    sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 900px) 50vw, 50vw"
                    alt={workTitle}
                  />
                </span>
                <span className="series-work-caption">{workTitle}</span>
                {knownTechniques[work.src] && <span className="sr-only">{knownTechniques[work.src][language]}</span>}
              </button>
            </figure>
          );
        })}
      </div>

      {activeDescription && (
        <div className="gallery-series-description">
          {activeDescription.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {selectedIndex !== null && (
        <ArtworkDialog
          opener={openerRef.current}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
          className="artwork-lightbox"
          label={
            language === "en"
              ? `${englishArtworkTitles[active.works[selectedIndex].title] ?? active.works[selectedIndex].title} artwork view`
              : `${active.works[selectedIndex].title} eser görünümü`
          }
        >
          <button
            className="lightbox-backdrop"
            tabIndex={-1}
            onClick={() => setSelectedIndex(null)}
            aria-label={
              language === "en" ? "Close artwork view" : "Eser görünümünü kapat"
            }
          />
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              onClick={() => setSelectedIndex(null)}
              aria-label={language === "en" ? "Close" : "Kapat"}
            >
              ×
            </button>
            <button
              className="lightbox-arrow lightbox-arrow--previous"
              onClick={() => moveLightbox(-1)}
              aria-label={
                language === "en" ? "Previous artwork" : "Önceki eser"
              }
            >
              ←
            </button>
            <LightboxArtwork
              key={active.works[selectedIndex].src}
              opener={openerRef.current}
              src={active.works[selectedIndex].src}
              alt={
                language === "en"
                  ? (englishArtworkTitles[active.works[selectedIndex].title] ??
                    active.works[selectedIndex].title)
                  : active.works[selectedIndex].title
              }
            />
            <button
              className="lightbox-arrow lightbox-arrow--next"
              onClick={() => moveLightbox(1)}
              aria-label={language === "en" ? "Next artwork" : "Sonraki eser"}
            >
              →
            </button>
            <div className="lightbox-caption">
              <p>
                {language === "en"
                  ? (englishArtworkTitles[active.works[selectedIndex].title] ??
                    active.works[selectedIndex].title)
                  : active.works[selectedIndex].title}
              </p>
              <span>
                {selectedIndex + 1} / {active.works.length}
              </span>
            </div>
          </div>
        </ArtworkDialog>
      )}
    </section>
  );
}
