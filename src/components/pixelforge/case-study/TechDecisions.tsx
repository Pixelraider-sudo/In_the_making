import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CaseStudySection, BulletList } from "./CaseStudySection";
import type { TechDecision } from "../data/case-study-types";

export function TechDecisions({ data }: { data: TechDecision[] }) {
  const [open, setOpen] = useState<string | null>(data[0]?.technology ?? null);

  if (data.length === 0) return null;

  return (
    <CaseStudySection id="tech-decisions" index="04" title="Technology decisions">
      <p className="mb-6">
        Every major dependency was a deliberate choice, not a default. Here's the reasoning behind
        each one.
      </p>

      <div className="space-y-3">
        {data.map((decision) => {
          const isOpen = open === decision.technology;
          return (
            <div
              key={decision.technology}
              className="overflow-hidden rounded-lg border border-border bg-card/50"
            >
              <button
                onClick={() => setOpen(isOpen ? null : decision.technology)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="font-semibold text-foreground">{decision.technology}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-border px-4 py-4">
                  <p>{decision.reasonSelected}</p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-primary/70">
                        Advantages
                      </h4>
                      <BulletList items={decision.advantages} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-primary/70">
                        Trade-offs
                      </h4>
                      <BulletList items={decision.tradeoffs} />
                    </div>
                  </div>

                  {decision.alternativesConsidered.length > 0 && (
                    <div className="mt-4 border-t border-border pt-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-primary/70">
                        Alternatives considered
                      </h4>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {decision.alternativesConsidered.map((alt) => (
                          <li
                            key={alt}
                            className="rounded border border-border bg-background/60 px-2 py-0.5 font-mono text-2xs text-muted-foreground"
                          >
                            {alt}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs text-muted-foreground/80">
                        {decision.whyAlternativesRejected}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CaseStudySection>
  );
}
