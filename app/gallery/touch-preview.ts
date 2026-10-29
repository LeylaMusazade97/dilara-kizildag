// One gesture stays cancelled after movement/scroll; a new pointerdown resets it.
export function createTouchPreview({ show, hide, schedule = setTimeout, unschedule = clearTimeout }: {
  show: (index: number) => void;
  hide: (index: number) => void;
  schedule?: typeof setTimeout;
  unschedule?: typeof clearTimeout;
}) {
  let gesture: { id: number; index: number; x: number; y: number; cancelled: boolean; shown: boolean } | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let blocked = false;
  const clear = () => { if (timer !== null) unschedule(timer); timer = null; };
  const cancel = () => {
    if (!gesture) return;
    clear(); blocked = true; gesture.cancelled = true;
    if (gesture.shown) { gesture.shown = false; hide(gesture.index); }
  };
  return {
    start(id: number, index: number, x: number, y: number) {
      cancel(); clear(); blocked = false;
      gesture = { id, index, x, y, cancelled: false, shown: false };
      const current = gesture;
      timer = schedule(() => {
        timer = null;
        if (gesture !== current || current.cancelled) return;
        current.shown = true; blocked = true; show(current.index);
      }, 375);
    },
    move(id: number, x: number, y: number) {
      if (!gesture || gesture.id !== id || gesture.cancelled) return;
      if (Math.hypot(x - gesture.x, y - gesture.y) > 10) cancel();
    },
    end(id: number) {
      if (!gesture || gesture.id !== id) return;
      clear();
      if (gesture.shown) hide(gesture.index);
      gesture = null;
    },
    cancel,
    resetClick() { blocked = false; },
    blocksClick(detail: number) { return detail !== 0 && blocked; },
    dispose() { clear(); gesture = null; blocked = false; },
  };
}
