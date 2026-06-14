import { useEffect, useState } from "react";
import { useOSStore } from "../store";

/** =========================
 * CLOCK (POLISHED HYBRID VERSION)
 * ========================= */
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="relative w-36 h-36 rounded-full border border-green-500/30 bg-black/40 shadow-[0_0_40px_rgba(0,255,100,0.12)] flex items-center justify-center">
      {/* outer glow ring */}
      <div className="absolute inset-0 rounded-full animate-pulse bg-[radial-gradient(circle,rgba(0,255,100,0.08),transparent_70%)]" />

      {/* clock center */}
      <div className="absolute w-3 h-3 bg-green-400 rounded-full z-20 shadow-[0_0_10px_rgba(0,255,100,0.8)]" />

      {/* ticks */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[1px] bg-green-500/30 origin-bottom"
          style={{
            height: i % 5 === 0 ? "12px" : "6px",
            transform: `rotate(${i * 6}deg) translateY(-65px)`,
          }}
        />
      ))}

      {/* numbers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i + 1) * 30;
        return (
          <div
            key={i}
            className="absolute text-[11px] text-green-300 font-mono"
            style={{
              transform: `rotate(${angle}deg) translateY(-50px) rotate(-${angle}deg)`,
            }}
          >
            {i + 1}
          </div>
        );
      })}

      {/* hour hand */}
      <div
        className="absolute w-1.5 h-7 bg-green-400 rounded origin-bottom shadow-[0_0_12px_rgba(0,255,100,0.6)]"
        style={{ transform: `rotate(${hourDeg}deg) translateY(-7px)` }}
      />

      {/* minute hand */}
      <div
        className="absolute w-[2px] h-10 bg-white rounded origin-bottom shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        style={{ transform: `rotate(${minDeg}deg) translateY(-10px)` }}
      />

      {/* second hand */}
      <div
        className="absolute w-[1px] h-12 bg-red-500 origin-bottom shadow-[0_0_12px_rgba(255,0,0,0.6)]"
        style={{ transform: `rotate(${secDeg}deg) translateY(-12px)` }}
      />
    </div>
  );
}

/** =========================
 * MODE CARD COMPONENT
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
      className={`group relative w-64 p-6 border rounded-xl transition-all duration-300 
      hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,100,0.2)] 
      ${accent === "green" ? "border-green-500/50" : "border-white/20"}`}
    >
      <div className="text-left space-y-2">
        <h2 className="text-lg font-bold text-white group-hover:text-green-300 transition">
          {title}
        </h2>
        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      </div>

      {/* glow line */}
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
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white font-mono relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.08),transparent_60%)]" />

      {/* HEADER */}
      <div className="absolute top-10 text-center space-y-1">
        <h1 className="text-3xl font-bold text-green-400 tracking-widest">
          PixelOS Control Interface
        </h1>
        <p className="text-xs text-gray-500">kernel: active · mode: selection · ui: hybrid</p>
      </div>

      <div className="z-10 text-center space-y-10 animate-fade-in">
        {/* CLOCK */}
        <div className="flex flex-col items-center space-y-3">
          <Clock />
          <br />
          <br />
          <p className="text-[10px] text-gray-500 tracking-widest">system.time.sync.active</p>
        </div>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
          Choose your runtime environment. Website mode launches portfolio UI. Terminal mode opens
          experimental OS shell (coming soon).
        </p>

        {/* MODE CARDS */}
        <div className="flex gap-8 justify-center pt-4">
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

        {/* FOOTER */}
        <p className="text-[10px] text-gray-600 pt-6">
          PixelOS v1.0 · rendering engine stable · input: mouse
        </p>
      </div>
    </div>
  );
}
