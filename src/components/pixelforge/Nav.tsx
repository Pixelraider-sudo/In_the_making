import { useEffect, useState } from "react";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/Button";
import { Switch } from "./ui/Switch";
import { useEngineeringMode } from "@/lib/engineering-mode";

const NAV_ITEMS = [
  { l: "Projects", h: "#projects" },
  { l: "Skills", h: "#skills" },
  { l: "GitHub", h: "#github" },
  { l: "Contact", h: "#contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", ...NAV_ITEMS.map((item) => item.h.slice(1))];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { enabled: engineeringMode, toggle: toggleEngineeringMode } = useEngineeringMode();

  // Lock background scrolling while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Close the drawer when switching to desktop.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Allow Escape to close the mobile drawer.
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Fixed navigation */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 top-0 z-50 h-20 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl"
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:gap-6 lg:px-10 xl:px-12">
          {/* Portfolio brand */}
          <a
            href="#hero"
            aria-label="Kipkirui John — home"
            onClick={() => setMobileOpen(false)}
            className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-[Space_Grotesk] text-base font-bold text-primary transition-standard group-hover:border-primary/60 group-hover:bg-primary/15">
              KJ
            </span>

            <span className="hidden flex-col gap-1 sm:flex">
              <span className="font-[Space_Grotesk] text-base font-bold tracking-tight text-foreground transition-standard group-hover:text-primary lg:text-lg">
                Kipkirui John
              </span>

              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                Software Engineer
              </span>
            </span>
          </a>

          {/* Primary desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            <a
              href="#hero"
              aria-current={active === "hero" ? "location" : undefined}
              className={`relative whitespace-nowrap rounded-lg px-3 py-3 font-mono text-sm transition-standard xl:px-4 ${
                active === "hero"
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              Home
              {active === "hero" && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </a>

            {NAV_ITEMS.map((item) => {
              const isActive = active === item.h.slice(1);

              return (
                <a
                  key={item.h}
                  href={item.h}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative whitespace-nowrap rounded-lg px-3 py-3 font-mono text-sm transition-standard xl:px-4 ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {item.l}

                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Theme and engineering controls */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="hidden xl:block">
              <Switch checked={engineeringMode} onChange={toggleEngineeringMode} label="eng mode" />
            </div>

            <ThemeSwitcher />

            {engineeringMode && (
              <Button
                onClick={onOpenTerminal}
                variant="outline"
                size="sm"
                className="hidden h-10 px-3 font-mono xl:flex"
              >
                <TerminalIcon className="mr-2 h-4 w-4" />
                Terminal
              </Button>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-foreground transition-standard hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-background/75 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute bottom-0 right-0 top-20 flex w-[min(88vw,380px)] flex-col border-l border-border bg-background shadow-2xl"
          >
            <div className="border-b border-border px-6 py-5">
              <p className="font-[Space_Grotesk] text-lg font-bold text-foreground">Navigation</p>

              <p className="mt-1 text-sm text-muted-foreground">Explore my portfolio</p>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain py-5">
              <div className="px-5">
                <p className="mb-3 px-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Explore
                </p>

                <ul className="space-y-1.5">
                  {[{ l: "Home", h: "#hero" }, ...NAV_ITEMS].map((item) => {
                    const isActive = active === item.h.slice(1);

                    return (
                      <li key={item.h}>
                        <a
                          href={item.h}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive ? "location" : undefined}
                          className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 font-mono text-sm transition-standard ${
                            isActive
                              ? "border-primary/20 bg-primary/10 font-semibold text-primary"
                              : "border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                          }`}
                        >
                          <span className="text-primary/60">~/</span>
                          <span className="flex-1">{item.l}</span>

                          {isActive && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Mobile engineering controls */}
              <div className="mx-5 mt-6 border-t border-border pt-5">
                <p className="mb-4 px-1 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Preferences
                </p>

                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <Switch
                    checked={engineeringMode}
                    onChange={toggleEngineeringMode}
                    label="Engineering mode"
                  />

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Toggle additional engineering controls.
                  </p>
                </div>
              </div>

              {/* Terminal shortcut */}
              {engineeringMode && (
                <div className="mx-5 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenTerminal();
                    }}
                    className="flex min-h-12 w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left font-mono text-sm text-foreground transition-standard hover:border-primary hover:bg-primary/5"
                  >
                    <span>
                      <TerminalIcon className="mr-2 inline h-4 w-4" />
                      Open terminal
                    </span>

                    <kbd className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
                      Ctrl K
                    </kbd>
                  </button>
                </div>
              )}
            </div>

            {/* Portfolio footer */}
            <div className="border-t border-border bg-card/30 px-6 py-4">
              <p className="text-sm font-semibold text-foreground">Kipkirui John</p>

              <p className="mt-1 text-xs text-muted-foreground">Software Engineering Portfolio</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
