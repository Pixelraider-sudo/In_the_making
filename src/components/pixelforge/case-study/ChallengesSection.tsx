import { CaseStudySection } from "./CaseStudySection";
import type { ChallengeEntry } from "../data/case-study-types";

export function ChallengesSection({ data }: { data: ChallengeEntry[] }) {
  if (data.length === 0) return null;

  return (
    <CaseStudySection id="challenges" index="07" title="Challenges">
      <div className="space-y-5">
        {data.map((c) => (
          <article key={c.title} className="rounded-lg border border-border bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
            <p className="mt-2">{c.description}</p>
            <p className="mt-3 border-l-2 border-primary/50 pl-3 text-foreground/90">
              <span className="font-mono text-2xs uppercase tracking-widest text-primary/70">
                Solution:{" "}
              </span>
              {c.solution}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/80">
              <span className="font-mono uppercase tracking-widest text-primary/60">
                Lesson learned:{" "}
              </span>
              {c.lessonLearned}
            </p>
          </article>
        ))}
      </div>
    </CaseStudySection>
  );
}
