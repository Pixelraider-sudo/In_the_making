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
    <nav className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a
          href="#hero"
          className="flex items-center gap-2 font-[Space_Grotesk] font-bold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-xs">
            KJ
          </span>
          <span className="text-gradient-forge">Kipkirui John</span>
        </a>
        <div className="hidden gap-1 md:flex">
          {items.map((i) => (
            <a
              key={i.l}
              href={i.h}
              className="rounded px-3 py-1.5 text-xs font-mono text-muted-foreground hover:bg-card hover:text-primary"
            >
              {i.l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LiveClock />
          <ThemeSwitcher />
          <button
            onClick={onOpenTerminal}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary"
          >
            _terminal
          </button>
        </div>
      </div>
    </nav>
  );
}
