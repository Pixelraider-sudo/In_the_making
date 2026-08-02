import { CaseStudySection } from "./CaseStudySection";
import type { FeatureEntry } from "../data/case-study-types";

export function FeatureBreakdown({ data }: { data: FeatureEntry[] }) {
  if (data.length === 0) return null;

  return (
    <CaseStudySection id="features" index="05" title="Feature breakdown">
      <div className="space-y-6">
        {data.map((feature) => (
          <article key={feature.name} className="rounded-lg border border-border bg-card/50 p-5">
            <h3 className="text-base font-semibold text-foreground">{feature.name}</h3>

            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-xs font-mono uppercase tracking-widest text-primary/70">
                  Purpose
                </dt>
                <dd className="mt-1">{feature.purpose}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-widest text-primary/70">
                  Implementation
                </dt>
                <dd className="mt-1">{feature.implementation}</dd>
              </div>
              {feature.technicalChallenges && (
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-primary/70">
                    Technical challenges
                  </dt>
                  <dd className="mt-1">{feature.technicalChallenges}</dd>
                </div>
              )}
              {feature.performanceConsiderations && (
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-primary/70">
                    Performance considerations
                  </dt>
                  <dd className="mt-1">{feature.performanceConsiderations}</dd>
                </div>
              )}
              {feature.futureImprovements && (
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-primary/70">
                    Future improvements
                  </dt>
                  <dd className="mt-1 text-muted-foreground/80">{feature.futureImprovements}</dd>
                </div>
              )}
            </dl>
          </article>
        ))}
      </div>
    </CaseStudySection>
  );
}
