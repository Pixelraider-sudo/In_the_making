import { Github, Linkedin, ExternalLink, Terminal as TerminalIcon, Download } from "lucide-react";
import { useEffect, useState } from "react";

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

export function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const role = useTypedRole();

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border"
      style={{ background: "var(--gradient-glow)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          {/* PROFILE */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative h-40 w-40 md:h-48 md:w-48">
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

              <div className="relative h-full w-full rounded-full overflow-hidden bg-card border-2 border-background">
                <img
                  src="/profile.jpeg"
                  alt="Kipkirui John"
                  className="h-full w-full object-cover scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              system.online · identity.active
            </div>

            <h1 className="font-[Space_Grotesk] text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Hi, I’m <span className="text-gradient-forge">Kipkirui John</span>
              <br />a <span className="text-gradient-forge">software engineer</span> in the making.
            </h1>

            <div className="mt-4 font-mono text-sm md:text-base text-muted-foreground">
              &gt; role := <span className="text-primary font-semibold">{role}</span>
              <span className="caret text-primary">▍</span>
            </div>

            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Software engineering student building toward full-stack mastery. I design systems —
              not just interfaces.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                View Projects <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary"
              >
                <Download className="h-4 w-4" /> Resume
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium"
              >
                <TerminalIcon className="h-4 w-4" /> terminal
              </button>

              <a
                href="https://github.com"
                target="_blank"
                className="h-11 w-11 flex items-center justify-center rounded-md border border-border"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                className="h-11 w-11 flex items-center justify-center rounded-md border border-border"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl border border-border bg-border overflow-hidden">
              {[
                { k: "uptime", v: "since 2024" },
                { k: "stack", v: "React · TS · Vite" },
                { k: "focus", v: "full-stack" },
                { k: "status", v: "shipping" },
              ].map((s) => (
                <div key={s.k} className="bg-card p-4">
                  <div className="text-[10px] uppercase text-muted-foreground">{s.k}</div>
                  <div className="text-sm font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
