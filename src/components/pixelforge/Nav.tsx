import { LiveClock } from "./LiveClock";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { l: "environment", h: "#environment" },
  { l: "journey", h: "#journey" },
  { l: "identity", h: "#identity" },
  { l: "projects", h: "#projects" },
  { l: "skills", h: "#skills" },
  { l: "roadmap", h: "#roadmap" },
  { l: "devlog", h: "#devlog" },
  { l: "contact", h: "#contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.h.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 font-[Space_Grotesk] font-bold tracking-tight shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
              KJ
            </span>
            <span className="text-gradient-forge hidden sm:block">Kipkirui John</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.h.slice(1);
              return (
                <a
                  key={item.l}
                  href={item.h}
                  className={`relative rounded px-3 py-1.5 text-xs font-mono transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-card hover:text-primary"
                  }`}
                >
                  {item.l}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-3 rounded-full bg-primary" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <LiveClock />
            <ThemeSwitcher />
            <button
              onClick={onOpenTerminal}
              className="hidden sm:flex rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              _terminal
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute right-0 top-[49px] bottom-0 w-64 border-l border-border bg-background flex flex-col">
            <div className="flex-1 overflow-y-auto py-4">
              {/* Nav links */}
              <div className="px-4 mb-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  navigate
                </div>
                <ul className="space-y-1">
                  {[{ l: "hero", h: "#hero" }, ...NAV_ITEMS].map((item) => {
                    const isActive = active === item.h.slice(1);
                    return (
                      <li key={item.l}>
                        <a
                          href={item.h}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-mono transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-card hover:text-primary"
                          }`}
                        >
                          <span className="text-primary/50 text-[10px]">~/</span>
                          {item.l}
                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Terminal button in mobile */}
              <div className="px-4 border-t border-border pt-4">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenTerminal();
                  }}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors text-left"
                >
                  $ _terminal{" "}
                  <kbd className="float-right rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">
                    Ctrl K
                  </kbd>
                </button>
              </div>
            </div>

            {/* Mobile drawer footer */}
            <div className="border-t border-border px-4 py-3">
              <div className="text-[10px] font-mono text-muted-foreground/50">
                PIXELFORGE v2.0.0 · Build Beyond Limits
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
