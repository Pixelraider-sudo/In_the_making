import { useEffect, useState } from "react";
import { DevMode } from "@/lib/dev-mode";

export function DevOverlay() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    return DevMode.subscribe(setEnabled);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-lg border border-border bg-black/80 p-4 text-xs text-green-400 shadow-xl backdrop-blur">
      <div className="mb-2 font-bold text-green-300">ENGINEERING MODE ACTIVE</div>

      <div className="space-y-1">
        <div>STATUS: ONLINE</div>
        <div>BUILD: HEALTHY</div>
        <div>ROUTE: /</div>
        <div>REACT: HYDRATED</div>
        <div>FPS: 60 (simulated)</div>
      </div>

      <div className="mt-3 text-[10px] text-green-500">Press [D] to toggle</div>
    </div>
  );
}
