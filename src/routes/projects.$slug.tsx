import { createFileRoute, notFound } from "@tanstack/react-router";

import { getCaseStudy } from "@/components/pixelforge/data/case-studies";
import { CaseStudyHero } from "@/components/pixelforge/case-study/CaseStudyHero";
import { CaseStudyToc } from "@/components/pixelforge/case-study/CaseStudyToc";
import { SampleContentBanner } from "@/components/pixelforge/case-study/SampleContentBanner";
import { ProblemStatement } from "@/components/pixelforge/case-study/ProblemStatement";
import { ResearchSection } from "@/components/pixelforge/case-study/ResearchSection";
import { ArchitectureSection } from "@/components/pixelforge/case-study/ArchitectureSection";
import { TechDecisions } from "@/components/pixelforge/case-study/TechDecisions";
import { FeatureBreakdown } from "@/components/pixelforge/case-study/FeatureBreakdown";
import { CaseStudyTimeline } from "@/components/pixelforge/case-study/CaseStudyTimeline";
import { ChallengesSection } from "@/components/pixelforge/case-study/ChallengesSection";
import { CaseStudyFuture } from "@/components/pixelforge/case-study/CaseStudyFuture";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const caseStudy = getCaseStudy(params.slug);
    if (!caseStudy) throw notFound();
    return caseStudy;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Case Study` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.title} — Case Study` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [],
  }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const caseStudy = Route.useLoaderData();

  const availableIds = new Set<string>([
    "problem",
    ...(caseStudy.research ? ["research"] : []),
    "architecture",
    ...(caseStudy.techDecisions.length > 0 ? ["tech-decisions"] : []),
    ...(caseStudy.features.length > 0 ? ["features"] : []),
    ...(caseStudy.devTimeline.length > 0 ? ["timeline"] : []),
    ...(caseStudy.challenges.length > 0 ? ["challenges"] : []),
    ...(caseStudy.futureImprovements.length > 0 ? ["future"] : []),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      {caseStudy.isSampleContent && <SampleContentBanner />}

      <CaseStudyHero caseStudy={caseStudy} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_180px]">
        <div>
          <ProblemStatement data={caseStudy.problem} />
          {caseStudy.research && <ResearchSection data={caseStudy.research} />}
          <ArchitectureSection data={caseStudy.architecture} />
          <TechDecisions data={caseStudy.techDecisions} />
          <FeatureBreakdown data={caseStudy.features} />
          <CaseStudyTimeline data={caseStudy.devTimeline} />
          <ChallengesSection data={caseStudy.challenges} />
          <CaseStudyFuture data={caseStudy.futureImprovements} />
        </div>

        <aside className="order-first lg:order-last">
          <CaseStudyToc availableIds={availableIds} />
        </aside>
      </div>
    </main>
  );
}
