import { Section } from "./Section";
import { FolderTree, Globe, Database, Network, TerminalSquare, Cpu } from "lucide-react";

const cards = [
  {
    icon: FolderTree,
    label: "filesystem",
    title: "Journey",
    body: "Tenwek → Chavakali → Zetech → PIXELFORGE. Every directory built on the last. 4 nodes, 10+ years of compiling.",
    href: "#journey",
  },
  {
    icon: Globe,
    label: "browser",
    title: "Projects",
    body: "5 production builds — AI dashboards, full-stack rental platforms, React ecosystems. All shipped, some with clients.",
    href: "#projects",
  },
  {
    icon: Database,
    label: "database",
    title: "Skills",
    body: "React, TypeScript, Node.js, PostgreSQL, Anthropic API, Tailwind, Vercel. 6 skill categories, 3 proficiency levels.",
    href: "#skills",
  },
  {
    icon: Cpu,
    label: "process",
    title: "Focus",
    body: "6 active processes: Phase 2 polish, AI division, backend depth, terminal build, client work, building in public.",
    href: "#focus",
  },
  {
    icon: Network,
    label: "network",
    title: "Contact",
    body: "Email, GitHub, LinkedIn, WhatsApp. Open to contracts, internships, and collaborations. Response within 24h.",
    href: "#contact",
  },
  {
    icon: TerminalSquare,
    label: "terminal",
    title: "_console",
    body: "Hit Ctrl + K. Try `help`, `skills`, `projects`, `about`, `contact`. The terminal is the real interface.",
    href: "#hero",
  },
];

export function Environment() {
  return (
    <Section
      id="environment"
      tag="env :: /pixelforge"
      title={
        <>
          The developer <span className="text-gradient-forge">environment</span>.
        </>
      }
      intro="Not pages — modules. Each card is a running process in the PIXELFORGE workspace."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
            >
              {/* Grid overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">~/{c.label}</span>
                <span className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              </div>

              <div className="relative mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>

              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
                {c.body}
              </p>

              <div className="relative mt-6 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                $ open --module {c.label}
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
