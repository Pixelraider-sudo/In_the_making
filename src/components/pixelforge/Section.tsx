import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove("section-animate");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.07 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="section-animate border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary mb-4">
          <span className="h-px w-8 bg-primary" />
          {tag}
        </div>
        <h2 className="font-[Space_Grotesk] text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
