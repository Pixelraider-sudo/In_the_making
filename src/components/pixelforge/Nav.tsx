import { LiveClock } from "./LiveClock";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const items = [
    { l: "journey", h: "#journey" },
    { l: "identity", h: "#identity" },
    { l: "projects", h: "#projects" },
    { l: "roadmap", h: "#roadmap" },
    { l: "skills", h: "#skills" },
    { l: "contact", h: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/60 backdrop-blur-xl">
      {/* ambient glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* BRAND */}
        <a
          href="#hero"
          className="group flex items-center gap-2 font-[Space_Grotesk] font-bold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-xs transition-all group-hover:scale-105 group-hover:shadow-[var(--shadow-glow)]">
            KJ
          </span>

          <span className="text-gradient-forge transition-colors group-hover:opacity-90">
            Kipkirui John
          </span>
        </a>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((i) => (
            <a
              key={i.l}
              href={i.h}
              className="
                relative rounded-md px-3 py-1.5
                text-xs font-mono text-muted-foreground
                transition-all duration-300
                hover:text-primary hover:bg-card/60
                hover:shadow-[0_0_20px_rgba(255,170,80,0.08)]
              "
            >
              {i.l}

              {/* subtle hover underline glow */}
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2">
          <LiveClock />
          <ThemeSwitcher />

          <button
            onClick={onOpenTerminal}
            className="
              group rounded-md border border-border
              bg-card/60 px-3 py-1.5
              text-xs font-mono text-muted-foreground
              backdrop-blur transition-all duration-300
              hover:border-primary/40
              hover:text-primary
              hover:shadow-[var(--shadow-glow)]
              hover:-translate-y-0.5
            "
          >
            _terminal
            <span className="ml-2 opacity-50 group-hover:opacity-100">⌘K</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
