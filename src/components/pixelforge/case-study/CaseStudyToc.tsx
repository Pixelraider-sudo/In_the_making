interface TocEntry {
  id: string;
  label: string;
}

const SECTIONS: TocEntry[] = [
  { id: "problem", label: "Problem statement" },
  { id: "research", label: "Research" },
  { id: "architecture", label: "Architecture" },
  { id: "tech-decisions", label: "Tech decisions" },
  { id: "features", label: "Features" },
  { id: "timeline", label: "Timeline" },
  { id: "challenges", label: "Challenges" },
  { id: "future", label: "Future" },
];

/**
 * Renders only the sections that actually exist on the page (checked via
 * `availableIds`), so it never links to an empty/missing section.
 */
export function CaseStudyToc({ availableIds }: { availableIds: Set<string> }) {
  const entries = SECTIONS.filter((s) => availableIds.has(s.id));

  if (entries.length === 0) return null;

  return (
    <nav className="sticky top-6 hidden lg:block">
      <p className="mb-3 font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border pl-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
