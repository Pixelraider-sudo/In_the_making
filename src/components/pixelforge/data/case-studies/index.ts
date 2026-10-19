import type { CaseStudy } from "../case-study-types";

import { exampleCaseStudy } from "./example-case-study";
import { sperianStudiosCaseStudy } from "./sperian-studios-rental-platform";

/**
 * Central registry of published case studies.
 *
 * A project detail page works only when its caseStudySlug matches
 * a slug registered here.
 *
 * To publish a case study:
 * 1. Create a CaseStudy object in its own file.
 * 2. Import it here and add it to CASE_STUDIES.
 * 3. Add the same slug to the matching project in data/projects.ts.
 */
const registeredCaseStudies: CaseStudy[] = [sperianStudiosCaseStudy, exampleCaseStudy];

const CASE_STUDIES: ReadonlyMap<string, CaseStudy> = new Map(
  registeredCaseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.get(slug);
}

export function getAllCaseStudySlugs(): string[] {
  return [...CASE_STUDIES.keys()];
}
