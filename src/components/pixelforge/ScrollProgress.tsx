import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "top" },
  { id: "environment", label: "env" },
  { id: "journey", label: "journey" },
  { id: "identity", label: "identity" },
  { id: "projects", label: "projects" },
  { id: "roadmap", label: "roadmap" },
  { id: "skills", label: "skills" },
  { id: "achievements", label: "achv" },
  { id: "certifications", label: "certs" },
  { id: "focus", label: "focus" },
  { id: "devlog", label: "devlog" },
  { id: "contact", label: "contact" },
];

export function ScrollProgress() {
  const [p, setP] = useState(0);
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
        <div
          className="h-full transition-[width] duration-75"
          style={{ width: `${p}%`, background: "var(--gradient-forge)" }}
        />
      </div>

      {/* Side dot navigator — desktop only */}
      <div
        className={`fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              className="group relative flex items-center justify-end gap-2"
            >
              {/* Label tooltip */}
              <span
                className={`text-[9px] font-mono uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-primary translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-muted-foreground translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {label}
              </span>

              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? "h-2.5 w-2.5 bg-primary shadow-[0_0_8px_var(--cyan)]"
                    : "h-1.5 w-1.5 bg-border group-hover:bg-primary/60"
                }`}
              />
            </a>
          );
        })}

        {/* % label at bottom */}
        <div className="mt-1 text-right text-[9px] font-mono text-muted-foreground/50">
          {Math.round(p)}%
        </div>
      </div>
    </>
  );
}
