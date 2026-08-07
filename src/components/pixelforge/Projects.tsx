import { Section } from "./Section";
import { Github, ExternalLink, Star, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { StatusDot, type StatusTone } from "./ui/StatusDot";

type Tag = "all" | "full-stack" | "client" | "frontend" | "open-source";

type Project = {
  title: string;
  desc: string;
  detail: string;
  stack: string[];
  tags: Tag[];
  live?: string;
  repo?: string;
  featured?: boolean;
  status: "live" | "wip" | "shipped";
  /** Slug of a matching entry in data/case-studies/ — adds a "Case study" link when set. */
  caseStudySlug?: string;
};

const PROJECTS: Project[] = [
  {
    title: "This Portfolio — In The Making",
    desc: "A modern developer portfolio built with Vite, TypeScript, and React — interactive sections, a clean UI, and responsive design showcasing projects, skills, and achievements.",
    detail:
      "The very site you're reading. Single-page React + TypeScript app built on Vite and TanStack Router, with a full custom design-token system (typography scale, motion tokens, elevation), a cinematic boot sequence, an opt-in Engineering Mode, and CI running lint/typecheck/tests/build on every push.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Router", "Vercel"],
    tags: ["frontend", "open-source"],
    live: "https://in-the-making.vercel.app",
    repo: "https://github.com/Pixelraider-sudo/In_the_making",
    featured: true,
    status: "live",
  },
  {
    title: "Xentro Technologies",
    desc: "Software engineering portfolio and digital solutions platform for a Kenyan tech consultancy — an interactive service catalog and project-discovery wizard.",
    detail:
      "Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Covers a service catalog, an interactive discovery flow for prospective clients, and a fully responsive marketing site.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tags: ["frontend", "client"],
    live: "https://xentro-technologies.vercel.app/",
    repo: "https://github.com/Pixelraider-sudo/Xentro-Technologies",
    featured: true,
    status: "shipped",
  },
  {
    title: "Sperian Studios — Rental Platform",
    desc: "Full production rental system for a client: property listings, booking flows, tenant management, and integrated payments. Delivered as 13 files covering frontend + backend + DB schema.",
    detail:
      "Frontend: landing, listings, and property-detail pages with glassmorphism, scroll-reveal effects. Backend: Node.js + Express REST API, relational PostgreSQL schema. Payments: M-Pesa Daraja + Stripe dual integration. Deployed and handed over to client.",
    stack: [
      "HTML/CSS/JS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "M-Pesa Daraja",
      "Stripe",
      "REST API",
    ],
    tags: ["full-stack", "client"],
    status: "shipped",
    caseStudySlug: "sperian-studios-rental-platform",
  },
  {
    title: "CampusCycle",
    desc: "Fully front-end bike rental management system for university campuses — real-time fleet tracking, dynamic pricing, and M-Pesa/cash payment handling.",
    detail:
      "Owner-only account creation, an admin dashboard for fleet management, and bike image galleries with auto-rotation. Built entirely on the front end with no backend service.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    tags: ["frontend"],
    live: "https://campus-cycle-mauve.vercel.app/",
    repo: "https://github.com/Pixelraider-sudo/CampusCycle",
    status: "shipped",
  },
  {
    title: "Cheptalal Primary School",
    desc: "A premium digital-transformation concept for a Kenyan primary school — CBC-focused content, admissions, academics, and school-life sections.",
    detail:
      "Fully responsive, accessibility-conscious build for a public-facing school website. Covers admissions info, academics, and school-life content aligned to Kenya's CBC curriculum.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["frontend", "client"],
    live: "https://cheptalal-primary-school-gamma.vercel.app/",
    repo: "https://github.com/Pixelraider-sudo/cheptalal-primary-school",
    status: "shipped",
  },
];

const FILTER_LABELS: { key: Tag; label: string }[] = [
  { key: "all", label: "all" },
  { key: "full-stack", label: "full-stack" },
  { key: "client", label: "client work" },
  { key: "frontend", label: "frontend" },
  { key: "open-source", label: "open-source" },
];

const STATUS_TONE: Record<Project["status"], StatusTone> = {
  live: "success",
  wip: "warning",
  shipped: "info",
};

export function Projects() {
  const [active, setActive] = useState<Tag>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <Section
      id="projects"
      tag="browser :: /featured"
      title={
        <>
          Featured <span className="text-gradient-forge">projects</span>.
        </>
      }
      intro="Production-grade work — shipped for clients, personal ecosystems, and open-source. Every project is a system, not just a website."
    >
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {FILTER_LABELS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
            className={`rounded-md border px-3 py-1.5 text-xs font-mono transition-standard ${
              active === f.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs font-mono text-muted-foreground">
          {visible.length} project{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((p) => {
          const isExpanded = expanded === p.title;
          return (
            <article
              key={p.title}
              className={`group flex flex-col overflow-hidden rounded-xl border bg-card transition-standard hover:-translate-y-1 hover:elevation-2 ${
                p.featured
                  ? "border-primary/40 hover:border-primary"
                  : "border-border hover:border-primary/60"
              }`}
            >
              {/* Window chrome */}
              <header className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-3">
                  {p.featured && (
                    <span className="flex items-center gap-1 text-3xs font-mono text-yellow-400">
                      <Star className="h-3 w-3 fill-yellow-400" /> featured
                    </span>
                  )}
                  <StatusDot label={p.status} tone={STATUS_TONE[p.status]} size="sm" />
                </div>
              </header>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-title-md text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                {/* Expandable detail */}
                {isExpanded && (
                  <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed border-t border-border pt-3">
                    {p.detail}
                  </p>
                )}

                <button
                  onClick={() => setExpanded(isExpanded ? null : p.title)}
                  aria-expanded={isExpanded}
                  className="mt-3 text-2xs font-mono text-muted-foreground transition-standard hover:text-primary text-left"
                >
                  {isExpanded ? "▲ collapse" : "▼ expand details"}
                </button>

                {/* Stack tags */}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li key={t}>
                      <Badge variant="tag" size="sm">
                        {t}
                      </Badge>
                    </li>
                  ))}
                </ul>

                {/* Filter tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags
                    .filter((t) => t !== "all")
                    .map((t) => (
                      <Badge key={t} variant="category" size="sm">
                        #{t}
                      </Badge>
                    ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.caseStudySlug && (
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.caseStudySlug }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/50 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-standard hover:bg-primary/10"
                    >
                      Case study <BookOpen className="h-3 w-3" />
                    </Link>
                  )}
                  {p.live && (
                    <Button
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      Live <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                  {p.repo && (
                    <Button
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      <Github className="h-3 w-3" /> Code
                    </Button>
                  )}
                  {!p.live && !p.repo && (
                    <span className="text-3xs font-mono text-muted-foreground/50 italic">
                      client project · NDA
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs font-mono text-muted-foreground">
        <span className="text-primary">$</span> More work lives at{" "}
        <a
          href="https://github.com/Pixelraider-sudo"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          github.com/Pixelraider-sudo
        </a>{" "}
        · actively adding new repos
      </p>
    </Section>
  );
}
