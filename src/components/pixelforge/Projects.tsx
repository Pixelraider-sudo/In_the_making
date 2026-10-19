import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Github, Star } from "lucide-react";

import { Section } from "./Section";
import { projects } from "./data/projects";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { StatusDot, type StatusTone } from "./ui/StatusDot";

type Tag = "all" | "full-stack" | "client" | "frontend" | "open-source";
type ProjectStatus = "live" | "in-progress" | "concept";

type DisplayProject = {
  slug: string;
  title: string;
  desc: string;
  detail: string;
  stack: string[];
  tags: Tag[];
  live?: string;
  repo?: string;
  featured: boolean;
  status: ProjectStatus;
  caseStudySlug?: string;
};

const getProjectTags = (category: string, repoUrl?: string): Tag[] => {
  const tags: Tag[] = [];

  if (category === "frontend") {
    tags.push("frontend");
  }

  if (category === "full-stack") {
    tags.push("full-stack");
  }

  if (category === "business") {
    tags.push("client");
  }

  // A public repository can be explored from the portfolio.
  if (repoUrl) {
    tags.push("open-source");
  }

  return tags;
};

const normalizeStatus = (status: string): ProjectStatus => {
  if (status === "live") return "live";
  if (status === "in-progress") return "in-progress";
  return "concept";
};

const PROJECTS: DisplayProject[] = projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  desc: project.tagline,
  detail: project.description,
  stack: project.stack,
  tags: getProjectTags(project.category, project.repoUrl),
  live: project.liveUrl,
  repo: project.repoUrl,
  featured: project.featured,
  status: normalizeStatus(project.status),
  caseStudySlug: project.caseStudySlug,
}));

const FILTER_LABELS: { key: Tag; label: string }[] = [
  { key: "all", label: "All projects" },
  { key: "full-stack", label: "Full-stack" },
  { key: "client", label: "Client work" },
  { key: "frontend", label: "Frontend" },
  { key: "open-source", label: "Public repositories" },
];

const STATUS_TONE: Record<ProjectStatus, StatusTone> = {
  live: "success",
  "in-progress": "warning",
  concept: "info",
};

export function Projects() {
  const [active, setActive] = useState<Tag>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible =
    active === "all" ? PROJECTS : PROJECTS.filter((project) => project.tags.includes(active));

  return (
    <Section
      id="projects"
      tag="portfolio :: /selected-work"
      title={
        <>
          Selected <span className="text-gradient-forge">projects</span>.
        </>
      }
      intro="A selection of digital products, interfaces, and engineering projects built with a focus on thoughtful design, practical functionality, and maintainable code."
    >
      <div className="mb-8 flex flex-wrap items-center gap-2" aria-label="Filter projects">
        {FILTER_LABELS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActive(filter.key)}
            aria-pressed={active === filter.key}
            className={`rounded-md border px-3 py-1.5 text-xs font-mono transition-standard ${
              active === filter.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}

        <span className="ml-auto text-xs font-mono text-muted-foreground" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((project) => {
          const isExpanded = expanded === project.slug;

          return (
            <article
              key={project.slug}
              className={`group flex flex-col overflow-hidden rounded-xl border bg-card transition-standard hover:-translate-y-1 hover:elevation-2 ${
                project.featured
                  ? "border-primary/40 hover:border-primary"
                  : "border-border hover:border-primary/60"
              }`}
            >
              <header className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>

                <div className="flex items-center gap-3">
                  {project.featured && (
                    <span className="flex items-center gap-1 text-3xs font-mono text-yellow-400">
                      <Star aria-hidden="true" className="h-3 w-3 fill-yellow-400" />
                      Featured
                    </span>
                  )}

                  <StatusDot
                    label={project.status.replace("-", " ")}
                    tone={STATUS_TONE[project.status]}
                    size="sm"
                  />
                </div>
              </header>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-title-md text-foreground">{project.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>

                {isExpanded && (
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="text-xs leading-relaxed text-muted-foreground/80">
                      {project.detail}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : project.slug)}
                  aria-expanded={isExpanded}
                  className="mt-3 self-start text-left text-2xs font-mono text-muted-foreground transition-standard hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {isExpanded ? "− Show less" : "+ Read project details"}
                </button>

                <ul
                  className="mt-4 flex flex-wrap gap-1.5"
                  aria-label={`${project.title} technologies`}
                >
                  {project.stack.map((technology) => (
                    <li key={technology}>
                      <Badge variant="tag" size="sm">
                        {technology}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="category" size="sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {project.caseStudySlug && (
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.caseStudySlug }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/50 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-standard hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Case study
                      <BookOpen aria-hidden="true" className="h-3 w-3" />
                    </Link>
                  )}

                  {project.live && (
                    <Button
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Live demo
                      <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </Button>
                  )}

                  {project.repo && (
                    <Button
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      <Github aria-hidden="true" className="h-3 w-3" />
                      Source code
                    </Button>
                  )}

                  {!project.live && !project.repo && (
                    <span className="text-3xs font-mono italic text-muted-foreground/70">
                      Project details available on request
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
          No projects match this filter yet.
        </p>
      )}

      <p className="mt-6 text-xs font-mono text-muted-foreground">
        <span className="text-primary">$</span> Explore more projects on{" "}
        <a
          href="https://github.com/Pixelraider-sudo"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}
