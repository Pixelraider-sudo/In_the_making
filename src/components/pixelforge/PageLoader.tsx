import { useEffect, useState } from "react";
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
      onDone();
      return;
    }
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
      className="fixed inset-0 z-999 flex flex-col items-center justify-center overflow-hidden bg-background transition-opacity"
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
          <div className="h-0.75 w-full overflow-hidden rounded-full bg-border">
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
      </div>
    </div>
  );
}
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
