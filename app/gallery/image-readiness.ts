type DecodableImage = {
  currentSrc: string;
  src: string;
  complete: boolean;
  naturalWidth: number;
  decode?: () => Promise<void>;
};

// A cancelled or superseded decode must never reveal a different artwork.
export function revealDecodedImage(image: DecodableImage, reveal: (src: string) => void) {
  const source = image.currentSrc || image.src;
  let cancelled = false;
  void (async () => {
    try {
      await image.decode?.();
      if (!cancelled && image.complete && image.naturalWidth > 0 &&
          (image.currentSrc || image.src) === source) reveal(source);
    } catch {
      // Keep the already-visible preview when loading or decoding fails.
    }
  })();
  return () => { cancelled = true; };
}
