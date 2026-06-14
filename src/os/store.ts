import { create } from "zustand";

export type OSMode = "boot" | "select" | "website" | "os";

export interface WindowState {
  id: string;
  app: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
}

export interface OSState {
  mode: OSMode;
  isBooting: boolean;
  isHydrated: boolean;
  transitioning: boolean;

  activeApp: string | null;
  windows: WindowState[];

  setMode: (mode: OSMode) => void;
  bootComplete: () => void;
  reset: () => void;

  launchApp: (app: string) => void;
  closeApp: () => void;

  setTransitioning: (v: boolean) => void;

  openWindow: (win: WindowState) => void;
  closeWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  mode: "boot",
  isBooting: true,
  isHydrated: false,
  transitioning: false,

  activeApp: null,
  windows: [],

  setMode: (mode) => {
    set({
      mode,
      isBooting: mode === "boot",
    });
  },

  bootComplete: () => {
    set({
      mode: "select",
      isBooting: false,
      isHydrated: true,
    });
  },

  reset: () => {
    set({
      mode: "boot",
      isBooting: true,
      isHydrated: false,
      transitioning: false,
      activeApp: null,
      windows: [],
    });
  },

  launchApp: (app) => {
    set({ activeApp: app });
  },

  closeApp: () => {
    set({ activeApp: null });
  },

  setTransitioning: (v) => {
    set({ transitioning: v });
  },

  openWindow: (win) => {
    set((state) => ({
      windows: [...state.windows, win],
      activeApp: win.app,
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },
}));
