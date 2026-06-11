import type { ReactNode } from "react";

export function Section({
  id,
  tag,
  title,
  intro,
  children,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative border-b border-border">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* TAG */}
        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
          <span className="h-px w-10 bg-primary/60" />
          <span className="font-mono">{tag}</span>
        </div>

        {/* TITLE */}
        <h2 className="font-[Space_Grotesk] text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          {title}
        </h2>

        {/* INTRO */}
        {intro && (
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed text-base md:text-lg">
            {intro}
          </p>
        )}

        {/* CONTENT */}
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
