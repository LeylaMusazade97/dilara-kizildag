import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const focusSource = await readFile(new URL("../app/gallery/dialog-focus.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(focusSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { activateDialog } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

// A DOM fixture exercises the controller; these are not real-browser tests.
function fixture(initialOverflow = "auto") {
  const listeners = new Map();
  const doc = {
    activeElement: null,
    addEventListener(type, fn) { listeners.set(type, fn); },
    removeEventListener(type, fn) { if (listeners.get(type) === fn) listeners.delete(type); },
  };
  class Element {
    inert = false; tabIndex = 0; isConnected = true; parent = null; visible = true;
    ownerDocument = doc;
    constructor(name) { this.name = name; }
    closest() { return this.inert || this.parent?.inert ? this : null; }
    getClientRects() { return this.visible ? [{}] : []; }
    focus() { doc.activeElement = this; listeners.get("focusin")?.({ target: this }); }
  }
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; observer = this; }
    observe() { this.connected = true; }
    disconnect() { this.connected = false; }
  }
  let overflow = initialOverflow; let priority = "important";
  const style = {
    getPropertyValue() { return overflow; }, getPropertyPriority() { return priority; },
    setProperty(name, value, rank = "") { overflow = value; priority = rank; },
    removeProperty() { overflow = ""; priority = ""; },
  };
  const page = new Element("page"); const existingInert = new Element("already inert"); existingInert.inert = true;
  const opener = new Element("opener"); opener.parent = page;
  const dialog = new Element("dialog");
  const close = new Element("close"); const previous = new Element("previous"); const next = new Element("next");
  const backdrop = new Element("backdrop"); backdrop.tabIndex = -1;
  const hidden = new Element("hidden"); hidden.visible = false;
  const controls = [backdrop, close, previous, next, hidden];
  dialog.contains = (element) => element === dialog || controls.includes(element);
  dialog.querySelector = () => close;
  dialog.querySelectorAll = () => controls;
  doc.body = { children: [page, existingInert, dialog], style };
  doc.defaultView = { HTMLElement: Element, MutationObserver: Observer };
  opener.focus();
  let closed = 0, prev = 0, following = 0;
  const cleanup = activateDialog(dialog, opener, { close: () => closed++, previous: () => prev++, next: () => following++ });
  function key(value, shiftKey = false) {
    const event = { key: value, shiftKey, prevented: false, preventDefault() { this.prevented = true; } };
    listeners.get("keydown")?.(event);
    return event;
  }
  return { doc, page, existingInert, opener, dialog, close, next, previous, key, cleanup, listeners,
    observer: () => observer, Element, counts: () => [closed, prev, following], overflow: () => [overflow, priority] };
}

test("dialog opening focuses Close, makes background inert and preserves existing inert state", () => {
  const f = fixture();
  assert.equal(f.doc.activeElement, f.close);
  assert.equal(f.page.inert, true);
  assert.equal(f.existingInert.inert, true);
  assert.deepEqual(f.overflow(), ["hidden", ""]);
  const added = new f.Element("new background"); f.doc.body.children.push(added); f.observer().callback();
  assert.equal(added.inert, true);
  f.cleanup(); assert.equal(added.inert, false);
});

test("Tab and Shift+Tab wrap inside the dialog, excluding the backdrop and hidden controls", () => {
  const f = fixture();
  f.next.focus(); assert.equal(f.key("Tab").prevented, true); assert.equal(f.doc.activeElement, f.close);
  assert.equal(f.key("Tab", true).prevented, true); assert.equal(f.doc.activeElement, f.next);
  f.previous.focus(); assert.equal(f.key("Tab").prevented, false);
  f.opener.focus(); assert.equal(f.doc.activeElement, f.close);
  f.cleanup();
});

test("Escape and arrow navigation work; close/unmount restores focus, inert, scroll and listeners", () => {
  const f = fixture();
  f.key("Escape"); f.key("ArrowLeft"); f.key("ArrowRight");
  assert.deepEqual(f.counts(), [1, 1, 1]);
  f.cleanup();
  assert.equal(f.doc.activeElement, f.opener);
  assert.equal(f.page.inert, false);
  assert.equal(f.existingInert.inert, true);
  assert.deepEqual(f.overflow(), ["auto", "important"]);
  assert.equal(f.listeners.size, 0);
  assert.equal(f.observer().connected, false);
});

test("cleanup tolerates a removed opener and restores an originally absent scroll style", () => {
  const f = fixture(""); f.opener.isConnected = false;
  f.cleanup();
  assert.deepEqual(f.overflow(), ["", ""]);
  assert.equal(f.listeners.size, 0);
});

test("passive series text meets 4.5:1 with the smallest two-decimal opacity increment", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const opacity = Number(css.match(/\.gallery-series-nav a \{[\s\S]*?color: rgba\(255, 255, 255, ([\d.]+)\)/)[1]);
  const linear = (v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  const contrast = (alpha) => (linear((255 * alpha + 17 * (1 - alpha)) / 255) + 0.05) / (linear(17 / 255) + 0.05);
  assert.equal(opacity, 0.45); assert.ok(contrast(opacity) >= 4.5); assert.ok(contrast(0.44) < 4.5);
  console.log(`Passive series link contrast: ${contrast(opacity).toFixed(3)}:1 (was ${contrast(0.42).toFixed(3)}:1)`);
});

test("reduced-motion preference updates live and subscription is cleaned up", async () => {
  const source = await readFile(new URL("../app/motion-preference.ts", import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { subscribeToReducedMotion, reducedMotionSnapshot } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
  let listener; let notifications = 0;
  const media = { matches: false, addEventListener(type, fn) { assert.equal(type, "change"); listener = fn; }, removeEventListener(type, fn) { if (listener === fn) listener = null; } };
  const view = { matchMedia(query) { assert.equal(query, "(prefers-reduced-motion: reduce)"); return media; } };
  const unsubscribe = subscribeToReducedMotion(() => notifications++, view);
  assert.equal(reducedMotionSnapshot(view), false);
  media.matches = true; listener(); assert.equal(reducedMotionSnapshot(view), true);
  media.matches = false; listener(); assert.equal(reducedMotionSnapshot(view), false);
  assert.equal(notifications, 2);
  unsubscribe(); assert.equal(listener, null);
});
