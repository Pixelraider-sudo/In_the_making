/**
 * Case Study content schema.
 *
 * This is the data contract for the Phase 2 "Project Case Study System."
 * Every field here maps directly to a section from the Phase 2 spec
 * (Hero, Problem Statement, Research, Architecture, Technology Decisions,
 * Feature Breakdown, Development Timeline, Challenges, Future Improvements).
 *
 * All fields are typed as real content — this schema intentionally has
 * NO fabricated example values baked in anywhere except
 * `data/case-studies/example-case-study.ts`, which is clearly labeled as
 * sample/placeholder content for verifying the template renders correctly.
 *
 * To add a real case study:
 *   1. Create `data/case-studies/<slug>.ts` exporting a `CaseStudy` object.
 *   2. Register it in `data/case-studies/index.ts`.
 *   3. Add a matching `caseStudySlug` to the project entry in `data/projects.ts`
 *      so the "View case study" link appears on the project card.
 */

export type CaseStudyStatus = "live" | "in-progress" | "shipped" | "archived";

export interface CaseStudyLinks {
  github?: string;
  liveDemo?: string;
  docs?: string;
}

export interface CaseStudyTimelineMeta {
  start: string; // e.g. "Mar 2026"
  end?: string; // omit if ongoing
  durationLabel?: string; // e.g. "6 weeks"
}

export interface ProblemStatement {
  description: string;
  businessGoals: string[];
  painPoints: string[];
  objectives: string[];
  successMetrics: string[];
}

export interface ResearchNotes {
  competitorAnalysis?: string;
  userResearch?: string;
  requirements: string[];
  constraints: string[];
  tradeoffs: string[];
}

export interface ArchitectureNotes {
  overview: string;
  frontend?: string;
  backend?: string;
  database?: string;
  authFlow?: string;
  apiStructure?: string;
  folderOrganization?: string;
  deployment?: string;
}

export interface TechDecision {
  technology: string;
  reasonSelected: string;
  advantages: string[];
  tradeoffs: string[];
  alternativesConsidered: string[];
  whyAlternativesRejected: string;
}

export interface FeatureEntry {
  name: string;
  purpose: string;
  implementation: string;
  technicalChallenges?: string;
  performanceConsiderations?: string;
  futureImprovements?: string;
}

export interface TimelinePhase {
  phase: string;
  description: string;
  date?: string;
}

export interface ChallengeEntry {
  title: string;
  description: string;
  solution: string;
  lessonLearned: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: CaseStudyStatus;
  timeline: CaseStudyTimelineMeta;
  techStack: string[];
  links: CaseStudyLinks;

  problem: ProblemStatement;
  research?: ResearchNotes;
  architecture: ArchitectureNotes;
  techDecisions: TechDecision[];
  features: FeatureEntry[];
  devTimeline: TimelinePhase[];
  challenges: ChallengeEntry[];
  futureImprovements: string[];

  /** Set true only for verified sample/demo content — never for a real project. */
  isSampleContent?: boolean;
}
