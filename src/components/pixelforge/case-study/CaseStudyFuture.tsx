import { CaseStudySection, BulletList } from "./CaseStudySection";

export function CaseStudyFuture({ data }: { data: string[] }) {
  if (data.length === 0) return null;

  return (
    <CaseStudySection id="future" index="08" title="Future improvements">
      <BulletList items={data} />
    </CaseStudySection>
  );
}
