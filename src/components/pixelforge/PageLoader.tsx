import { useEffect, useState } from "react";

const BOOT_LINES = [
  "PIXELFORGE OS v2.0.0 — initializing...",
  "loading kernel modules...",
  "mounting /dev/kipkirui-john",
  "checking filesystem integrity... ok",
  "starting react runtime... done",
  "hydrating component tree...",
  "injecting design system tokens...",
  "spawning portfolio daemon...",
  "system ready. welcome.",
];

export function PageLoader({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const alreadyBooted = (window as Window & { __pfBooted?: boolean }).__pfBooted;
    if (alreadyBooted) {
      onDone();
      return;
    }

    const totalDuration = 5500;
    const interval = totalDuration / BOOT_LINES.length;

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));

        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setFading(true);
            setTimeout(() => {
              (window as Window & { __pfBooted?: boolean }).__pfBooted = true;
              onDone();
            }, 800);
          }, 900);
        }
      }, i * interval);
    });
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />

      <div className="relative z-10 w-full max-w-xl px-6">

        {/* ── NAME BLOCK ── */}
        <div className="mb-10 text-center select-none">

          {/* Decorative top line */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "oklch(0.82 0.16 200 / 0.4)",
              marginBottom: "0.75rem",
            }}
          >
            ── portfolio.v2 ──
          </div>

          {/* BUILDING — large, italic, glitch effect */}
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Glitch shadow layer */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: "3px",
                fontSize: "clamp(3rem, 12vw, 5.5rem)",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                color: "oklch(0.65 0.22 300 / 0.45)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              BUILDING
            </div>
            {/* Main text */}
            <div
              style={{
                fontSize: "clamp(3rem, 12vw, 5.5rem)",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                background: "linear-gradient(135deg, oklch(0.82 0.16 200), oklch(0.65 0.22 300))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                position: "relative",
              }}
            >
              BUILDING
            </div>
          </div>

          {/* BEYOND LIMITS — smaller, spaced, italic */}
          <div
            style={{
              fontSize: "clamp(1.4rem, 5.5vw, 2.6rem)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "0.35em",
              lineHeight: 1.2,
              marginTop: "-0.1em",
              background: "linear-gradient(135deg, oklch(0.82 0.16 200 / 0.8), oklch(0.65 0.22 300 / 0.8))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BEYOND LIMITS
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: "0.8rem",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "oklch(0.7 0.03 250 / 0.45)",
            }}
          >
            software engineer · nairobi, kenya
          </div>
        </div>

        {/* ── TERMINAL CARD ── */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">

          {/* Window chrome */}
          <div className="flex items-center gap-1.5 border-b border-border bg-background/50 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              pixelforge — boot sequence
            </span>
          </div>

          {/* Log lines */}
          <div className="px-4 py-4 min-h-[200px] space-y-2">
            {lines.map((line, i) => (
              <div key={i} className="flex items-start gap-2 font-mono text-xs">
                <span className="text-primary shrink-0 select-none">$</span>
                <span
                  className={
                    i === lines.length - 1 ? "text-primary" : "text-muted-foreground"
                  }
                >
                  {line}
                  {i === lines.length - 1 && (
                    <span className="caret text-primary ml-0.5">▍</span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                boot
              </span>
              <span className="text-[10px] font-mono text-primary">{progress}%</span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, oklch(0.82 0.16 200), oklch(0.65 0.22 300))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[10px] font-mono text-muted-foreground/35 select-none tracking-[0.5em] uppercase">
          build beyond limits
        </p>

      </div>
    </div>
  );
}