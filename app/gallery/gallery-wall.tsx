"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import ResponsiveArtwork, { preventArtworkSave } from "../ResponsiveArtwork";
import ArtworkDialog from "./ArtworkDialog";
import LightboxArtwork from "./LightboxArtwork";
import { createTouchPreview } from "./touch-preview";
import type { Language } from "../language";

type WallArtwork = {
  src: string;
  title: string;
  technique: string;
  series?: string;
  color: string;
  batch: 1 | 2 | 3;
  ratio: string;
  delay: string;
};

const artworks: WallArtwork[] = [
  {
    src: "/art/hortlak-hayat-agaci.webp",
    title: "Hayat Ağacı Plasenta",
    technique: "Karışık teknik",
    series: "Hortlak Şefkat İster",
    color: "#9c2e2c",
    batch: 1,
    ratio: ".893",
    delay: ".62s",
  },
  {
    src: "/art/hortlak-hayaletinin-tutundugu-yerde.webp",
    title: "Hayaletinin Tutunduğu Yerde",
    technique: "Karışık teknik",
    series: "Hortlak Şefkat İster",
    color: "#6690bb",
    batch: 2,
    ratio: ".86",
    delay: "1.64s",
  },
  {
    src: "/art/hortlak-sana-dokundugum-yer.webp",
    title: "Sana Dokunduğum Yer",
    technique: "Karışık teknik",
    series: "Hortlak Şefkat İster",
    color: "#505456",
    batch: 3,
    ratio: "1.003",
    delay: "2.68s",
  },
  {
    src: "/art/hortlak-yersiz.webp",
    title: "Yersiz",
    technique: "Karışık teknik",
    series: "Hortlak Şefkat İster",
    color: "#8db8e0",
    batch: 1,
    ratio: ".801",
    delay: ".76s",
  },
  {
    src: "/art/hortlak-kendimle-koynumda.webp",
    title: "Kendimle Koynumda",
    technique: "Karışık teknik",
    series: "Hortlak Şefkat İster",
    color: "#cfafa4",
    batch: 2,
    ratio: ".823",
    delay: "1.78s",
  },
  {
    src: "/art/hortlak-isimsiz.webp",
    title: "İsimsiz",
    technique: "Karışık teknik",
    series: "Hortlak Şefkat İster",
    color: "#649ea0",
    batch: 3,
    ratio: "1.027",
    delay: "2.82s",
  },
  {
    src: "/art/cam-alti-minno.webp",
    title: "Ejderha ve Simurg",
    technique: "Cam altı boyama tekniği",
    series: "Cam Altı",
    color: "#6f744f",
    batch: 1,
    ratio: "1.005",
    delay: ".9s",
  },
  {
    src: "/art/cam-alti-ejderha.webp",
    title: "Ejderha",
    technique: "Cam altı boyama tekniği",
    series: "Cam Altı",
    color: "#44382c",
    batch: 2,
    ratio: "1.857",
    delay: "1.92s",
  },
  {
    src: "/art/defter-asli-gibi.webp",
    title: "Aslı Gibi",
    technique: "Kağıt üzerine karışık teknik",
    series: "Defterle Aramızda",
    color: "#e45f4e",
    batch: 3,
    ratio: ".694",
    delay: "2.72s",
  },
  {
    src: "/art/defter-bazen-ben.webp",
    title: "Bazen Ben",
    technique: "Kağıt üzerine suluboya",
    series: "Defterle Aramızda",
    color: "#54615f",
    batch: 1,
    ratio: ".702",
    delay: ".7s",
  },
  {
    src: "/art/defter-duydun-mu.webp",
    title: "Duydun mu?",
    technique: "Kağıt üzerine suluboya ve artline kalem",
    series: "Defterle Aramızda",
    color: "#d7ae97",
    batch: 2,
    ratio: ".603",
    delay: "1.72s",
  },
  {
    src: "/art/defter-inan.webp",
    title: "İnan",
    technique: "Kağıt üzerine karışık teknik",
    series: "Defterle Aramızda",
    color: "#606968",
    batch: 3,
    ratio: ".699",
    delay: "2.76s",
  },
  {
    src: "/art/defter-orada-duruyor-sustugum.webp",
    title: "Orada Duruyor Sustuğum",
    technique: "Kağıt üzerine artline kalem ve mürekkep",
    series: "Defterle Aramızda",
    color: "#e54d61",
    batch: 1,
    ratio: ".707",
    delay: ".84s",
  },
  {
    src: "/art/defter-sesini-bul.webp",
    title: "Sesini Bul",
    technique: "Kağıt üzerine mürekkep ve artline kalem",
    series: "Defterle Aramızda",
    color: "#fd6b39",
    batch: 2,
    ratio: ".704",
    delay: "1.86s",
  },
  {
    src: "/art/gallery-meyhane-biz.webp",
    title: "Biz",
    technique: "Kağıt üzerine karışık teknik",
    series: "Meyhane",
    color: "#a9a697",
    batch: 3,
    ratio: ".608",
    delay: "2.9s",
  },
  {
    src: "/art/gallery-meyhane-derinde.webp",
    title: "Derinde, Uzakta, Burada",
    technique: "Kağıt üzerine suluboya",
    series: "Meyhane",
    color: "#e6a96f",
    batch: 1,
    ratio: ".702",
    delay: ".98s",
  },
  {
    src: "/art/gallery-meyhane-karsi-masa-a4.webp",
    title: "Karşı Masa",
    technique: "Kağıt üzerine suluboya",
    series: "Meyhane",
    color: "#e5a16e",
    batch: 2,
    ratio: ".705",
    delay: "1.98s",
  },
  {
    src: "/art/gallery-meyhane-kokusu-var.webp",
    title: "Kokusu Var",
    technique: "Kağıt üzerine suluboya ve artline kalem",
    series: "Meyhane",
    color: "#acd7cd",
    batch: 3,
    ratio: "1.418",
    delay: "2.98s",
  },
  {
    src: "/art/gallery-meyhane-otoportre.webp",
    title: "Meyhaneli Otoportre",
    technique: "Kağıt üzerine suluboya ve artline kalem",
    series: "Meyhane",
    color: "#a6a19a",
    batch: 1,
    ratio: ".71",
    delay: "1.06s",
  },
  {
    src: "/art/gallery-meyhane-sofra-a4.webp",
    title: "Sofra",
    technique: "Kağıt üzerine suluboya ve artline kalem",
    series: "Meyhane",
    color: "#a7a5a8",
    batch: 2,
    ratio: ".706",
    delay: "2.06s",
  },
];

