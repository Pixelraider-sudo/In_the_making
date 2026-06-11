import { Section } from "./Section";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  stack: string[];
  live?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "PIXELFORGE — developer ecosystem",
    desc: "Personal platform where I forge components, document learning, and prototype full-stack systems.",
    stack: ["React", "TypeScript", "Vite", "Tailwind"],
    live: "https://your-project.vercel.app",
    repo: "https://github.com/your-username/your-repo",
  },
  {
    title: "Project two",
    desc: "Short description of what this project does and why it matters.",
    stack: ["Next.js", "Supabase"],
    live: "",
    repo: "",
  },
];

export function Projects() {
  const items = PROJECTS;

  return (
    <Section
      id="projects"
      tag="browser :: /featured"
      title={
        <>
          Featured <span className="text-gradient-forge">projects</span>.
        </>
      }
      intro="A growing developer ecosystem — part portfolio, part lab, part shipped work."
    >
      {/* header meta */}
      <div className="mb-10 text-xs font-mono text-muted-foreground tracking-wide">
        {items.length} project{items.length === 1 ? "" : "s"} in the forge · update{" "}
        <code className="text-primary">PROJECTS</code> in Projects.tsx
      </div>

      {/* grid */}
      <div className="grid gap-7 md:grid-cols-2">
        {items.map((p) => (
          <article
            key={p.title}
            className="
              group relative overflow-hidden rounded-2xl
              border border-border/80 bg-card/40 backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1 hover:border-primary/30
              hover:shadow-[var(--shadow-glow)]
            "
          >
            {/* soft glow background */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -inset-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl" />
            </div>

            {/* top bar */}
            <header className="flex items-center justify-between border-b border-border/60 bg-background/30 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>

              <span className="opacity-80">{p.live ? "● deployed" : "○ building"}</span>
            </header>

            {/* content */}
            <div className="relative flex flex-col p-6">
              {/* title */}
              <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {p.title}
              </h3>

              {/* description */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

              {/* stack */}
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="
                      rounded-md border border-border/70
                      bg-background/30 px-2 py-1
                      text-[10px] font-mono text-muted-foreground
                      transition
                      group-hover:border-primary/30 group-hover:text-primary
                    "
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* actions */}
              <div className="mt-6 flex flex-wrap gap-2">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center gap-1.5
                      rounded-md bg-primary px-3 py-1.5
                      text-xs font-semibold text-primary-foreground
                      transition-all
                      hover:scale-[1.03]
                      hover:shadow-[var(--shadow-glow)]
                    "
                  >
                    Live <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center gap-1.5
                      rounded-md border border-border
                      bg-background/30 px-3 py-1.5
                      text-xs font-mono text-muted-foreground
                      transition-all
                      hover:border-primary hover:text-primary
                    "
                  >
                    <Github className="h-3 w-3" /> Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
