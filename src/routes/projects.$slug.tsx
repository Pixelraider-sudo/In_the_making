import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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

    if (!caseStudy) {
      throw notFound();
    }

    return caseStudy;
  },

  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.title} | Kipkirui John`,
          },
          {
            name: "description",
            content: loaderData.tagline,
          },
          {
            property: "og:type",
            content: "article",
          },
          {
            property: "og:title",
            content: `${loaderData.title} | Kipkirui John`,
          },
          {
            property: "og:description",
            content: loaderData.tagline,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
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

  const hasOptionalSections =
    Boolean(caseStudy.research) ||
    caseStudy.techDecisions.length > 0 ||
    caseStudy.features.length > 0 ||
    caseStudy.devTimeline.length > 0 ||
    caseStudy.challenges.length > 0 ||
    caseStudy.futureImprovements.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to portfolio
          </Link>

          <a
            href="mailto:kipkiruijohn814@gmail.com?subject=Project%20or%20opportunity%20inquiry"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Discuss a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {caseStudy.isSampleContent && <SampleContentBanner />}

        <CaseStudyHero caseStudy={caseStudy} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
          <article className="min-w-0 space-y-12">
            <ProblemStatement data={caseStudy.problem} />

            {caseStudy.research && <ResearchSection data={caseStudy.research} />}

            <ArchitectureSection data={caseStudy.architecture} />

            {caseStudy.techDecisions.length > 0 && <TechDecisions data={caseStudy.techDecisions} />}

            {caseStudy.features.length > 0 && <FeatureBreakdown data={caseStudy.features} />}

            {caseStudy.devTimeline.length > 0 && <CaseStudyTimeline data={caseStudy.devTimeline} />}

            {caseStudy.challenges.length > 0 && <ChallengesSection data={caseStudy.challenges} />}

            {caseStudy.futureImprovements.length > 0 && (
              <CaseStudyFuture data={caseStudy.futureImprovements} />
            )}
          </article>

          {hasOptionalSections && (
            <aside className="order-first min-w-0 lg:order-last">
              <div className="lg:sticky lg:top-8">
                <CaseStudyToc availableIds={availableIds} />
              </div>
            </aside>
          )}
        </div>

        <section className="mt-16 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-9">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Have something in mind?
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Let's turn your next idea into something real.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              If you're hiring, building a product, or looking for a developer to help bring an idea
              to life, let's start a conversation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:kipkiruijohn814@gmail.com?subject=Let's%20work%20together"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explore more work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
