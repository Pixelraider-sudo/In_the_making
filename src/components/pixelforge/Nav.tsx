import { useState } from "react";
import { LiveClock } from "./LiveClock";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [open, setOpen] = useState(false);

  const items = [
    { l: "journey", h: "#journey" },
    { l: "identity", h: "#identity" },
    { l: "projects", h: "#projects" },
    { l: "roadmap", h: "#roadmap" },
    { l: "skills", h: "#skills" },
    { l: "contact", h: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* BRAND */}
        <a href="#hero" className="flex items-center gap-2 font-[Space_Grotesk] font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-xs">
            KJ
          </span>

          <span className="text-gradient-forge hidden sm:block">Kipkirui John</span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-1">
          {items.map((i) => (
            <a
              key={i.l}
              href={i.h}
              className="rounded-md px-3 py-2 text-xs font-mono text-muted-foreground transition hover:text-primary hover:bg-card/60"
            >
              {i.l}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LiveClock />
          </div>

          <ThemeSwitcher />

          <button
            onClick={onOpenTerminal}
            className="hidden sm:block rounded-md border border-border bg-card/60 px-3 py-2 text-xs font-mono hover:text-primary hover:border-primary/40 transition"
          >
            _terminal
          </button>

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-md border border-border px-3 py-2"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col bg-background/95 backdrop-blur-xl">
          {items.map((i) => (
            <a
              key={i.l}
              href={i.h}
              onClick={() => setOpen(false)}
              className="px-6 py-4 text-sm border-b border-border hover:bg-card/60 hover:text-primary transition"
            >
              {i.l}
            </a>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              onOpenTerminal();
            }}
            className="m-4 rounded-md border border-primary px-4 py-3 text-sm hover:bg-primary hover:text-black transition"
          >
            Open Terminal
          </button>
        </div>
      </div>
    </nav>
  );
}
