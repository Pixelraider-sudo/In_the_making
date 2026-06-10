import { Section } from "./Section";

const groups = [
  { k: "frontend", v: ["React", "TypeScript", "Vite", "JSX/TSX"] },
  { k: "styling", v: ["TailwindCSS", "CSS variables", "Responsive design"] },
  { k: "tools", v: ["Git", "GitHub", "Vercel", "VS Code"] },
  { k: "learning", v: ["Node.js", "Databases", "System design", "REST APIs"] },
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
      intro="Honest snapshot: what I ship with today, what I'm indexing next."
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card font-mono text-sm">
        {groups.map((g, i) => (
          <div
            key={g.k}
            className={`grid grid-cols-[120px_1fr] gap-4 px-5 py-4 ${i ? "border-t border-border" : ""}`}
          >
            <div className="text-primary">{g.k}:</div>
            <div className="flex flex-wrap gap-2">
              {g.v.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-background/60 px-2 py-0.5 text-xs text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
