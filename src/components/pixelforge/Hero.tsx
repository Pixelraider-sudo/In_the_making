import {
  Github,
  Linkedin,
  ExternalLink,
  Terminal as TerminalIcon,
  Download,
  Code2,
  Cpu,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";

const ROLES = [
  "full-stack engineer",
  "software architect",
  "React + TypeScript expert",
  "API & systems builder",
  "UI/UX engineer",
  "AI integration specialist",
  "open-source contributor",
];

function useTypedRole() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 35 : 70;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1600);
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

const STATS = [
  { k: "projects shipped", v: "10+", icon: Code2 },
  { k: "years building", v: "3+", icon: Cpu },
  { k: "live deployments", v: "5+", icon: Globe },
  { k: "status", v: "open to work", icon: null },
];

export function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const role = useTypedRole();
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    const start = new Date("2022-01-01").getTime();
    const tick = () => {
      const diff = Date.now() - start;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setUptime(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border"
      style={{ background: "var(--gradient-glow)" }}
    >
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Animated grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-36 md:pb-36">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
          {/* Profile */}
          <div className="shrink-0 mx-auto md:mx-0 flex flex-col items-center gap-3">
            <div className="relative h-36 w-36 md:h-44 md:w-44 rounded-full border-2 border-primary/50 overflow-hidden shadow-[var(--shadow-glow)]">
              <img src="/profile.jpg" alt="Kipkirui John" className="h-full w-full object-cover" />
              <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background" />
            </div>
            {/* Availability badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              available for hire
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            {/* Status line */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              system.online · kipkiruijohn://identity · uptime: {uptime}
            </div>

            <h1 className="font-[Space_Grotesk] text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Kipkirui <span className="text-gradient-forge">John</span>
              <br />
              <span className="text-4xl md:text-5xl text-foreground/80">Software Engineer</span>
            </h1>

            {/* Typewriter */}
            <div className="mt-4 font-mono text-sm md:text-base text-muted-foreground">
              <span className="text-primary/60">$</span>{" "}
              <span className="text-primary/80">role</span>
              <span className="text-muted-foreground/60"> = </span>
              <span className="text-primary">"{role}"</span>
              <span className="caret text-primary animate-pulse">▍</span>
            </div>

            {/* Tagline */}
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              I design and ship{" "}
              <span className="text-foreground font-medium">full-stack systems</span> — from
              pixel-perfect interfaces to production-grade APIs, databases, and AI-powered tools.
              Based in Nairobi. Building the{" "}
              <span className="text-primary font-mono">PIXELFORGE</span> ecosystem and taking on
              client work that demands engineering precision.
            </p>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]"
              >
                View work{" "}
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-4 w-4" /> Resume / CV
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
                href="https://github.com/Kipkirui-John"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/kipkirui-john"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {STATS.map((s) => (
                <div key={s.k} className="bg-card p-5 flex flex-col gap-1">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-xl font-bold text-foreground font-mono">{s.v}</div>
                </div>
              ))}
            </div>

            {/* Quick-skill row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Tailwind",
                "Vite",
                "REST APIs",
                "AI/LLM",
                "Vercel",
                "Git",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
