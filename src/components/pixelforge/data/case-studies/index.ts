import type { CaseStudy } from "../case-study-types";
import { exampleCaseStudy } from "./example-case-study";

/**
 * Registry of all case studies, keyed by slug.
 *
 * To publish a real case study:
 *   1. Create `data/case-studies/<slug>.ts` exporting a `CaseStudy` object
 *      (see `example-case-study.ts` for the shape / `case-study-types.ts`
 *      for the full schema).
 *   2. Import + register it below.
 *   3. Add `caseStudySlug: "<slug>"` to the matching entry in
 *      `data/projects.ts` so the project card links to it.
 */
const CASE_STUDIES: Record<string, CaseStudy> = {
  [exampleCaseStudy.slug]: exampleCaseStudy,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
