import { CaseStudySection, BulletList } from "./CaseStudySection";
import type { ResearchNotes } from "../data/case-study-types";

export function ResearchSection({ data }: { data: ResearchNotes }) {
  return (
    <CaseStudySection id="research" index="02" title="Research">
      {data.competitorAnalysis && (
        <div className="mb-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Competitor analysis
          </h3>
          <p className="mt-2">{data.competitorAnalysis}</p>
        </div>
      )}
      {data.userResearch && (
        <div className="mb-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            User research
          </h3>
          <p className="mt-2">{data.userResearch}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Requirements
          </h3>
          <BulletList items={data.requirements} />
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Constraints
          </h3>
          <BulletList items={data.constraints} />
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
            Trade-offs
          </h3>
          <BulletList items={data.tradeoffs} />
        </div>
      </div>
    </CaseStudySection>
  );
}
