import { useEffect, useRef } from "react";

/**
 * Fixed full-screen animated background:
 * - Radial cyan/violet aurora blobs that drift
 * - A subtle particle field on canvas
 * - Sits behind everything (z=-10), purely decorative
 */
export function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const N = 60;
    const stars = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vy: Math.random() * 0.25 + 0.05,
      a: Math.random() * 0.6 + 0.2,
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
        const a = s.a * (0.6 + 0.4 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(125, 220, 255, ${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* aurora blobs */}
      <div
        className="absolute -top-40 -left-40 h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.82 0.16 200 / 0.55), transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.22 300 / 0.55), transparent 60%)",
          animationDelay: "-3s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[40vmax] w-[40vmax] rounded-full opacity-30 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.18 180 / 0.5), transparent 60%)",
          animationDelay: "-6s",
        }}
      />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
