import { Github, ExternalLink, FileText, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CaseStudy } from "../data/case-study-types";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { StatusDot, type StatusTone } from "../ui/StatusDot";

const STATUS_TONE: Record<CaseStudy["status"], StatusTone> = {
  live: "success",
  "in-progress": "warning",
  shipped: "info",
  archived: "neutral",
};

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const { title, tagline, category, status, timeline, techStack, links } = caseStudy;

  return (
    <header className="border-b border-border pb-10">
      <Link
        to="/"
        hash="projects"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground transition-standard hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> back to projects
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="category" size="md">
          {category}
        </Badge>
        <StatusDot label={status} tone={STATUS_TONE[status]} />
        <span className="font-mono text-2xs text-muted-foreground">
          {timeline.start}
          {timeline.end ? ` – ${timeline.end}` : ""}
          {timeline.durationLabel ? ` · ${timeline.durationLabel}` : ""}
        </span>
      </div>

      <h1 className="mt-4 text-heading-lg text-foreground">{title}</h1>
      <p className="mt-4 max-w-prose text-body-lg text-muted-foreground">{tagline}</p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {techStack.map((t) => (
          <li key={t}>
            <Badge variant="tag" size="sm">
              {t}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-2">
        {links.liveDemo && (
          <Button
            href={links.liveDemo}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="md"
          >
            Live demo <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
        {links.github && (
          <Button href={links.github} target="_blank" rel="noreferrer" variant="outline" size="md">
            <Github className="h-3.5 w-3.5" /> Source
          </Button>
        )}
        {links.docs && (
          <Button href={links.docs} target="_blank" rel="noreferrer" variant="outline" size="md">
            <FileText className="h-3.5 w-3.5" /> Docs
          </Button>
        )}
      </div>
    </header>
  );
}
