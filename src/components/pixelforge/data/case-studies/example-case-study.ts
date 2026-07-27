import type { CaseStudy } from "../case-study-types";

/**
 * SAMPLE CONTENT — not a real project.
 *
 * This entry exists only to exercise every section of the case-study
 * template (`routes/projects.$slug.tsx`) so it can be verified end-to-end
 * before real project write-ups are dropped in. It is intentionally NOT
 * linked from any card in `data/projects.ts`, and `isSampleContent: true`
 * renders a visible banner on the page so it can never be mistaken for
 * real content.
 *
 * Reachable directly at /projects/example-case-study for review.
 *
 * Delete this file once at least one real case study exists, or keep it
 * around as a reference for the schema shape — just don't link to it.
 */
export const exampleCaseStudy: CaseStudy = {
  slug: "example-case-study",
  title: "[Sample] Case Study Template",
  tagline: "Placeholder content demonstrating every section of the case-study schema.",
  category: "Template",
  status: "archived",
  timeline: { start: "—", end: "—", durationLabel: "—" },
  techStack: ["Replace", "With", "Real", "Stack"],
  links: {},
  isSampleContent: true,

  problem: {
    description: "[Describe the real problem this project solved, and for whom.]",
    businessGoals: ["[Business goal 1]", "[Business goal 2]"],
    painPoints: ["[User pain point 1]", "[User pain point 2]"],
    objectives: ["[Objective 1]", "[Objective 2]"],
    successMetrics: ["[How success was measured]"],
  },

  research: {
    competitorAnalysis: "[What existing solutions were evaluated, and what they got wrong.]",
    userResearch: "[Any real user/stakeholder input gathered.]",
    requirements: ["[Requirement 1]", "[Requirement 2]"],
    constraints: ["[Constraint — timeline, budget, tech]"],
    tradeoffs: ["[A real trade-off made, and why]"],
  },

  architecture: {
    overview: "[High-level description of how the system is structured.]",
    frontend: "[Frontend architecture notes]",
    backend: "[Backend architecture notes, if applicable]",
    database: "[Database/schema notes, if applicable]",
    authFlow: "[Auth flow, if applicable]",
    apiStructure: "[API structure, if applicable]",
    folderOrganization: "[Real folder structure + why it's organized that way]",
    deployment: "[Deployment/infra notes]",
  },

  techDecisions: [
    {
      technology: "[e.g. React]",
      reasonSelected: "[Why this was chosen for this specific project]",
      advantages: ["[Advantage 1]"],
      tradeoffs: ["[Trade-off accepted]"],
      alternativesConsidered: ["[Alternative A]", "[Alternative B]"],
      whyAlternativesRejected: "[Why the alternatives lost out]",
    },
  ],

  features: [
    {
      name: "[Feature name]",
      purpose: "[Why this feature exists]",
      implementation: "[How it was actually built]",
      technicalChallenges: "[What was hard about it]",
      performanceConsiderations: "[Any perf-specific notes]",
      futureImprovements: "[What v2 of this feature looks like]",
    },
  ],

  devTimeline: [
    { phase: "Planning", description: "[What happened in this phase]", date: "[date]" },
    { phase: "Development", description: "[What happened in this phase]", date: "[date]" },
    { phase: "Testing", description: "[What happened in this phase]", date: "[date]" },
    { phase: "Deployment", description: "[What happened in this phase]", date: "[date]" },
  ],

  challenges: [
    {
      title: "[Name the challenge]",
      description: "[What went wrong / what was hard]",
      solution: "[How it was actually resolved]",
      lessonLearned: "[What this taught you]",
    },
  ],

  futureImprovements: ["[Planned improvement 1]", "[Planned improvement 2]"],
};
