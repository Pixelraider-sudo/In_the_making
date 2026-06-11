import { useEffect, useRef } from "react";

/**
 * SAFE Aurora Background (scroll-proof version)
 * - No layout interference
 * - Keeps visuals identical
 * - Fully decoupled from document flow
 */
export function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const N = 45;

    const stars = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      vy: Math.random() * 0.15 + 0.03,
      a: Math.random() * 0.5 + 0.15,
      tw: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.y -= s.vy;
        s.tw += 0.015;

        if (s.y < -5) {
          s.y = h + 5;
          s.x = Math.random() * w;
        }

        const alpha = s.a * (0.55 + 0.35 * Math.sin(s.tw));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 170, 90, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* SAFE: visual-only layers (no overflow-hidden) */}

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />

      <div
        className="absolute -top-40 -left-40 h-[65vmax] w-[65vmax] rounded-full opacity-25 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.17 60 / 0.45), transparent 65%)",
        }}
      />

      <div
        className="absolute top-1/3 -right-40 h-[65vmax] w-[65vmax] rounded-full opacity-20 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.70 0.20 35 / 0.40), transparent 65%)",
          animationDelay: "-4s",
        }}
      />

      <div
        className="absolute bottom-0 left-1/3 h-[50vmax] w-[50vmax] rounded-full opacity-15 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.16 85 / 0.35), transparent 65%)",
          animationDelay: "-7s",
        }}
      />

      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
