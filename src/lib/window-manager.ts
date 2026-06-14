export type WindowState = {
  id: string;
  title: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
};

let windows: WindowState[] = [];
let listeners: ((w: WindowState[]) => void)[] = [];

/**
 * 🔥 Always emit a fresh immutable snapshot
 */
function emit() {
  const snapshot = windows.map((w) => ({ ...w }));
  listeners.forEach((l) => l(snapshot));
}

/**
 * 🔥 CORE STORE
 */
export const WindowManager = {
  getAll() {
    return windows.map((w) => ({ ...w }));
  },

  create(id: string, title: string) {
    // prevent duplicates (important OS safety)
    const exists = windows.find((w) => w.id === id);
    if (exists) return;

    windows.push({
      id,
      title,
      x: 100,
      y: 100,
      z: windows.length + 1,
      minimized: false,
    });

    emit();
  },

  move(id: string, x: number, y: number) {
    const w = windows.find((w) => w.id === id);
    if (!w) return;

    w.x = x;
    w.y = y;

    emit();
  },

  focus(id: string) {
    const w = windows.find((w) => w.id === id);
    if (!w) return;

    const maxZ = windows.reduce((m, w) => Math.max(m, w.z), 0);
    w.z = maxZ + 1;

    emit();
  },

  toggleMinimize(id: string) {
    const w = windows.find((w) => w.id === id);
    if (!w) return;

    w.minimized = !w.minimized;

    emit();
  },

  /**
   * 🔥 CRITICAL FIX: immediate state sync on subscribe
   */
  subscribe(fn: (w: WindowState[]) => void) {
    listeners.push(fn);

    // immediate sync so React never sees empty initial state incorrectly
    fn(windows.map((w) => ({ ...w })));

    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },

  /**
   * optional dev helper (VERY useful for OS debugging)
   */
  reset() {
    windows = [];
    emit();
  },
};
