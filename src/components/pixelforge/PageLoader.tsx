import { useEffect, useState } from "react";

/**
 * Premium portfolio boot sequence.
 *
 * Timing:
 * - Minimum display: 1800ms, so the brand animation has room to breathe.
 * - Readiness cap: 2200ms, so delayed fonts never hold visitors hostage.
 * - Fade: 280ms, overlapping the page reveal.
 *
 * Reduced-motion preferences are respected.
 * React StrictMode's development effect replay is supported.
 */

const READY_FLOOR_MS = 2800;
const READY_CAP_MS = 3200;
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
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined);
}

function usePrefersReducedMotion() {
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
    const bootWindow = window as Window & { __pfBooted?: boolean };

    if (bootWindow.__pfBooted) {
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

    const runBootSequence = async () => {
      const startedAt = performance.now();

      if (reducedMotion) {
        await runStages();

        if (cancelled) return;

        bootWindow.__pfBooted = true;
        onDone();
        setGone(true);
        return;
      }

      // Finish the visual sequence and wait for the minimum display time.
      // If fonts are unusually slow, the cap prevents an indefinite wait.
      await Promise.race([
        Promise.all([runStages(), wait(READY_FLOOR_MS)]),
        wait(READY_CAP_MS).then(() => {
          if (!cancelled) {
            setProgress(100);
            setStageIndex(STAGES.length - 1);
          }
        }),
      ]);

      if (cancelled) return;

      // Keep the minimum timing explicit even if readiness wins early.
      const elapsed = performance.now() - startedAt;
      if (elapsed < READY_FLOOR_MS) {
        await wait(READY_FLOOR_MS - elapsed);
      }

      if (cancelled) return;

      setProgress(100);
      setStageIndex(STAGES.length - 1);
      bootWindow.__pfBooted = true;
      onDone();
      setGone(true);
    };

    void runBootSequence();

    return () => {
      cancelled = true;
    };
    // onDone is intentionally excluded: this boot sequence should run once.
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
      {!reducedMotion && (
        <>
          <div
            aria-hidden="true"
            className="animate-pf-orb-a pointer-events-none absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.78 0.17 60 / 0.14), transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            aria-hidden="true"
            className="animate-pf-orb-b pointer-events-none absolute -right-1/4 -bottom-1/4 h-[55vmax] w-[55vmax] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.7 0.2 35 / 0.12), transparent 65%)",
              filter: "blur(40px)",
            }}
          />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
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
              className="h-full rounded-full transition-[width] duration-500 ease-out"
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

            <span className="font-mono text-caption tabular-nums text-primary">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
