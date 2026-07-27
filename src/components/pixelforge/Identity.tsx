import { Section } from "./Section";
import { Cpu, Layers, Sparkles, GitBranch, Users } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "Systems, not just pages",
    body: "I architect solutions end-to-end — API contracts, data schemas, auth flows, deployment pipelines — before I write a single component. Every UI I build is the tip of a well-engineered iceberg.",
    tag: "architecture",
  },
  {
    icon: Layers,
    title: "UI · UX · performance",
    body: "Pixel-level interface precision meets clean separation of concerns. I build UIs that are fast, accessible, and visually decisive — dark themes, motion, typography — all intentional, never templated.",
    tag: "design-eng",
  },
  {
    icon: GitBranch,
    title: "Building in public",
    body: "The repo is the resume. Every commit tells a story — refactors, experiments, shipped features. I document the journey through DevLog entries and open-source contributions so the work speaks for itself.",
    tag: "open-source",
  },
  {
    icon: Users,
    title: "Client delivery track record",
    body: "Beyond personal projects, I've shipped production systems for real clients — full-stack rental platforms with payment integrations (M-Pesa, Stripe), REST APIs, relational schemas, and responsive frontends — all to deadline.",
    tag: "client-work",
  },
  {
    icon: Sparkles,
    title: "AI-native development",
    body: "I build with large language models as first-class tools — Anthropic API, streaming responses, prompt engineering, structured output parsing. AI isn't a buzzword in my stack; it's wired into production features.",
    tag: "AI/LLM",
  },
];

export function Identity() {
  return (
    <Section
      id="identity"
      tag="proc :: /mindset"
      title={
        <>
          How I <span className="text-gradient-forge">engineer</span>.
        </>
      }
      intro="Five lenses I bring to every project — from the first wireframe to the final deployment."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className={`group relative rounded-lg border border-border bg-card p-6 hover:border-primary transition-all hover:-translate-y-0.5 ${
                idx === pillars.length - 1 && pillars.length % 2 !== 0
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              {/* Tag */}
              <span className="inline-block mb-4 rounded border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary">
                {p.tag}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold text-foreground leading-tight">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>

      {/* Philosophy line */}
      <div className="mt-8 rounded-lg border border-border bg-card/50 px-6 py-4 font-mono text-sm">
        <span className="text-primary">const</span>{" "}
        <span className="text-foreground">philosophy</span>{" "}
        <span className="text-muted-foreground">=</span>{" "}
        <span className="text-primary/80">
          "Ship fast. Refactor honestly. Document everything. Never stop learning."
        </span>
        <span className="text-muted-foreground">;</span>
      </div>
    </Section>
  );
}
