"use client";

/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes, SyntheticEvent } from "react";
import { imageManifest } from "./image-manifest";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height" | "alt" | "draggable" | "onContextMenu" | "onDragStart"> & {
  src: string;
  alt: string;
  fullResolution?: boolean;
};

// Only context-menu and drag handlers use this; pointer/touch input stays native.
export function preventArtworkSave(event: SyntheticEvent<HTMLElement>) {
  event.preventDefault();
}

export default function ResponsiveArtwork({ src, alt, fullResolution = false, sizes, ...props }: Props) {
  const metadata = imageManifest[src];

  if (!metadata) return <img {...props} src={src} sizes={sizes} alt={alt} data-artwork-protected="true" draggable={false} onContextMenu={preventArtworkSave} onDragStart={preventArtworkSave} />;
  const fallback = metadata.variants.findLast((variant) => variant.width <= 1024) ?? metadata.variants[0];

  return (
    <img
      {...props}
      src={fullResolution ? src : fallback.src}
      srcSet={fullResolution ? undefined : metadata.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ")}
      sizes={fullResolution ? undefined : sizes}
      alt={alt}
      width={metadata.width}
      height={metadata.height}
      data-artwork-protected="true"
      draggable={false}
      onContextMenu={preventArtworkSave}
      onDragStart={preventArtworkSave}
    />
  );
}
