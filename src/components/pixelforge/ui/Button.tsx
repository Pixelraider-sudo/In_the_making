import { Loader2 } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button — the one button implementation for the app.
 *
 * Before this, every CTA (hero, nav, project cards, case studies) was a
 * hand-rolled `<a>`/`<button>` with its own one-off padding, radius, and
 * hover treatment — five near-identical variants with small inconsistencies
 * between them. This component is the single source of truth: pick a
 * `variant` + `size`, everything else (focus ring, disabled state, loading
 * state, hover/press timing) is handled consistently.
 *
 * Renders an <a> when `href` is provided, a <button> otherwise — so it
 * works equally well as a real link (external URLs, downloads, in-page
 * anchors) or an action trigger (opening the terminal, submitting a form).
 */

const VARIANT_STYLE = {
  primary:
    "bg-primary text-primary-foreground hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] disabled:hover:scale-100 disabled:hover:shadow-none",
  secondary:
    "border border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
  outline:
    "border border-border bg-card/60 text-foreground backdrop-blur hover:border-primary hover:text-primary",
  ghost: "text-muted-foreground hover:bg-card hover:text-primary",
} as const;

const SIZE_STYLE = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-md",
  md: "px-5 py-3 text-sm gap-2 rounded-md",
  icon: "h-11 w-11 rounded-md justify-center",
} as const;

type Variant = keyof typeof VARIANT_STYLE;
type Size = keyof typeof SIZE_STYLE;

type SharedProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `group inline-flex items-center font-semibold transition-standard disabled:pointer-events-none disabled:opacity-50 ${VARIANT_STYLE[variant]} ${SIZE_STYLE[size]} ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={classes} aria-busy={loading || undefined} {...anchorRest}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button
      className={classes}
      disabled={loading || buttonRest.disabled}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
