import { Section } from "./Section";

type Level = "expert" | "proficient" | "learning";

const LEVEL_COLOR: Record<Level, string> = {
  expert: "border-primary/50 bg-primary/10 text-primary",
  proficient: "border-primary/25 bg-primary/5 text-primary/70",
  learning: "border-border bg-background/40 text-muted-foreground/70",
};

const LEVEL_DOT: Record<Level, string> = {
  expert: "bg-primary",
  proficient: "bg-primary/60",
  learning: "bg-muted-foreground/40",
};

const groups: {
  k: string;
  label: string;
  items: { name: string; level: Level }[];
}[] = [
  {
    k: "frontend",
    label: "Frontend",
    items: [
      { name: "React 18", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Vite", level: "expert" },
      { name: "JSX / TSX", level: "expert" },
      { name: "Framer Motion", level: "proficient" },
      { name: "React Router", level: "proficient" },
      { name: "TanStack Router", level: "proficient" },
      { name: "Next.js", level: "learning" },
    ],
  },
  {
    k: "styling",
    label: "Styling & Design",
    items: [
      { name: "Tailwind CSS", level: "expert" },
      { name: "CSS Variables", level: "expert" },
      { name: "Responsive Design", level: "expert" },
      { name: "shadcn/ui", level: "proficient" },
      { name: "Glassmorphism", level: "proficient" },
      { name: "Dark UI systems", level: "expert" },
    ],
  },
  {
    k: "backend",
    label: "Backend & APIs",
    items: [
      { name: "Node.js", level: "proficient" },
      { name: "Express.js", level: "proficient" },
      { name: "REST APIs", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "Auth systems", level: "learning" },
      { name: "WebSockets", level: "learning" },
    ],
  },
  {
    k: "ai",
    label: "AI / LLM",
    items: [
      { name: "Anthropic API", level: "expert" },
      { name: "Prompt engineering", level: "expert" },
      { name: "Streaming responses", level: "expert" },
      { name: "Structured outputs", level: "proficient" },
      { name: "AI UX patterns", level: "proficient" },
      { name: "OpenAI API", level: "learning" },
    ],
  },
  {
    k: "payments",
    label: "Integrations",
    items: [
      { name: "M-Pesa Daraja", level: "proficient" },
      { name: "Stripe", level: "proficient" },
      { name: "Vercel", level: "expert" },
      { name: "GitHub Actions", level: "proficient" },
      { name: "Google OAuth", level: "learning" },
    ],
  },
  {
    k: "tools",
    label: "Tooling",
    items: [
      { name: "Git / GitHub", level: "expert" },
      { name: "VS Code", level: "expert" },
      { name: "PowerShell", level: "proficient" },
      { name: "Linux CLI", level: "proficient" },
      { name: "Figma", level: "learning" },
      { name: "Docker", level: "learning" },
    ],
  },
];

const LEGEND: { level: Level; label: string }[] = [
  { level: "expert", label: "Expert / ships daily" },
  { level: "proficient", label: "Proficient / production-ready" },
  { level: "learning", label: "In progress / building" },
];

export function Skills() {
  return (
    <Section
      id="skills"
      tag="db :: /skills.json"
      title={
        <>
          The current <span className="text-gradient-forge">stack</span>.
        </>
      }
      intro="Honest snapshot — what I ship with today, what's in the pipeline. No inflated buzzwords."
    >
      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4 text-xs font-mono">
        {LEGEND.map((l) => (
          <div key={l.level} className="flex items-center gap-2 text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${LEVEL_DOT[l.level]}`} />
            {l.label}
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card font-mono text-sm">
        {groups.map((g, i) => (
          <div
            key={g.k}
            className={`grid gap-4 px-5 py-4 md:grid-cols-[140px_1fr] ${i ? "border-t border-border" : ""}`}
          >
            {/* Category */}
            <div className="flex items-start gap-2 pt-0.5">
              <span className="text-primary">{g.k}:</span>
            </div>
            {/* Items */}
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s.name}
                  className={`flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs transition-colors ${LEVEL_COLOR[s.level]}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${LEVEL_DOT[s.level]}`} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Currently exploring */}
      <div className="mt-6 rounded-lg border border-border border-dashed bg-card/40 px-5 py-4 font-mono text-sm">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
          currently indexing →
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "DevOps fundamentals",
            "Cloud architecture (AWS)",
            "Cybersecurity basics",
            "Distributed systems",
            "tRPC",
            "Prisma ORM",
          ].map((item) => (
            <span
              key={item}
              className="rounded border border-dashed border-border px-2.5 py-1 text-[11px] text-muted-foreground/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
