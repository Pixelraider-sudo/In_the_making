import { createFileRoute } from "@tanstack/react-router";

import { BootScreen } from "../os/boot/BootScreen";
import { ModeSelect } from "../os/desktop/ModeSelect";
import { WebsiteApp } from "../app/WebsiteApp";
import { OSApp } from "../app/OSApp";
import { useOSStore } from "../os/store";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { mode, isBooting, transitioning } = useOSStore();

  if (isBooting || mode === "boot") {
    return (
      <div
        className={`h-screen w-screen transition-opacity duration-700 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <BootScreen />
      </div>
    );
  }

  if (mode === "select") {
    return (
      <div
        className={`h-screen w-screen transition-all duration-700 ease-in-out ${
          transitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <ModeSelect />
      </div>
    );
  }

  if (mode === "website") {
    return (
      <div className="h-screen w-screen animate-fade-in">
        <WebsiteApp />
      </div>
    );
  }

  if (mode === "os") {
    return (
      <div className="h-screen w-screen animate-fade-in">
        <OSApp />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-red-500 font-mono">
      SYSTEM ERROR: INVALID MODE → {String(mode)}
    </div>
  );
}
