import { useEffect, useState } from "react";
import { useOSStore } from "../store";

/** =========================
 * CLOCK
 * ========================= */
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const rotation = seconds * 6;

  return (
    <div
      className="
      relative
      w-28 h-28
      sm:w-32 sm:h-32
      md:w-36 md:h-36
      rounded-full
      border border-green-500/30
      bg-black/40
      shadow-[0_0_40px_rgba(0,255,100,0.12)]
      flex items-center justify-center
    "
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full animate-pulse bg-[radial-gradient(circle,rgba(0,255,100,0.08),transparent_70%)]" />

      {/* Center dot */}
      <div className="absolute w-3 h-3 bg-green-400 rounded-full z-20 shadow-[0_0_10px_rgba(0,255,100,0.8)]" />

      {/* Cross ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;

        return (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              transform: `rotate(${angle}deg) translateY(-52px)`,
            }}
          >
            <div className="relative w-[10px] h-[10px]">
              <div className="absolute left-1/2 top-0 w-[2px] h-[10px] -translate-x-1/2 bg-green-500/40" />
              <div className="absolute top-1/2 left-0 h-[2px] w-[10px] -translate-y-1/2 bg-green-500/40" />
            </div>
          </div>
        );
      })}

      {/* Rotating pulse ring */}
      <div
        className="absolute w-20 h-20 sm:w-24 sm:h-24 border border-green-400/20 rounded-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 1s linear",
        }}
      />
    </div>
  );
}

/** =========================
 * MODE CARD
 * ========================= */
function ModeCard({
  title,
  desc,
  onClick,
  accent,
}: {
  title: string;
  desc: string;
  onClick: () => void;
  accent: "green" | "white";
}) {
  return (
    <button
      onClick={onClick}
      className={`
      group
      relative
      w-full
      max-w-sm
      p-6
      border
      rounded-xl
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-[0_0_30px_rgba(0,255,100,0.2)]
      ${accent === "green" ? "border-green-500/50" : "border-white/20"}
    `}
    >
      <div className="text-left space-y-2">
        <h2 className="text-lg font-bold text-white group-hover:text-green-300 transition">
          {title}
        </h2>

        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all duration-300" />
    </button>
  );
}

/** =========================
 * MAIN MODE SELECT
 * ========================= */
export function ModeSelect() {
  const setMode = useOSStore((s) => s.setMode);

  return (
    <div className="min-h-screen w-full bg-black text-white font-mono relative overflow-x-hidden overflow-y-auto px-4 py-10 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.08),transparent_60%)]" />

      {/* Header */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full px-4 text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 tracking-wide">
          PixelOS Control Interface
        </h1>

        <p className="text-[10px] sm:text-xs text-gray-500">
          kernel: active · mode: selection · ui: hybrid
        </p>
      </div>

      <div className="z-10 w-full max-w-5xl text-center space-y-8 animate-fade-in mt-32">
        {/* Clock */}
        <div className="flex flex-col items-center">
          <Clock />

          <p className="mt-4 text-[10px] text-gray-500 tracking-widest">system.time.sync.active</p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed px-2">
          Choose your runtime environment. Website mode launches portfolio UI. Terminal mode opens
          experimental OS shell (coming soon).
        </p>

        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-2">
          <ModeCard
            title="Website Mode"
            desc="Modern developer portfolio UI with projects, skills and contact."
            accent="white"
            onClick={() => setMode("website")}
          />

          <ModeCard
            title="Terminal OS"
            desc="Cyber terminal environment (interactive shell system)."
            accent="green"
            onClick={() => setMode("os")}
          />
        </div>

        {/* Footer */}
        <p className="text-[10px] text-gray-600 pt-4 px-4 text-center leading-relaxed">
          PixelOS v1.0 · rendering engine stable · input: mouse
        </p>
      </div>
    </div>
  );
}
