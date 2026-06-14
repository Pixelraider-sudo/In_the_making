import { useEffect, useState } from "react";

const BOOT_LINES = [
  "[ OK ] Initializing PixelOS Kernel v1.0",
  "[ OK ] Detecting CPU architecture",
  "[ OK ] Allocating virtual memory",
  "[ OK ] Starting system services",
  "[ OK ] Mounting virtual filesystem",
  "[ OK ] Initializing React runtime",
  "[ OK ] Loading UI compositor",
  "[ OK ] Starting Window Manager",
  "[ OK ] Loading developer profile",
  "[ OK ] Checking application integrity",
  "[ OK ] Preparing desktop session",
  "",
  "PixelOS boot completed.",
];

interface BootLoaderProps {
  onComplete?: () => void;
}

export function BootLoader({ onComplete }: BootLoaderProps) {
  console.log("🚀 BootLoader RENDER");

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);

  /* ---------------------------
     BOOT SEQUENCE DEBUG FLOW
  --------------------------- */
  useEffect(() => {
    console.log("⚙️ BootLoader MOUNTED");

    let index = 0;

    const interval = window.setInterval(() => {
      console.log("🔁 Boot step:", index);

      if (index < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[index]]);
        index++;
      } else {
        console.log("🏁 BOOT SEQUENCE COMPLETE");

        window.clearInterval(interval);

        window.setTimeout(() => {
          console.log("👉 Calling onComplete()");
          onComplete?.();
        }, 800);
      }
    }, 220);

    return () => {
      console.log("🧹 BootLoader CLEANUP");
      window.clearInterval(interval);
    };
  }, [onComplete]);

  /* ---------------------------
     CURSOR BLINK DEBUG
  --------------------------- */
  useEffect(() => {
    const blink = window.setInterval(() => {
      setCursor((c) => !c);
    }, 500);

    return () => window.clearInterval(blink);
  }, []);

  /* ---------------------------
     UI
  --------------------------- */
  return (
    <div className="fixed inset-0 z-[99999] bg-black text-green-400 font-mono flex items-center justify-center">
      <div className="w-full max-w-5xl px-8">
        <div className="mb-6 text-3xl font-bold tracking-wider text-green-300">PixelOS</div>

        <div className="rounded-lg border border-green-900 bg-black/80 p-6 shadow-2xl">
          {visibleLines.map((line, i) => (
            <div key={i} className="leading-7">
              {line}
            </div>
          ))}

          <span className="inline-block mt-2">{cursor ? "█" : " "}</span>
        </div>

        <div className="mt-6 text-sm text-green-700">Boot sequence • Developer Edition</div>
      </div>
    </div>
  );
}
