"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import type { Language } from "./language";
import { subscribeToReducedMotion, reducedMotionSnapshot } from "./motion-preference";

export default function MotionRegion({ children, kind, id }: {
  children: ReactNode;
  language: Language;
  kind: "rotation" | "carousel";
  id?: string;
}) {
  const reduced = useSyncExternalStore(subscribeToReducedMotion, reducedMotionSnapshot, () => false);
  const Tag = kind === "rotation" ? "figure" : "div";
  return (
    <Tag id={id} className={kind === "rotation" ? "practice-artwork motion-region" : "series-motion-region motion-region"} data-motion-paused={reduced}>
      {children}
    </Tag>
  );
}
