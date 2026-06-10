import { Section } from "./Section";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const entries = [
  {
    date: "this week",
    title: "Wiring the environment grid",
    body: "Reframed the portfolio as a dashboard of modules. Felt right — each card is a process, not a page.",
  },
  {
    date: "recent",
    title: "TypeScript click moment",
    body: "Generics finally clicked while modeling a reusable card component. Type safety is leverage.",
  },
  {
    date: "earlier",
    title: "First commit to PIXELFORGE",
    body: "Empty repo, a README, a vision. Beginnings are deceptively powerful.",
  },
];

export function DevLog() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="devlog"
      tag="log :: /devlog.md"
      title={
        <>
          Behind the <span className="text-gradient-forge">scenes</span>.
        </>
      }
      intro="Short notes from the workshop — what I'm learning, what's breaking, what's clicking."
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {entries.map((e, i) => {
          const isOpen = open === i;
          return (
            <div key={e.title} className={i ? "border-t border-border" : ""}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-background/40"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {e.date}
                  </div>
                  <div className="mt-1 font-semibold">{e.title}</div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {e.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