type WallStyle = CSSProperties & {
  "--wall-ratio": string;
  "--wall-delay": string;
  "--wall-color": string;
  "--wall-hover-width": string;
  "--touch-origin-x"?: string;
  "--touch-origin-y"?: string;
  "--touch-origin-scale"?: string;
  "--touch-release-transform"?: string;
};

const getBalancedHoverWidth = (ratio: string) => {
  const widthFactor = Math.sqrt(Number(ratio));
  return `clamp(${(320 * widthFactor).toFixed(2)}px, min(${(31 * widthFactor).toFixed(3)}vw, ${(46 * widthFactor).toFixed(3)}vh), ${(440 * widthFactor).toFixed(2)}px)`;
};

const englishTitles: Record<string, string> = {
  "Hayat Ağacı Plasenta": "Tree of Life Placenta",
  "Hayaletinin Tutunduğu Yerde": "Where Your Ghost Holds On",
  "Sana Dokunduğum Yer": "Where I Touched You",
  Yersiz: "Out of Place",
  "Kendimle Koynumda": "In My Bosom with Myself",
  İsimsiz: "Untitled",
  "Ejderha ve Simurg": "Dragon and Simurgh",
  Ejderha: "Dragon",
  "Aslı Gibi": "As It Is",
  "Bazen Ben": "Sometimes Me",
  "Duydun mu?": "Did You Hear?",
  İnan: "Believe",
  "Orada Duruyor Sustuğum": "What I Silenced Stands There",
  "Sesini Bul": "Find Your Voice",
  Biz: "Us",
  "Derinde, Uzakta, Burada": "Deep, Far Away, Here",
  "Karşı Masa": "The Table Opposite",
  "Kokusu Var": "It Has a Scent",
  "Meyhaneli Otoportre": "Self-Portrait in a Meyhane",
  Sofra: "The Table",
};

