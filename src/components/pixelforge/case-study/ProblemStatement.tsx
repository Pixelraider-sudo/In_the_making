import { CaseStudySection, BulletList } from "./CaseStudySection";
import type { ProblemStatement as ProblemStatementData } from "../data/case-study-types";

export function ProblemStatement({ data }: { data: ProblemStatementData }) {
  return (
    <CaseStudySection id="problem" index="01" title="Problem statement">
      <p>{data.description}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Business goals
          </h3>
          <BulletList items={data.businessGoals} />
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            User pain points
          </h3>
          <BulletList items={data.painPoints} />
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Objectives
          </h3>
          <BulletList items={data.objectives} />
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Success metrics
          </h3>
          <BulletList items={data.successMetrics} />
        </div>
      </div>
    </CaseStudySection>
  );
}
