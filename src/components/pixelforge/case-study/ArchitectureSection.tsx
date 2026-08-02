import type { ArchitectureNotes } from "../data/case-study-types";
import { CaseStudySection } from "./CaseStudySection";

const FIELD_LABELS: { key: keyof Omit<ArchitectureNotes, "overview">; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "authFlow", label: "Auth flow" },
  { key: "apiStructure", label: "API structure" },
  { key: "folderOrganization", label: "Folder organization" },
  { key: "deployment", label: "Deployment" },
];

export function ArchitectureSection({ data }: { data: ArchitectureNotes }) {
  const filledFields = FIELD_LABELS.filter(({ key }) => Boolean(data[key]));

  return (
    <CaseStudySection id="architecture" index="03" title="Architecture">
      <p>{data.overview}</p>

      {filledFields.length > 0 && (
        <div className="mt-6 space-y-5">
          {filledFields.map(({ key, label }) => (
            <div key={key} className="rounded-lg border border-border bg-card/50 p-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">
                {label}
              </h3>
              <p className="mt-2 whitespace-pre-line font-mono text-xs leading-relaxed text-muted-foreground">
                {data[key]}
              </p>
            </div>
          ))}
        </div>
      )}
    </CaseStudySection>
  );
}
