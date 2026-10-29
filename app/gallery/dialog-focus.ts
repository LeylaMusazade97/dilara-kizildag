type DialogActions = { close: () => void; previous: () => void; next: () => void };

export function activateDialog(dialog: HTMLElement, opener: HTMLElement | null, actions: DialogActions) {
  const doc = dialog.ownerDocument;
  const body = doc.body;
  const view = doc.defaultView!;
  const oldOverflow = body.style.getPropertyValue("overflow");
  const oldPriority = body.style.getPropertyPriority("overflow");
  const previousInert = new Map<HTMLElement, boolean>();
  const inertBackground = () => {
    for (const child of Array.from(body.children)) {
      if (child instanceof view.HTMLElement && child !== dialog && !previousInert.has(child)) {
        previousInert.set(child, child.inert);
        child.inert = true;
      }
    }
  };
  body.style.setProperty("overflow", "hidden");
  const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]',
  )).filter((element) => element.tabIndex >= 0 && !element.closest('[inert], [hidden], [aria-hidden="true"]') && element.getClientRects().length > 0);
  const focusStart = () => (dialog.querySelector<HTMLElement>(".lightbox-close") ?? focusable()[0] ?? dialog).focus({ preventScroll: true });
  // Move focus before making the opener's page inert.
  focusStart();
  inertBackground();
  const observer = new view.MutationObserver(inertBackground);
  observer.observe(body, { childList: true });
  const onFocus = (event: FocusEvent) => {
    if (!dialog.contains(event.target as Node)) focusStart();
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") { event.preventDefault(); actions.close(); }
    if (event.key === "ArrowRight") { event.preventDefault(); actions.next(); }
    if (event.key === "ArrowLeft") { event.preventDefault(); actions.previous(); }
    if (event.key !== "Tab") return;
    const items = focusable();
    const index = items.indexOf(doc.activeElement as HTMLElement);
    if (items.length === 0) { event.preventDefault(); dialog.focus({ preventScroll: true }); return; }
    if (index === -1 || (!event.shiftKey && index === items.length - 1) || (event.shiftKey && index === 0)) {
      event.preventDefault();
      items[event.shiftKey ? items.length - 1 : 0].focus({ preventScroll: true });
    }
  };
  doc.addEventListener("focusin", onFocus);
  doc.addEventListener("keydown", onKey);
  return () => {
    observer.disconnect();
    doc.removeEventListener("focusin", onFocus);
    doc.removeEventListener("keydown", onKey);
    for (const [element, inert] of previousInert) element.inert = inert;
    if (oldOverflow) body.style.setProperty("overflow", oldOverflow, oldPriority);
    else body.style.removeProperty("overflow");
    if (opener?.isConnected && !opener.closest("[inert]")) opener.focus({ preventScroll: true });
  };
}
