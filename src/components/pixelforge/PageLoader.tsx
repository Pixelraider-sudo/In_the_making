import { useEffect, useState } from "react";

<<<<<<< HEAD
/**
 * Premium boot sequence.
 *
 * Design intent: feel like a confident, high-craft product launching,
 * not a terminal booting or a tech demo showing off. Real personal
 * branding (Kipkirui John — matches the Hero exactly), one elegant
 * logo draw-in, two soft ambient glow orbs (CSS-only, cheap), and a
 * thin gradient progress bar. No fake "loading kernel modules" theater.
 *
 * Timing (hard rules, not aspirations):
 *   - Real readiness (fonts + paint) is awaited, floored at 550ms so
 *     the logo animation isn't skipped on a fast/cached load, capped
 *     at 900ms so a slow font load can never hold the visitor hostage.
 *   - The reveal fade is ~280ms and *overlaps* the hero fading in
 *     underneath — onDone fires the moment the fade starts, not after
 *     it finishes, so the two animations run concurrently.
 *   - Worst case end-to-end: ~1.2s. Typical case: ~600-750ms.
 *
 * Safe under React StrictMode's dev-only double-invoked effects: each
 * invocation owns its own `cancelled` flag, so a phantom first run
 * (cancelled by StrictMode's simulated unmount) can never block the
 * real run from completing and calling onDone.
 */

const READY_FLOOR_MS = 2500;
const READY_CAP_MS = 3000;
const FADE_MS = 280;

const STAGES = [
  { label: "Initializing", pct: 20, run: () => nextFrame() },
  { label: "Preparing experience", pct: 75, run: () => fontsReady() },
  { label: "Ready", pct: 100, run: () => nextFrame() },
] as const;

