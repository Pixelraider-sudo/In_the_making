import { Github, ExternalLink, FileText, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CaseStudy } from "../data/case-study-types";

const STATUS_STYLE: Record<CaseStudy["status"], string> = {
  live: "text-green-400 before:bg-green-400",
  "in-progress": "text-yellow-400 before:bg-yellow-400",
  shipped: "text-primary before:bg-primary",
  archived: "text-muted-foreground before:bg-muted-foreground",
};

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const { title, tagline, category, status, timeline, techStack, links } = caseStudy;

  return (
    <header className="border-b border-border pb-10">
      <Link
        to="/"
        hash="projects"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> back to projects
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary/80">
          {category}
        </span>
        <span
          className={`text-[11px] font-mono uppercase tracking-widest before:mr-1.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:content-[''] ${STATUS_STYLE[status]}`}
        >
          {status}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {timeline.start}
          {timeline.end ? ` – ${timeline.end}` : ""}
          {timeline.durationLabel ? ` · ${timeline.durationLabel}` : ""}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{tagline}</p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {techStack.map((t) => (
          <li
            key={t}
            className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-2">
        {links.liveDemo && (
          <a
            href={links.liveDemo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
          >
            Live demo <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-4 py-2 text-sm font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" /> Source
          </a>
        )}
        {links.docs && (
          <a
            href={links.docs}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-4 py-2 text-sm font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <FileText className="h-3.5 w-3.5" /> Docs
          </a>
        )}
      </div>
    </header>
  );
}
