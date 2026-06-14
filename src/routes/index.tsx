import React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { BootScreen } from "../os/boot/BootScreen";
import { ModeSelect } from "../os/desktop/ModeSelect";
import { WebsiteApp } from "../app/WebsiteApp";
import { OSApp } from "../app/OSApp";
import { useOSStore } from "../os/store";

/** =========================
 * SMART SCREEN WRAPPER
 * - Boot / Select / OS = locked viewport
 * - Website = scrollable
 * ========================= */
function Screen({
  children,
  className = "",
  scroll = false,
}: {
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
}) {
  return (
    <div
      className={`h-screen w-screen ${scroll ? "overflow-y-auto" : "overflow-hidden"} ${className}`}
    >
      {children}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { mode, isBooting, transitioning } = useOSStore();

  /** =========================
   * BOOT SCREEN
   * ========================= */
  if (isBooting || mode === "boot") {
    return (
      <Screen
        scroll={false}
        className={`transition-opacity duration-700 ${transitioning ? "opacity-0" : "opacity-100"}`}
      >
        <BootScreen />
      </Screen>
    );
  }

  /** =========================
   * MODE SELECT
   * ========================= */
  if (mode === "select") {
    return (
      <Screen
        scroll={false}
        className={`transition-all duration-700 ease-in-out ${
          transitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <ModeSelect />
      </Screen>
    );
  }

  /** =========================
   * WEBSITE MODE (FIXED SCROLL 🔥)
   * ========================= */
  if (mode === "website") {
    return (
      <Screen scroll={true} className="animate-fade-in">
        <WebsiteApp />
      </Screen>
    );
  }

  /** =========================
   * TERMINAL / OS MODE
   * ========================= */
  if (mode === "os") {
    return (
      <Screen scroll={false} className="animate-fade-in">
        <OSApp />
      </Screen>
    );
  }

  /** =========================
   * FALLBACK SAFETY STATE
   * ========================= */
  return (
    <Screen
      scroll={false}
      className="flex items-center justify-center bg-black text-red-500 font-mono"
    >
      SYSTEM ERROR: INVALID MODE → {String(mode)}
    </Screen>
  );
}
