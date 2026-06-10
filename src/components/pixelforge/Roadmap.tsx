import { Section } from "./Section";

const branches = [
  { stage: "foundation", items: ["HTML", "CSS", "JavaScript"], done: true },
  { stage: "frontend craft", items: ["React", "TypeScript", "Vite", "TailwindCSS"], done: true },
  {
    stage: "current",
    items: ["System design", "UI/UX patterns", "Component architecture"],
    done: true,
    active: true,
  },
  { stage: "in progress", items: ["Node.js", "REST APIs", "PostgreSQL"], done: false },
  { stage: "next", items: ["Auth systems", "Cloud deploy", "SaaS architecture"], done: false },
  { stage: "future", items: ["Distributed systems", "DevOps", "AI integration"], done: false },
];

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      tag="git :: /skill-tree"
      title={
        <>
          Learning <span className="text-gradient-forge">branch graph</span>.
        </>
      }
      intro="A live skill tree. Greyed nodes are intentional — ambition has shape."
    >
      <div className="relative">
        <div className="absolute left-4 top-3 bottom-3 w-px bg-border md:left-1/2" />
        <ul className="space-y-6">
          {branches.map((b, i) => (
            <li
              key={b.stage}
              className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="pl-12 md:pl-0 md:text-right md:pr-8">
                <span
                  className={`absolute left-2 top-2 h-5 w-5 rounded-full border-2 md:left-1/2 md:-translate-x-1/2 ${b.active ? "border-primary bg-primary animate-pulse-glow" : b.done ? "border-primary bg-card" : "border-border bg-background"}`}
                />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  branch
                </div>
                <div
                  className={`mt-1 text-lg font-semibold ${b.done ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {b.stage}
                </div>
              </div>
              <div className="pl-12 md:pl-8">
                <div className="flex flex-wrap gap-2">
                  {b.items.map((it) => (
                    <span
                      key={it}
                      className={`rounded-md border px-2.5 py-1 text-xs font-mono ${b.done ? "border-primary/40 bg-primary/5 text-primary" : "border-dashed border-border text-muted-foreground/70"}`}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
