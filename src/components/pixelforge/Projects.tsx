import { Section } from "./Section";
import { Github, ExternalLink, Star } from "lucide-react";
import { useState } from "react";

type Tag = "all" | "ai" | "full-stack" | "client" | "frontend" | "open-source";

type Project = {
  title: string;
  desc: string;
  detail: string;
  stack: string[];
  tags: Tag[];
  live?: string;
  repo?: string;
  featured?: boolean;
  status: "live" | "wip" | "shipped";
};

const PROJECTS: Project[] = [
  {
    title: "PIXELFORGE — Developer Ecosystem",
    desc: "Personal developer platform and brand: 9 divisions (Dev, AI, Labs, Security, Cloud, Mobile, Community, Garage, Media), AI Command Center powered by the Anthropic API with streaming markdown, full dark cyberpunk design system.",
    detail:
      "Built on React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion. Includes a fully interactive terminal (Ctrl+K), Konami egg, live scroll progress, and theme switcher. AI Command Center covers all 10 division categories with real-time streaming responses.",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Anthropic API",
      "Vercel",
    ],
    tags: ["full-stack", "ai", "open-source", "frontend"],
    live: "https://pixelforge-u8gc.vercel.app",
    repo: "https://github.com/Kipkirui-John/pixelforge",
    featured: true,
    status: "live",
  },
  {
    title: "This Portfolio — In The Making",
    desc: "The very site you're reading. A systems-first developer portfolio designed as a dashboard of modules — each section a running process. Terminal, DevLog, Roadmap, Achievements, and live environment graph.",
    detail:
      "Single-page React + TypeScript app. Features a scanline cyberpunk aesthetic, Orbitron/Space Grotesk typography, an animated skill-tree roadmap, Konami egg easter egg, live uptime counter, and persistent audio cues.",
    stack: ["React", "TypeScript", "Vite", "TailwindCSS", "TanStack Router", "Vercel"],
    tags: ["frontend", "open-source"],
    live: "https://in-the-making.vercel.app",
    repo: "https://github.com/Kipkirui-John/in-the-making",
    featured: true,
    status: "live",
  },
  {
    title: "Sperian Studios — Rental Platform",
    desc: "Full production rental system for a client: property listings, booking flows, tenant management, and integrated payments. Delivered as 13 files covering frontend + backend + DB schema.",
    detail:
      "Frontend: landing, listings, and property-detail pages with glassmorphism, scroll-reveal effects. Backend: Node.js + Express REST API, relational PostgreSQL schema. Payments: M-Pesa Daraja + Stripe dual integration. Deployed and handed over to client.",
    stack: [
      "HTML/CSS/JS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "M-Pesa Daraja",
      "Stripe",
      "REST API",
    ],
    tags: ["full-stack", "client"],
    status: "shipped",
  },
  {
    title: "BabyForge — Pregnancy & Parenting App",
    desc: "Zero-dependency single-page application for pregnancy tracking and early parenting. Week-by-week pregnancy timeline, symptom checker, feeding/diaper log — all with localStorage persistence.",
    detail:
      "Built with no external frameworks or libraries. Pure HTML, CSS, and vanilla JavaScript. LocalStorage data persistence across sessions. Responsive mobile-first layout. Designed for low-bandwidth environments.",
    stack: ["HTML", "CSS", "Vanilla JS", "localStorage API"],
    tags: ["frontend"],
    status: "shipped",
  },
  {
    title: "AI Command Center",
    desc: "Standalone AI-powered dashboard using the Anthropic API. Multi-category prompt routing across 10 PIXELFORGE division domains — from DevOps questions to Security advisories — with streaming markdown rendering.",
    detail:
      "Built with React and the Anthropic claude-sonnet-4-6 model. Server-side API key handling, real-time token streaming, category-aware system prompts, markdown parser for code blocks, and a full dark terminal UI.",
    stack: ["React", "TypeScript", "Anthropic API", "Streaming", "Markdown parser"],
    tags: ["ai", "full-stack"],
    status: "live",
  },
];

const FILTER_LABELS: { key: Tag; label: string }[] = [
  { key: "all", label: "all" },
  { key: "full-stack", label: "full-stack" },
  { key: "ai", label: "AI" },
  { key: "client", label: "client work" },
  { key: "frontend", label: "frontend" },
  { key: "open-source", label: "open-source" },
];

const STATUS_STYLE: Record<Project["status"], string> = {
  live: "text-green-400 before:bg-green-400",
  wip: "text-yellow-400 before:bg-yellow-400",
  shipped: "text-primary before:bg-primary",
};

export function Projects() {
  const [active, setActive] = useState<Tag>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <Section
      id="projects"
      tag="browser :: /featured"
      title={
        <>
          Featured <span className="text-gradient-forge">projects</span>.
        </>
      }
      intro="Production-grade work — shipped for clients, personal ecosystems, and open-source. Every project is a system, not just a website."
    >
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {FILTER_LABELS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`rounded-md border px-3 py-1.5 text-xs font-mono transition-all ${
              active === f.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs font-mono text-muted-foreground">
          {visible.length} project{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((p) => {
          const isExpanded = expanded === p.title;
          return (
            <article
              key={p.title}
              className={`group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-1 ${
                p.featured
                  ? "border-primary/40 hover:border-primary"
                  : "border-border hover:border-primary/60"
              }`}
            >
              {/* Window chrome */}
              <header className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-3">
                  {p.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-yellow-400">
                      <Star className="h-3 w-3 fill-yellow-400" /> featured
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest before:mr-1.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:content-[''] ${STATUS_STYLE[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
              </header>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-foreground leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                {/* Expandable detail */}
                {isExpanded && (
                  <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed border-t border-border pt-3">
                    {p.detail}
                  </p>
                )}

                <button
                  onClick={() => setExpanded(isExpanded ? null : p.title)}
                  className="mt-3 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {isExpanded ? "▲ collapse" : "▼ expand details"}
                </button>

                {/* Stack tags */}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Filter tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags
                    .filter((t) => t !== "all")
                    .map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-mono text-primary/70"
                      >
                        #{t}
                      </span>
                    ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-shadow"
                    >
                      Live <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Github className="h-3 w-3" /> Code
                    </a>
                  )}
                  {!p.live && !p.repo && (
                    <span className="text-[10px] font-mono text-muted-foreground/50 italic">
                      client project · NDA
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs font-mono text-muted-foreground">
        <span className="text-primary">$</span> More work lives at{" "}
        <a
          href="https://github.com/Kipkirui-John"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          github.com/Kipkirui-John
        </a>{" "}
        · actively adding new repos
      </p>
    </Section>
  );
}