const englishTechniques: Record<string, string> = {
  "Karışık teknik": "Mixed media",
  "Cam altı boyama tekniği": "Reverse glass painting",
  "Kağıt üzerine karışık teknik": "Mixed media on paper",
  "Kağıt üzerine suluboya": "Watercolour on paper",
  "Kağıt üzerine suluboya ve artline kalem":
    "Watercolour and fineliner on paper",
  "Kağıt üzerine artline kalem ve mürekkep": "Fineliner and ink on paper",
  "Kağıt üzerine mürekkep ve artline kalem": "Ink and fineliner on paper",
};

const englishSeries: Record<string, string> = {
  "Hortlak Şefkat İster": "The Ghost Needs Compassion",
  "Cam Altı": "Reverse Glass",
  "Defterle Aramızda": "Between the Notebook and Me",
  Meyhane: "“Meyhane” Series",
};

export default function GalleryWall({
  language = "tr",
}: {
  language?: Language;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [returningIndex, setReturningIndex] = useState<number | null>(null);
  const [touchOrigin, setTouchOrigin] = useState<{
    index: number;
    x: number;
    y: number;
    scale: number;
  } | null>(null);
  const touchButton = useRef<HTMLButtonElement | null>(null);
  const touchPreview = useRef<ReturnType<typeof createTouchPreview> | null>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [releaseTransform, setReleaseTransform] = useState<string | null>(null);

  useEffect(() => {
    const preview = createTouchPreview({
      show(index) {
        const button = touchButton.current;
        if (!button) return;
        if (returnTimer.current) clearTimeout(returnTimer.current);
        const rect = button.querySelector(".gallery-wall-frame")?.getBoundingClientRect() ?? button.getBoundingClientRect();
        setTouchOrigin({ index,
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
          scale: Math.min(rect.width / Math.max(window.innerWidth - 32, 1), 1),
        });
        setReleaseTransform(null);
        setReturningIndex(null);
        setPressedIndex(index);
      },
      hide(index) {
        const frame = touchButton.current?.querySelector(".gallery-wall-frame");
        setReleaseTransform(frame ? getComputedStyle(frame).transform : null);
        setPressedIndex(null);
        setReturningIndex(index);
        if (returnTimer.current) clearTimeout(returnTimer.current);
        returnTimer.current = setTimeout(() => {
          setReturningIndex(null); setTouchOrigin(null); setReleaseTransform(null);
        }, 370);
      },
    });
    touchPreview.current = preview;
    const move = (event: PointerEvent) => preview.move(event.pointerId, event.clientX, event.clientY);
    const end = (event: PointerEvent) => preview.end(event.pointerId);
    const cancel = () => preview.cancel();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", end, { passive: true });
    window.addEventListener("pointercancel", cancel, { passive: true });
    window.addEventListener("touchcancel", cancel, { passive: true });
    window.addEventListener("scroll", cancel, { passive: true, capture: true });
    window.addEventListener("blur", cancel);
    return () => {
      preview.dispose(); touchPreview.current = null;
      if (returnTimer.current) clearTimeout(returnTimer.current);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("touchcancel", cancel);
      window.removeEventListener("scroll", cancel, true);
      window.removeEventListener("blur", cancel);
    };
  }, []);

  const moveLightbox = (direction: -1 | 1) =>
    setSelectedIndex((index) =>
      index === null
        ? null
        : (index + direction + artworks.length) % artworks.length,
    );

  const startTouchPreview = (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
    if (event.pointerType !== "touch") { touchPreview.current?.resetClick(); return; }
    if (!event.isPrimary) { touchPreview.current?.cancel(); return; }
    touchButton.current = event.currentTarget;
    touchPreview.current?.start(event.pointerId, index, event.clientX, event.clientY);
  };

  return (
    <>
      <div
        className="gallery-wall"
        aria-label={
          language === "en"
            ? "Gallery wall of selected works"
            : "Seçili eserlerden galeri duvarı"
        }
      >
        {artworks.map((artwork, index) => {
          const title =
            language === "en"
              ? (englishTitles[artwork.title] ?? artwork.title)
              : artwork.title;
          const technique =
            language === "en"
              ? (englishTechniques[artwork.technique] ?? artwork.technique)
              : artwork.technique;
          const seriesName =
            artwork.series && language === "en"
              ? (englishSeries[artwork.series] ?? artwork.series)
              : artwork.series;
          const style: WallStyle = {
            "--wall-ratio": artwork.ratio,
            "--wall-delay": artwork.delay,
            "--wall-color": artwork.color,
            "--wall-hover-width": getBalancedHoverWidth(artwork.ratio),
          };
          if (touchOrigin?.index === index) {
            style["--touch-origin-x"] = `${touchOrigin.x}px`;
            style["--touch-origin-y"] = `${touchOrigin.y}px`;
            style["--touch-origin-scale"] = String(touchOrigin.scale);
            if (releaseTransform) style["--touch-release-transform"] = releaseTransform;
          }
          return (
            <button
              className={`gallery-wall-item gallery-wall-batch-${artwork.batch}${pressedIndex === index ? " is-touch-preview" : ""}${returningIndex === index ? " is-touch-returning" : ""}`}
              style={style}
              onPointerDown={(event) => startTouchPreview(event, index)}
              onClick={(event) => {
                if (touchPreview.current?.blocksClick(event.detail)) return;
                openerRef.current = event.currentTarget; setSelectedIndex(index);
              }}
              aria-label={
                language === "en"
                  ? `Enlarge ${title}`
                  : `${title} eserini büyüt`
              }
              key={`${artwork.src}-${index}`}
            >
              <span className="gallery-wall-frame">
                <span className="gallery-wall-image" onContextMenu={preventArtworkSave} onDragStart={preventArtworkSave}>
                  <ResponsiveArtwork
                    src={artwork.src}
                    sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 20vw"
                    alt={title}
                    loading={index < 5 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </span>
                <span className="gallery-wall-meta">
                  <strong>{title}</strong>
                  <span>{technique}</span>
                  {seriesName && <span>{seriesName}</span>}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <ArtworkDialog
          opener={openerRef.current}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
          className="artwork-lightbox gallery-wall-lightbox"
          label={
            language === "en"
              ? `${englishTitles[artworks[selectedIndex].title] ?? artworks[selectedIndex].title} artwork view`
              : `${artworks[selectedIndex].title} eser görünümü`
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
              key={artworks[selectedIndex].src}
              opener={openerRef.current}
              src={artworks[selectedIndex].src}
              alt={
                language === "en"
                  ? (englishTitles[artworks[selectedIndex].title] ??
                    artworks[selectedIndex].title)
                  : artworks[selectedIndex].title
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
                  ? (englishTitles[artworks[selectedIndex].title] ??
                    artworks[selectedIndex].title)
                  : artworks[selectedIndex].title}
                <small>
                  {language === "en"
                    ? (englishTechniques[artworks[selectedIndex].technique] ??
                      artworks[selectedIndex].technique)
                    : artworks[selectedIndex].technique}
                  {artworks[selectedIndex].series
                    ? ` · ${language === "en" ? (englishSeries[artworks[selectedIndex].series] ?? artworks[selectedIndex].series) : artworks[selectedIndex].series}`
                    : ""}
                </small>
              </p>
              <span>
                {selectedIndex + 1} / {artworks.length}
              </span>
            </div>
          </div>
        </ArtworkDialog>
      )}
    </>
  );
}
