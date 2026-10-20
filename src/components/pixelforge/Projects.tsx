import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, ExternalLink, Github, Star } from "lucide-react";

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

  if (category === "frontend") tags.push("frontend");
  if (category === "full-stack") tags.push("full-stack");
  if (category === "business") tags.push("client");
  if (repoUrl) tags.push("open-source");

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
  { key: "all", label: "All" },
  { key: "full-stack", label: "Full-stack" },
  { key: "client", label: "Client work" },
  { key: "frontend", label: "Frontend" },
  { key: "open-source", label: "Open source" },
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
      intro="Digital products, interfaces, and engineering experiments built with thoughtful design and maintainable code."
    >
      {/* Compact filters */}
      <div className="mb-5 flex flex-wrap items-center gap-1.5" aria-label="Filter projects">
        {FILTER_LABELS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => {
              setActive(filter.key);
              setExpanded(null);
            }}
            aria-pressed={active === filter.key}
            className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active === filter.key
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}

        <span className="ml-auto text-xs font-mono text-muted-foreground" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Compact project grid */}
      <div className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => {
          const isExpanded = expanded === project.slug;

          return (
            <article
              key={project.slug}
              className={`group relative flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-card ${
                project.featured
                  ? "border-primary/35 hover:border-primary/70"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {/* Small featured accent */}
              {project.featured && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              )}

              <div className="flex flex-1 flex-col p-4">
                {/* Title and status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {project.featured && (
                      <span className="mb-1.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-yellow-500">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}

                    <h3 className="break-words text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                  </div>

                  <StatusDot
                    label={project.status.replace("-", " ")}
                    tone={STATUS_TONE[project.status]}
                    size="sm"
                  />
                </div>

                {/* Short description */}
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.desc}</p>

                {/* Expandable project details */}
                {isExpanded && (
                  <div className="mt-3 rounded-lg border border-border/70 bg-background/60 p-3">
                    <p className="text-xs leading-5 text-muted-foreground">{project.detail}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : project.slug)}
                  aria-expanded={isExpanded}
                  className="mt-2 inline-flex w-fit items-center gap-1 text-[11px] font-mono text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {isExpanded ? "Show less" : "More details"}
                  <ArrowUpRight
                    className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>

                {/* Technologies and categories share one compact area */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((technology) => (
                    <Badge key={technology} variant="tag" size="sm">
                      {technology}
                    </Badge>
                  ))}

                  {project.stack.length > 4 && (
                    <span className="inline-flex items-center rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      +{project.stack.length - 4}
                    </span>
                  )}

                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-primary/[0.07] px-1.5 py-0.5 font-mono text-[9px] text-primary/90"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
                  {project.caseStudySlug && (
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.caseStudySlug }}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-primary/35 px-2.5 py-1.5 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <BookOpen className="h-3 w-3" />
                      Case study
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
                      <ExternalLink className="h-3 w-3" />
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
                      <Github className="h-3 w-3" />
                      Code
                    </Button>
                  )}

                  {!project.live && !project.repo && !project.caseStudySlug && (
                    <span className="text-[10px] italic text-muted-foreground/70">
                      Details available on request
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="rounded-xl border border-border p-5 text-center text-sm text-muted-foreground">
          No projects match this filter yet.
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
        <p className="text-xs text-muted-foreground">
          <span className="font-mono text-primary">$</span> More experiments, commits, and source
          code.
        </p>

        <a
          href="https://github.com/Pixelraider-sudo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
        >
          Explore GitHub
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </Section>
  );
}
