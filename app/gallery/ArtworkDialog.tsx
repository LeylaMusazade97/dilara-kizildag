"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { activateDialog } from "./dialog-focus";

export default function ArtworkDialog({ children, className, label, opener, onClose, onPrevious, onNext }: {
  children: ReactNode;
  className: string;
  label: string;
  opener: HTMLElement | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef(opener);
  const actions = useRef({ close: onClose, previous: onPrevious, next: onNext });
  actions.current = { close: onClose, previous: onPrevious, next: onNext };
  useEffect(() => {
    return activateDialog(dialogRef.current!, openerRef.current, {
      close: () => actions.current.close(),
      previous: () => actions.current.previous(),
      next: () => actions.current.next(),
    });
  }, []);
  return createPortal(
    <div ref={dialogRef} className={className} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
      {children}
    </div>, document.body,
  );
}
