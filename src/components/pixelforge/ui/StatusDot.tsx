/**
 * StatusDot — a small dot + label used to show project/task status
 * (live, in progress, queued, archived, ...).
 *
 * Previously this exact visual pattern was hand-rolled three separate
 * times with three separate color maps (Projects.tsx, CaseStudyHero.tsx,
 * Focus.tsx). This component is the single source of truth for it.
 *
 * Callers map their own domain-specific status string to one of the
 * four semantic tones below — the vocabulary ("live" vs "active" vs
 * "shipped") stays local to each feature, only the *visual language*
 * is shared.
 */

export type StatusTone = "success" | "warning" | "info" | "neutral";

const TONE_STYLE: Record<StatusTone, string> = {
  success: "text-green-400 before:bg-green-400",
  warning: "text-yellow-400 before:bg-yellow-400",
  info: "text-primary before:bg-primary",
  neutral: "text-muted-foreground before:bg-muted-foreground",
};

const SIZE_STYLE = {
  sm: "text-3xs before:h-1 before:w-1",
  md: "text-2xs before:h-1.5 before:w-1.5",
} as const;

export function StatusDot({
  label,
  tone,
  size = "md",
  className = "",
}: {
  label: string;
  tone: StatusTone;
  size?: keyof typeof SIZE_STYLE;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-widest before:mr-1.5 before:inline-block before:shrink-0 before:rounded-full before:content-[''] ${TONE_STYLE[tone]} ${SIZE_STYLE[size]} ${className}`}
    >
      {label}
    </span>
  );
}
