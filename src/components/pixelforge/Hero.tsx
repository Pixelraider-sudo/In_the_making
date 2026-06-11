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
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1400);
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
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          {/* Profile image — replace src with your photo */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative h-36 w-36 md:h-44 md:w-44">
              {/* rotating gradient ring */}
              <div
                className="absolute -inset-1 rounded-full opacity-80 blur-[2px] animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, oklch(0.82 0.16 200), oklch(0.65 0.22 300), oklch(0.75 0.18 180), oklch(0.82 0.16 200))",
                }}
              />
              <div className="absolute inset-0 rounded-full glow-ring" />
              <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-background bg-card">
                <img
                  src="/profile.jpg"
                  alt="Kipkirui John"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              system.online · kipkiruijohn://identity
            </div>
            <h1 className="font-[Space_Grotesk] text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Hi, I'm <span className="text-gradient-forge">Kipkirui John</span>
              <br />a <span className="text-gradient-forge">software engineer</span> in the making.
            </h1>
            <div className="mt-4 font-mono text-sm md:text-base text-muted-foreground">
              &gt; role := <span className="text-primary">{role}</span>
              <span className="caret text-primary">▍</span>
            </div>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Software engineering student at Zetech University, growing into a full-stack builder.
              I design systems — not just websites. This is my evolving developer ecosystem: an
              honest log of learning, building, and shipping.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]"
              >
                View the forge <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
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
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {[
                { k: "uptime", v: "since 2024" },
                { k: "stack", v: "React · TS · Vite" },
                { k: "focus", v: "full-stack" },
                { k: "status", v: "shipping" },
              ].map((s) => (
                <div key={s.k} className="bg-card p-4">
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
    </section>
  );
}
