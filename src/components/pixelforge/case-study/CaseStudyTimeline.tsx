import { CaseStudySection } from "./CaseStudySection";
import type { TimelinePhase } from "../data/case-study-types";

export function CaseStudyTimeline({ data }: { data: TimelinePhase[] }) {
  if (data.length === 0) return null;

  return (
    <CaseStudySection id="timeline" index="06" title="Development timeline">
      <ol className="relative space-y-6 border-l border-border pl-6">
        {data.map((phase, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-sm font-semibold text-foreground">{phase.phase}</h3>
              {phase.date && (
                <span className="font-mono text-[11px] text-muted-foreground">{phase.date}</span>
              )}
            </div>
            <p className="mt-1">{phase.description}</p>
          </li>
        ))}
      </ol>
    </CaseStudySection>
  );
}
