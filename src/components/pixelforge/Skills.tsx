import { Section } from "./Section";

type SkillStatus = "core" | "building" | "exploring";

const STATUS_STYLES: Record<SkillStatus, string> = {
  core: "border-primary/35 bg-primary/10 text-primary",
  building: "border-border bg-background/60 text-foreground/80",
  exploring: "border-dashed border-border bg-transparent text-muted-foreground",
};

const STATUS_DOTS: Record<SkillStatus, string> = {
  core: "bg-primary",
  building: "bg-muted-foreground/70",
  exploring: "bg-muted-foreground/35",
};

const groups: {
  id: string;
  label: string;
  index: string;
  description: string;
  skills: { name: string; status: SkillStatus }[];
}[] = [
  {
    id: "frontend",
    label: "Frontend development",
    index: "01",
    description: "My primary focus",
    skills: [
      { name: "React", status: "core" },
      { name: "TypeScript", status: "core" },
      { name: "JavaScript", status: "core" },
      { name: "HTML5", status: "core" },
      { name: "CSS3", status: "core" },
      { name: "Next.js", status: "building" },
      { name: "Vite", status: "core" },
    ],
  },
  {
    id: "ui",
    label: "UI engineering",
    index: "02",
    description: "Interfaces & interactions",
    skills: [
      { name: "Tailwind CSS", status: "core" },
      { name: "Responsive design", status: "core" },
      { name: "CSS variables", status: "core" },
      { name: "Framer Motion", status: "building" },
      { name: "React component design", status: "core" },
      { name: "Accessible UI", status: "building" },
    ],
  },
  {
    id: "application",
    label: "Application development",
    index: "03",
    description: "Building product experiences",
    skills: [
      { name: "React Hooks", status: "core" },
      { name: "TanStack Router", status: "building" },
      { name: "TanStack Query", status: "building" },
      { name: "API integration", status: "building" },
      { name: "Form & interaction states", status: "core" },
      { name: "Vitest", status: "building" },
    ],
  },
  {
    id: "tooling",
    label: "Developer workflow",
    index: "04",
    description: "Tools I work with",
    skills: [
      { name: "Git", status: "core" },
      { name: "GitHub", status: "core" },
      { name: "VS Code", status: "core" },
      { name: "Vercel", status: "building" },
      { name: "npm", status: "core" },
      { name: "PowerShell", status: "building" },
    ],
  },
  {
    id: "ai",
    label: "AI product integration",
    index: "05",
    description: "Applied in product experiences",
    skills: [
      { name: "Anthropic API", status: "building" },
      { name: "AI chat interfaces", status: "building" },
      { name: "Streaming responses", status: "building" },
      { name: "Conversation UX", status: "building" },
    ],
  },
];

const LEGEND: { status: SkillStatus; label: string }[] = [
  { status: "core", label: "Core working stack" },
  { status: "building", label: "Applied / developing" },
  { status: "exploring", label: "Currently exploring" },
];

export function Skills() {
  return (
    <Section
      id="skills"
      tag="stack.config"
      title={
        <>
          Tools for the <span className="text-gradient-forge">build.</span>
        </>
      }
      intro="A focused view of the technologies I use to build interfaces, ship product experiences, and keep improving as an engineer."
    >
      <div className="space-y-5">
        {/* Stack status */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {LEGEND.map(({ status, label }) => (
            <div
              key={status}
              className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOTS[status]}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Skill groups */}
        <div className="overflow-hidden rounded-xl border border-border bg-card/60">
          {groups.map((group, index) => (
            <section
              key={group.id}
              className={`grid gap-3 px-4 py-4 sm:px-5 md:grid-cols-[minmax(155px,0.7fr)_minmax(0,2fr)] md:gap-6 ${
                index > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="pt-0.5 font-mono text-[10px] text-primary/70">{group.index}</span>

                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-foreground">{group.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap content-start gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] leading-relaxed transition-colors ${STATUS_STYLES[skill.status]}`}
                    title={`${skill.name} — ${
                      skill.status === "core"
                        ? "Core working stack"
                        : skill.status === "building"
                          ? "Applied or developing"
                          : "Currently exploring"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1 w-1 shrink-0 rounded-full ${STATUS_DOTS[skill.status]}`}
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Learning direction */}
        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-card/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="max-w-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Next on the roadmap
            </p>
            <p className="mt-1 text-sm text-foreground">Deeper engineering fundamentals.</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["Testing", "Accessibility", "System design"].map((item) => (
              <span
                key={item}
                className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
