import { Section } from "./Section";
import { useState } from "react";
import { ChevronDown, GitCommit } from "lucide-react";

type Entry = {
  date: string;
  title: string;
  body: string;
  tag: string;
  commit?: string;
};

const entries: Entry[] = [
  {
    date: "Jun 2025",
    title: "Phase 2 frontend overhaul — real images, less emoji, richer hero",
    body: "Stripped placeholder content across all sections and replaced with production-grade copy. Rewired the hero to show real stats (10+ projects shipped, 3+ years building), added a live uptime counter since day one, and a 'available for hire' badge. Skills now has proficiency levels (expert / proficient / learning) across 6 categories. The site finally reads like a senior engineer's portfolio, not a template.",
    tag: "portfolio",
    commit: "feat: phase-2-frontend-polish",
  },
  {
    date: "May 2025",
    title: "Shipped AI Command Center — streaming Anthropic API with markdown",
    body: "Built a full AI-powered dashboard on top of the Anthropic claude-sonnet-4-6 API. Category-aware system prompts route questions across 10 PIXELFORGE division domains. Real-time token streaming, markdown parser with code block support, and a dark terminal UI. Hardest part: getting the stream reader to correctly flush partial JSON chunks without breaking the renderer. Solved with a TextDecoder + buffer accumulation pattern.",
    tag: "AI · build",
    commit: "feat: ai-command-center-streaming",
  },
  {
    date: "Apr 2025",
    title: "Sperian Studios — delivered full rental platform to client",
    body: "Solo delivery of 13 production files: landing page, listings grid, property detail, Node.js/Express REST API (8 endpoints), PostgreSQL relational schema (tenants, properties, bookings, payments), M-Pesa Daraja integration, and Stripe fallback. Biggest learning: M-Pesa's STK Push requires a specific base64 timestamp format that's not clearly documented — cost me 3 hours. Documented it in my personal notes for next time.",
    tag: "client · full-stack",
  },
  {
    date: "Mar 2025",
    title: "Fixed Tailwind v4 config + GitHub Actions CI/CD failures",
    body: "Spent an afternoon debugging why Tailwind classes were being purged in production but worked locally. Root cause: nested folder structure was confusing the Vite content glob — it was scanning `src/**` but missing `src/components/pixelforge/**`. Fixed by adding an explicit source annotation. Also fixed a GitHub Actions YAML that was failing because environment variables weren't being passed to the build step correctly.",
    tag: "devops · debug",
    commit: "fix: tailwind-source-glob-ci-env",
  },
  {
    date: "Jan 2025",
    title: "TypeScript generics clicked — modeled the cert vault",
    body: "After months of treating TypeScript as 'typed JavaScript,' generics finally made sense while building the Certifications component. Modeling `Cert` as a discriminated union with a `category` field that drives color theming — and getting the type narrowing to work in JSX — was the moment it clicked. Type safety isn't friction; it's leverage. The cert vault is now fully type-safe and extensible.",
    tag: "typescript · learning",
  },
  {
    date: "Dec 2024",
    title: "First commit to In The Making — portfolio as a dashboard",
    body: "Reframed the portfolio entirely. Instead of the usual 'About / Skills / Projects / Contact' sections, I treated each module as a running process in a developer environment — hence the terminal tags (proc :: /mindset, db :: /skills.json). The scanline overlay and grid backdrop are intentional — they signal systems thinking, not just aesthetic preference. Beginnings are deceptively powerful.",
    tag: "portfolio · design",
    commit: "init: portfolio-as-dashboard",
  },
];

export function DevLog() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="devlog"
      tag="log :: /devlog.md"
      title={
        <>
          Behind the <span className="text-gradient-forge">scenes</span>.
        </>
      }
      intro="Short notes from the workshop — what I'm shipping, what's breaking, what's clicking."
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {entries.map((e, i) => {
          const isOpen = open === i;
          return (
            <div key={e.title} className={i ? "border-t border-border" : ""}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between px-5 py-4 text-left hover:bg-background/40 transition-colors gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      {e.date}
                    </span>
                    <span className="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-primary/70">
                      {e.tag}
                    </span>
                    {e.commit && (
                      <span className="hidden md:flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50">
                        <GitCommit className="h-3 w-3" />
                        {e.commit}
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-foreground">{e.title}</div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 mt-1 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                  {e.body}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs font-mono text-muted-foreground">
        <span className="text-primary">$</span> updated regularly ·{" "}
        <a
          href="https://github.com/Kipkirui-John"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          github.com/Kipkirui-John
        </a>{" "}
        for commit history
      </p>
    </Section>
  );
}
