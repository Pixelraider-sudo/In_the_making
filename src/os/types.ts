// Core OS types for PixelOS

export type AppId = "terminal" | "browser" | "portfolio" | "settings" | "explorer";

export type OSMode = "boot" | "selector" | "desktop" | "website" | "os";

export interface OSWindow {
  id: string;
  app: AppId;
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
  windows: OSWindow[];
  activeWindowId: string | null;
  bootComplete: boolean;
}
