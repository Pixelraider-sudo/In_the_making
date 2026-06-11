import { Section } from "./Section";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  stack: string[];
  live?: string; // Vercel / deployed URL
  repo?: string; // GitHub URL
};

// Add your projects here. Drop in the Vercel + GitHub links per project.
const PROJECTS: Project[] = [
  {
    title: "PIXELFORGE — developer ecosystem",
    desc: "Personal platform where I forge components, document learning, and prototype full-stack ideas.",
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
      intro="A growing developer ecosystem — part portfolio, part lab, part roadmap."
    >
      <div className="mb-6 text-xs font-mono text-muted-foreground">
        {items.length} project{items.length === 1 ? "" : "s"} on the workbench · edit{" "}
        <code className="text-primary">PROJECTS</code> in <code>Projects.tsx</code> to add more.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((p) => (
          <article
            key={p.title}
            className="group glass hover-lift flex flex-col overflow-hidden rounded-xl"
          >
            <header className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-5/70" />
              </div>
              <span>{p.live ? "● live" : "○ wip"}</span>
            </header>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5 text-[10px]">
                {p.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)]"
                  >
                    Live <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary"
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
