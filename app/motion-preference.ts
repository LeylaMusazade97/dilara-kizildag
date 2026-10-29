const query = "(prefers-reduced-motion: reduce)";

export function subscribeToReducedMotion(callback: () => void, view = window) {
  const media = view.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function reducedMotionSnapshot(view = window) {
  return view.matchMedia(query).matches;
}
