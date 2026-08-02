/**
 * Badge — small pill/chip used for tech-stack tags, category labels,
 * and filter pills throughout the app (hero skill row, project cards,
 * case study tech stacks, filter bar).
 *
 * Consolidates several near-identical hand-rolled chip variants into
 * two: `tag` (neutral, informational — "React", "TypeScript") and
 * `category` (accent, classificatory — "AI Product", "Case Study").
 * Both share the same radius/spacing/motion tokens.
 */

const VARIANT_STYLE = {
  tag: "rounded-md border border-border bg-background/60 text-muted-foreground hover:border-primary hover:text-primary",
  category:
    "rounded-full border border-primary/30 bg-primary/5 text-primary/80 uppercase tracking-widest",
} as const;

const SIZE_STYLE = {
  sm: "px-2.5 py-1 text-2xs",
  md: "px-3 py-1 text-xs",
} as const;

export function Badge({
  children,
  variant = "tag",
  size = "sm",
  interactive = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANT_STYLE;
  size?: keyof typeof SIZE_STYLE;
  /** Set false (default) for purely informational chips — keeps cursor
   * as default rather than implying the chip is clickable. */
  interactive?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-mono transition-standard ${VARIANT_STYLE[variant]} ${SIZE_STYLE[size]} ${interactive ? "" : "cursor-default"} ${className}`}
    >
      {children}
    </span>
  );
}
