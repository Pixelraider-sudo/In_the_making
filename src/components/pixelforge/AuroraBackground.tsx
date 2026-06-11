import { useEffect, useRef } from "react";

/**
 * Premium animated background system:
 * - Amber/orange aurora blobs (theme-aware)
 * - Subtle floating particle field
 * - Fully non-interactive decorative layer
 */
export function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
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

    const N = 65;

    const stars = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vy: Math.random() * 0.25 + 0.05,
      a: Math.random() * 0.6 + 0.25,
      tw: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.y -= s.vy;
        s.tw += 0.02;

        if (s.y < -2) {
          s.y = h + 2;
          s.x = Math.random() * w;
        }

        const alpha = s.a * (0.6 + 0.4 * Math.sin(s.tw));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 190, 120, ${alpha})`; // amber/orange glow
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora Layer 1 */}
      <div
        className="absolute -top-40 -left-40 h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.17 60 / 0.55), transparent 60%)",
        }}
      />

      {/* Aurora Layer 2 */}
      <div
        className="absolute top-1/3 -right-40 h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.70 0.20 35 / 0.55), transparent 60%)",
          animationDelay: "-3s",
        }}
      />

      {/* Aurora Layer 3 */}
      <div
        className="absolute bottom-0 left-1/3 h-[45vmax] w-[45vmax] rounded-full opacity-30 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.16 85 / 0.50), transparent 60%)",
          animationDelay: "-6s",
        }}
      />

      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
