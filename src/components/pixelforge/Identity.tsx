import { Section } from "./Section";
import { Cpu, Layers, Sparkles, GitBranch } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "Systems, not pages",
    body: "I think in modules, data flow, and contracts — building things that scale beyond a single screen.",
  },
  {
    icon: Layers,
    title: "UI · UX · architecture",
    body: "Pixel-level care for the interface, paired with clean separation of concerns underneath.",
  },
  {
    icon: GitBranch,
    title: "Learning in public",
    body: "Every commit is a checkpoint. The repo is the resume; the journey is the proof.",
  },
  {
    icon: Sparkles,
    title: "Built to evolve",
    body: "Today: frontend craft. Tomorrow: APIs, databases, auth, deployment, SaaS.",
  },
];

export function Identity() {
  return (
    <Section
      id="identity"
      tag="proc :: /mindset"
      title={
        <>
          How I <span className="text-gradient-forge">think</span> in code.
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary transition-colors"
            >
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
