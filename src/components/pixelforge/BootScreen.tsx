import { useEffect, useRef, useState } from "react";
import { useOSStore, type OSState } from "../../os/store";

/** =========================
 * SMALL BEEP ENGINE (NO ASSETS)
 * ========================= */
function playBeep(freq = 600, duration = 80) {
  try {
    const AudioCtxClass =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtxClass) return;

    const ctx = new AudioCtxClass();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = freq;

    gain.gain.value = 0.05;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, duration);
  } catch {
    // ignore blocked audio (autoplay policy / browser restrictions)
  }
}
/** =========================
 * BOOT LINES (BIOS STYLE)
 * ========================= */
const BOOT_LINES = [
  ">> BIOS v5.11 PixelOS initializing...",
  ">> CPU check ..................... OK",
  ">> Memory test .................... OK",
  ">> GPU handshake ................. OK",
  ">> Kernel modules loading ........ OK",
];

/** =========================
 * HARDWARE SCAN (NEW STAGE)
 * ========================= */
const HARDWARE_SCAN = [
  "Scanning CPU cores...............",
  "Detecting memory channels........",
  "Checking GPU pipelines...........",
  "Verifying system integrity.......",
  "All hardware components OK ✓",
];

/** =========================
 * GLITCH EFFECT TRIGGER
 * ========================= */
function glitchScreen() {
  const el = document.body;
  el.style.filter = "contrast(2) hue-rotate(90deg)";
  el.style.transform = "translateX(2px)";

  setTimeout(() => {
    el.style.filter = "";
    el.style.transform = "";
  }, 120);
}

export function BootScreen() {
  const bootComplete = useOSStore((s: OSState) => s.bootComplete);
  const setTransitioning = useOSStore((s: OSState) => s.setTransitioning);
  const setMode = useOSStore((s: OSState) => s.setMode);

  const [lines, setLines] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const [scanIndex, setScanIndex] = useState(0);
  const [scanLines, setScanLines] = useState<string[]>([]);

  const [stage, setStage] = useState<"boot" | "scan" | "loading" | "ready">("boot");

  const [progress, setProgress] = useState(0);

  const hasExited = useRef(false);

  /** =========================
   * BIOS TYPING BOOT STAGE
   * ========================= */
  useEffect(() => {
    if (stage !== "boot") return;

    if (index < BOOT_LINES.length) {
      const t = setTimeout(() => {
        setLines((p) => [...p, BOOT_LINES[index]]);
        playBeep(500 + index * 40, 60);
        setIndex((p) => p + 1);
      }, 180);

      return () => clearTimeout(t);
    }

    setStage("scan");
  }, [index, stage]);

  /** =========================
   * HARDWARE SCAN STAGE
   * ========================= */
  useEffect(() => {
    if (stage !== "scan") return;

    if (scanIndex < HARDWARE_SCAN.length) {
      const t = setTimeout(() => {
        setScanLines((p) => [...p, HARDWARE_SCAN[scanIndex]]);
        playBeep(300 + scanIndex * 50, 70);
        setScanIndex((p) => p + 1);
      }, 300);

      return () => clearTimeout(t);
    }

    setStage("loading");
  }, [scanIndex, stage]);

  /** =========================
   * LOADING STAGE
   * ========================= */
  useEffect(() => {
    if (stage !== "loading") return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStage("ready");
          playBeep(900, 120);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [stage]);

  /** =========================
   * READY → GLITCH → SWITCH
   * ========================= */
  useEffect(() => {
    if (stage !== "ready" || hasExited.current) return;

    hasExited.current = true;

    const run = async () => {
      setTransitioning(true);

      await new Promise((r) => setTimeout(r, 600));

      glitchScreen(); // 🔥 visual distortion

      await new Promise((r) => setTimeout(r, 400));

      bootComplete();
      setMode("select");

      await new Promise((r) => setTimeout(r, 300));

      setTransitioning(false);
    };

    run();
  }, [stage, bootComplete, setTransitioning, setMode]);

  /** =========================
   * UI
   * ========================= */
  return (
    <div className="h-screen w-screen bg-black text-green-400 font-mono p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.08),transparent_60%)]" />

      <div className="relative z-10 space-y-2">
        <div className="text-sm opacity-70 mb-4">PixelOS BIOS Boot Sequence</div>

        {/* BOOT LINES */}
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}

        {/* HARDWARE SCAN */}
        {scanLines.map((l, i) => (
          <div key={i} className="text-green-300">
            {l}
          </div>
        ))}

        {/* LOADING BAR */}
        {stage === "loading" && (
          <div className="mt-6 w-72 border border-green-500/30 p-1">
            <div
              className="h-2 bg-green-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div className="text-xs mt-2 opacity-70">system loading... {progress}%</div>
          </div>
        )}

        {/* READY */}
        {stage === "ready" && (
          <div className="mt-6 text-green-300 animate-pulse">SYSTEM READY ✓</div>
        )}

        <div className="mt-4 animate-pulse">█</div>
      </div>
    </div>
  );
}
