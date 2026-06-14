import {
  Github,
  Linkedin,
  ExternalLink,
  Terminal as TerminalIcon,
  Download,
  Mail,
  MessageCircle,
  Send,
  ChevronDown,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const ROLES = [
  "software engineer",
  "full-stack builder",
  "React + TypeScript dev",
  "systems thinker",
  "lifelong learner",
];

function useTypedRole() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 45 : 75;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1200);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => (p + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return text;
}

/** Lightweight floating particle field — no extra deps, respects reduced motion. */
function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const N = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 28000));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * 0.5 + 0.2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 190, 120, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full pointer-events-none opacity-70"
    />
  );
}

export function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const role = useTypedRole();

  // Replace these with your real contact details
  const EMAIL = "kipkiruijohn3@gmail.com";
  const PHONE_INTL = "254714264297"; // E.164 without '+'

  const links = useMemo(
    () => ({
      email: `mailto:${EMAIL}`,
      whatsapp: `https://wa.me/${PHONE_INTL}`,
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    }),
    [],
  );

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border"
      style={{ background: "var(--gradient-glow)" }}
    >
      {/* Layered atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
      <Particles />

      {/* Drifting orbs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40 animate-float-y"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.17 60 / 0.45), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl opacity-30 animate-float-y"
        style={{
          background: "radial-gradient(circle, oklch(0.70 0.20 35 / 0.35), transparent 70%)",
          animationDelay: "1.2s",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          {/* PROFILE */}
          <div className="shrink-0 mx-auto md:mx-0 animate-fade-in">
            <div className="relative h-40 w-40 md:h-48 md:w-48 group">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-50 animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.17 60 / 0.45), transparent 70%)",
                }}
              />
              <div
                className="absolute -inset-1 rounded-full opacity-60 animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, oklch(0.78 0.17 60), oklch(0.70 0.20 35), oklch(0.85 0.16 85), oklch(0.78 0.17 60))",
                }}
              />
              <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_35px_rgba(255,170,80,0.18)]" />
              <div className="relative h-full w-full rounded-full overflow-hidden bg-card border-2 border-background transition-transform duration-500 group-hover:scale-[1.03]">
                <img
                  src="/profile.jpeg"
                  alt="Kipkirui John"
                  className="h-full w-full object-cover scale-[1.02]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              system.online · identity.active
            </div>

            <h1 className="font-[Space_Grotesk] text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight animate-fade-in">
              Hi, I'm <span className="text-gradient-forge">Kipkirui John</span>
              <br />a <span className="text-gradient-forge">software engineer</span> in the making.
            </h1>

            <div className="mt-4 font-mono text-sm md:text-base text-muted-foreground">
              &gt; role := <span className="text-primary font-semibold">{role}</span>
              <span className="caret text-primary">▍</span>
            </div>

            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in">
              Software engineering student building toward full-stack mastery. I design systems —
              not just interfaces.
            </p>

            {/* Primary CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-3 animate-fade-in">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
              >
                View Projects{" "}
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" /> Contact Me
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                <TerminalIcon className="h-4 w-4" /> _terminal
                <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Social / quick contact row */}
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
              {[
                { href: links.github, label: "GitHub", Icon: Github },
                { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: links.email, label: "Email", Icon: Mail },
                { href: links.whatsapp, label: "WhatsApp", Icon: MessageCircle },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Stat strip */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl border border-border bg-border overflow-hidden">
              {[
                { k: "uptime", v: "since 2024" },
                { k: "stack", v: "React · TS · Vite" },
                { k: "focus", v: "full-stack" },
                { k: "status", v: "shipping" },
              ].map((s) => (
                <div key={s.k} className="bg-card p-4 transition-colors hover:bg-card/70">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#identity"
        aria-label="Scroll to next section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ChevronDown className="h-4 w-4 animate-float-y" />
      </a>
    </section>
  );
}
