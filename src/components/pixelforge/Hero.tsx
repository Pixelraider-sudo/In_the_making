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
      {/* subtle depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-14">
          {/* PROFILE SECTION */}
          <div className="shrink-0 mx-auto md:mx-0 relative">
            <div className="relative h-40 w-40 md:h-48 md:w-48">
              {/* glow aura behind */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.17 60 / 0.55), transparent 65%)",
                }}
              />

              {/* rotating ring (kept but softened) */}
              <div
                className="absolute -inset-1 rounded-full opacity-70 animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, oklch(0.78 0.17 60), oklch(0.70 0.20 35), oklch(0.85 0.16 85), oklch(0.78 0.17 60))",
                }}
              />

              {/* inner glow ring */}
              <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_40px_rgba(255,170,80,0.25)]" />

              {/* image */}
              <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-background bg-card">
                <img
                  src="/profile.jpeg"
                  alt="Kipkirui John"
                  className="h-full w-full object-cover scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="flex-1 text-center md:text-left">
            {/* system tag */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              system.online · identity://active
            </div>

            {/* headline */}
            <h1 className="font-[Space_Grotesk] text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Hi, I'm <span className="text-gradient-forge">Kipkirui John</span>
              <br />a <span className="text-gradient-forge">software engineer</span> in the making.
            </h1>

            {/* typing role */}
            <div className="mt-5 font-mono text-sm md:text-base text-muted-foreground">
              &gt; role := <span className="text-primary font-semibold">{role}</span>
              <span className="caret text-primary">▍</span>
            </div>

            {/* description */}
            <p className="mt-7 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Software engineering student at Zetech University, growing into a full-stack builder.
              I design systems — not just websites. This is my evolving developer ecosystem: a
              living record of learning, building, and shipping.
            </p>

            {/* actions */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
              >
                View the forge <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-4 w-4" /> Resume
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-all hover:border-primary hover:text-primary hover:scale-[1.02]"
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-[1.05]"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:scale-[1.05]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            {/* stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {[
                { k: "uptime", v: "since 2024" },
                { k: "stack", v: "React · TS · Vite" },
                { k: "focus", v: "full-stack" },
                { k: "status", v: "shipping" },
              ].map((s) => (
                <div key={s.k} className="bg-card p-4 hover:bg-card/80 transition">
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
