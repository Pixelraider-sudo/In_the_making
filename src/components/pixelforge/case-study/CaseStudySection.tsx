import type { ReactNode } from "react";

interface CaseStudySectionProps {
  id: string;
  index: string; // e.g. "01"
  title: string;
  children: ReactNode;
}

/**
 * Consistent section shell for every part of a case study page:
 * numbered index, heading, anchor id (for the table of contents / deep links).
 */
export function CaseStudySection({ id, index, title, children }: CaseStudySectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-12 first:border-t-0">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-mono text-sm text-primary/60">{index}</span>
        <h2 className="text-xl font-semibold text-foreground md:text-2xl">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
