import { AlertTriangle } from "lucide-react";

/**
 * Shown at the top of any case study flagged `isSampleContent: true`.
 * Makes it impossible to mistake placeholder/demo content for a real
 * project write-up, whether viewed directly or found via search.
 */
export function SampleContentBanner() {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <strong>Sample content.</strong> This page demonstrates the case-study template with
        placeholder text — it is not a real project. Real case studies live at{" "}
        <code className="rounded bg-black/20 px-1 py-0.5 font-mono text-xs">
          src/components/pixelforge/data/case-studies/
        </code>
        .
      </p>
    </div>
  );
}