function nextFrame(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fontsReady(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

function usePrefersReducedMotion() {
  // Read synchronously as the initial state value — this is a pure
  // client-rendered app (no SSR), so `window` is always available by
  // the time this runs, and reading it up front (rather than only
  // inside an effect) means the value is correct from the very first
  // render instead of racing the boot effect below.
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function PageLoader({ onDone }: { onDone: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // No "run once" ref guard — this effect is written to tolerate
    // React StrictMode's dev-only double-invocation cleanly. Each
    // invocation gets its own independent `cancelled` closure, so a
    // cancelled first run is harmless and the real run completes
    // normally and always calls onDone.
    const alreadyBooted = (window as Window & { __pfBooted?: boolean }).__pfBooted;
    if (alreadyBooted) {
      setGone(true);
=======
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
>>>>>>> def13e7176bd68c3746aaa908cd5ce3b9ca2dded
      onDone();
      return;
    }

<<<<<<< HEAD
    let cancelled = false;

    const runStages = async () => {
      for (let i = 0; i < STAGES.length; i++) {
        if (cancelled) return;
        setStageIndex(i);
        await STAGES[i].run();
        if (cancelled) return;
        setProgress(STAGES[i].pct);
      }
    };

    const readiness = reducedMotion
      ? runStages()
      : Promise.race([
          Promise.all([runStages(), wait(READY_FLOOR_MS)]),
          wait(READY_CAP_MS).then(() => setProgress(100)),
        ]);

    readiness.then(() => {
      if (cancelled) return;
      (window as Window & { __pfBooted?: boolean }).__pfBooted = true;
      onDone();
      setGone(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentLabel = STAGES[stageIndex].label;

  return (
    <div
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-background transition-opacity"
      style={{
        opacity: gone ? 0 : 1,
        pointerEvents: gone ? "none" : "auto",
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      {/* Ambient glow orbs — two soft, slow-drifting radial blobs.
          Pure CSS transform animation, no particle DOM nodes. */}
      {!reducedMotion && (
        <>
          <div
            aria-hidden="true"
            className="animate-pf-orb-a absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(0.78 0.17 60 / 0.14), transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            aria-hidden="true"
            className="animate-pf-orb-b absolute -bottom-1/4 -right-1/4 h-[55vmax] w-[55vmax] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(0.7 0.2 35 / 0.12), transparent 65%)",
              filter: "blur(40px)",
            }}
          />
        </>
      )}

      {/* Fine engineering grid, matching the rest of the site */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 text-center">
        <PixelForgeMark reducedMotion={reducedMotion} />

        <h1
          className={`mt-6 font-[Space_Grotesk] text-heading-md text-foreground ${
            reducedMotion ? "" : "animate-pf-rise-in"
          }`}
          style={{ animationDelay: reducedMotion ? undefined : "120ms" }}
        >
          Kipkirui <span className="text-gradient-forge">John</span>
        </h1>
        <p
          className={`mt-1.5 text-body-sm text-muted-foreground ${
            reducedMotion ? "" : "animate-pf-rise-in"
          }`}
          style={{ animationDelay: reducedMotion ? undefined : "200ms" }}
        >
          Software Engineer
        </p>

        <div className="mt-9 w-full">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-[width] duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "var(--gradient-forge)",
                boxShadow: progress > 0 ? "0 0 14px oklch(0.78 0.17 60 / 0.55)" : "none",
              }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span
              role="status"
              aria-live="polite"
              className="text-label uppercase text-muted-foreground"
            >
              {currentLabel}
            </span>
            <span className="font-mono text-caption text-primary tabular-nums">{progress}%</span>
          </div>
        </div>
=======
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
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
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
              background:
                "linear-gradient(135deg, oklch(0.82 0.16 200 / 0.8), oklch(0.65 0.22 300 / 0.8))",
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
            <span className="ml-3 text-3xs font-mono text-muted-foreground uppercase tracking-widest">
              pixelforge — boot sequence
            </span>
          </div>

          {/* Log lines */}
          <div className="px-4 py-4 min-h-[200px] space-y-2">
            {lines.map((line, i) => (
              <div key={i} className="flex items-start gap-2 font-mono text-xs">
                <span className="text-primary shrink-0 select-none">$</span>
                <span className={i === lines.length - 1 ? "text-primary" : "text-muted-foreground"}>
                  {line}
                  {i === lines.length - 1 && <span className="caret text-primary ml-0.5">▍</span>}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-3xs font-mono text-muted-foreground uppercase tracking-widest">
                boot
              </span>
              <span className="text-3xs font-mono text-primary">{progress}%</span>
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
        <p className="mt-5 text-center text-3xs font-mono text-muted-foreground/35 select-none tracking-[0.5em] uppercase">
          build beyond limits
        </p>
>>>>>>> def13e7176bd68c3746aaa908cd5ce3b9ca2dded
      </div>
    </div>
  );
}
<<<<<<< HEAD

/**
 * Abstract geometric mark: a hexagonal outline draws in (stroke
 * animation via pathLength normalization, so the dash math doesn't
 * depend on exact path geometry), then the inner spark fills in,
 * then a soft brand-colored glow pulse settles once the boot
 * sequence completes.
 */
function PixelForgeMark({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 72 72"
      fill="none"
      role="img"
      aria-label="Logo mark"
      className={reducedMotion ? "" : "animate-pf-glow-pulse"}
    >
      <path
        d="M36 4L64 20V52L36 68L8 52V20L36 4Z"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={reducedMotion ? undefined : 1}
        className={reducedMotion ? "" : "animate-pf-draw-outline"}
      />
      <path
        d="M38 18L26 38H34L32 54L48 32H39L41 18Z"
        fill="var(--primary)"
        className={reducedMotion ? "" : "animate-pf-mark-fill"}
        style={reducedMotion ? undefined : { animationDelay: "520ms", opacity: 0 }}
      />
    </svg>
  );
}
=======
>>>>>>> def13e7176bd68c3746aaa908cd5ce3b9ca2dded
