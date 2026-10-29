"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ResponsiveArtwork, { preventArtworkSave } from "../ResponsiveArtwork";
import { imageManifest } from "../image-manifest";
import { revealDecodedImage } from "./image-readiness";

function loadedPreview(src: string, opener: HTMLElement | null) {
  const metadata = imageManifest[src];
  const candidates = new Set([src, ...(metadata?.variants.map(v => v.src) ?? [])]);
  if (typeof document !== "undefined") {
    const images = [
      ...(opener?.querySelectorAll("img") ?? []),
      ...document.querySelectorAll("img"),
    ];
    const loaded = images.find(image => !image.closest('[role="dialog"]') &&
      candidates.has(image.getAttribute("src") ?? "") && image.complete && image.naturalWidth > 0);
    if (loaded) return loaded.currentSrc || loaded.src;
  }
  return metadata?.variants[0]?.src ?? src;
}

// The parent keys this component by artwork, isolating pending loads on navigation.
export default function LightboxArtwork({ src, alt, opener }: {
  src: string;
  alt: string;
  opener: HTMLElement | null;
}) {
  const metadata = imageManifest[src];
  const [preview] = useState(() => loadedPreview(src, opener));
  const [sizes, setSizes] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const frame = useRef<HTMLSpanElement>(null);
  const cancelDecode = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const element = frame.current!;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      const ratio = metadata ? metadata.width / metadata.height : 1;
      const width = Math.min(rect.width, rect.height * ratio);
      if (width > 0) setSizes(`${Math.ceil(width)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [metadata]);

  useEffect(() => () => cancelDecode.current?.(), []);

  return (
    <span ref={frame} className="lightbox-image" data-ready={ready ? "true" : "false"}>
      <img
        className="lightbox-image-preview"
        src={preview}
        alt={alt}
        width={metadata?.width}
        height={metadata?.height}
        draggable={false}
        data-artwork-protected="true"
        onContextMenu={preventArtworkSave}
        onDragStart={preventArtworkSave}
      />
      {sizes && <ResponsiveArtwork
        className="lightbox-image-detail"
        src={src}
        sizes={sizes}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={event => {
          cancelDecode.current?.();
          setReady(false);
          cancelDecode.current = revealDecodedImage(event.currentTarget, () => setReady(true));
        }}
        onError={() => {
          cancelDecode.current?.();
          setReady(false);
        }}
      />}
    </span>
  );
}
