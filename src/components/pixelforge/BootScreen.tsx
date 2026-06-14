import { useEffect, useRef, useState } from "react";
import { useOSStore, type OSState } from "../../os/store";

const BOOT_LINES: string[] = [
  "Booting PixelOS kernel v5.11...",
  "Loading memory modules.................. OK",
  "Mounting virtual filesystem............. OK",
  "Initializing GPU compositor............. OK",
  "Starting UI subsystem.................... OK",
  "Injecting dev tools...................... OK",
  "Loading window manager................... OK",
  "Checking security layers................ OK",
  "Starting desktop environment............ OK",
  "System ready.",
];

export function BootScreen() {
  // Typed selectors (no implicit any)
  const bootComplete = useOSStore((s: OSState) => s.bootComplete);

  const setTransitioning = useOSStore((s: OSState) => s.setTransitioning);

  const [lines, setLines] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const hasExited = useRef<boolean>(false);

  // =========================
  // BOOT SEQUENCE ENGINE
  // =========================
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (index < BOOT_LINES.length) {
      timer = setTimeout(() => {
        setLines((prev) => [...prev, BOOT_LINES[index]]);
        setIndex((prev) => prev + 1);
      }, 300);

      return () => clearTimeout(timer);
    }

    // =========================
    // EXIT SEQUENCE (RUN ONCE)
    // =========================
    if (index >= BOOT_LINES.length && !hasExited.current) {
      hasExited.current = true;
      setFinished(true);

      const runExit = async () => {
        setTransitioning(true);

        await new Promise<void>((resolve) => setTimeout(resolve, 800));

        bootComplete();

        await new Promise<void>((resolve) => setTimeout(resolve, 100));

        setTransitioning(false);
      };

      void runExit();
    }
  }, [index, bootComplete, setTransitioning]);

  // =========================
  // UI
  // =========================
  return (
    <div className="h-screen w-screen bg-black text-green-400 font-mono p-6">
      <div className="text-sm opacity-70 mb-4">PixelOS Boot Sequence</div>

      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div className="mt-4 animate-pulse">█</div>

      {finished && (
        <div className="mt-6 text-green-300 text-xs animate-pulse">▓▓ SYSTEM HANDOFF ▓▓</div>
      )}
    </div>
  );
}
