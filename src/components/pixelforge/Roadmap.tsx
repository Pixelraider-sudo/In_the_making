import { Section } from "./Section";

const branches = [
  {
    stage: "foundation",
    items: ["HTML", "CSS", "JavaScript", "Git", "CLI basics"],
    done: true,
    note: "Mastered 2022",
  },
  {
    stage: "frontend craft",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Component architecture"],
    done: true,
    note: "Shipped multiple projects",
  },
  {
    stage: "design systems",
    items: ["Dark UI", "CSS variables", "Framer Motion", "Responsive design", "shadcn/ui"],
    done: true,
    note: "PIXELFORGE design system",
  },
  {
    stage: "AI integration",
    items: ["Anthropic API", "Prompt engineering", "Streaming", "LLM UX", "Structured outputs"],
    done: true,
    note: "AI Command Center shipped",
  },
  {
    stage: "current — backend",
    items: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "Auth systems"],
    done: true,
    active: true,
    note: "Actively building",
  },
  {
    stage: "current — ecosystem",
    items: [
      "PIXELFORGE 9 divisions",
      "CI/CD pipelines",
      "GitHub Actions",
      "Vercel deployments",
      "Monorepo patterns",
    ],
    done: false,
    active: true,
    note: "In progress",
  },
  {
    stage: "next — cloud",
    items: ["AWS basics", "Docker", "Environment management", "SaaS architecture", "Rate limiting"],
    done: false,
    note: "Q3 2025 target",
  },
  {
    stage: "future",
    items: [
      "Distributed systems",
      "DevOps",
      "Cybersecurity",
      "Mobile (React Native)",
      "Team leadership",
    ],
    done: false,
    note: "Long-term vision",
  },
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
      intro="A live skill tree — greyed nodes are intentional. Ambition has a clear shape and timeline."
    >
      <div className="relative">
        <div className="absolute left-4 top-3 bottom-3 w-px bg-border md:left-1/2" />
        <ul className="space-y-6">
          {branches.map((b, i) => (
            <li
              key={b.stage}
              className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Left side */}
              <div className="pl-12 md:pl-0 md:text-right md:pr-8">
                <span
                  className={`absolute left-2 top-2 h-5 w-5 rounded-full border-2 md:left-1/2 md:-translate-x-1/2 transition-all ${
                    b.active
                      ? "border-primary bg-primary animate-pulse-glow shadow-[0_0_12px_var(--cyan)]"
                      : b.done
                        ? "border-primary bg-card"
                        : "border-border bg-background"
                  }`}
                />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  branch
                </div>
                <div
                  className={`mt-1 text-lg font-semibold ${b.done ? "text-foreground" : "text-muted-foreground/50"}`}
                >
                  {b.stage}
                </div>
                {b.note && (
                  <div
                    className={`mt-1 text-[10px] font-mono ${
                      b.active
                        ? "text-primary"
                        : b.done
                          ? "text-primary/60"
                          : "text-muted-foreground/40"
                    }`}
                  >
                    {b.active && "▶ "}
                    {b.note}
                  </div>
                )}
              </div>

              {/* Right side */}
              <div className="pl-12 md:pl-8">
                <div className="flex flex-wrap gap-2">
                  {b.items.map((it) => (
                    <span
                      key={it}
                      className={`rounded-md border px-2.5 py-1 text-xs font-mono transition-all ${
                        b.active
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : b.done
                            ? "border-primary/30 bg-primary/5 text-primary/80"
                            : "border-dashed border-border text-muted-foreground/50"
                      }`}
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

      {/* PIXELFORGE divisions mini-tree */}
      <div className="mt-10 rounded-lg border border-border bg-card/50 p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          pixelforge :: 9-division ecosystem
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {["Dev", "AI", "Labs", "Security", "Cloud", "Mobile", "Community", "Garage", "Media"].map(
            (div) => (
              <div
                key={div}
                className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-center"
              >
                <div className="text-xs font-mono text-primary">{div}</div>
              </div>
            ),
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground font-mono">
          <span className="text-primary">tagline:</span> "Build Beyond Limits"
        </p>
      </div>
    </Section>
  );
}
