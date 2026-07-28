import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Engineering Mode — a visitor-facing toggle (default OFF) that gates the
 * "developer candy" features called out in the Phase Ω review: the
 * terminal, the Konami code easter egg, and the live clock.
 *
 * Off by default: first-time visitors get the clean, focused experience.
 * Once toggled on (and remembered via localStorage), the engineering
 * extras become available for people who specifically want to poke at
 * them — recruiters and engineers who dig a little deeper.
 *
 * This is distinct from `lib/dev-mode.ts`, which is an internal,
 * `import.meta.env.DEV`-gated debug overlay that never ships to
 * production at all. Engineering Mode is a real, permanent product
 * feature; dev-mode.ts is a local debugging aid that doesn't exist
 * in the production bundle.
 */

const STORAGE_KEY = "pf-engineering-mode";

type EngineeringModeContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const EngineeringModeContext = createContext<EngineeringModeContextValue | null>(null);

export function EngineeringModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "1") setEnabled(true);
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <EngineeringModeContext.Provider value={{ enabled, toggle }}>
      {children}
    </EngineeringModeContext.Provider>
  );
}

export function useEngineeringMode() {
  const ctx = useContext(EngineeringModeContext);
  if (!ctx) {
    throw new Error("useEngineeringMode must be used within an EngineeringModeProvider");
  }
  return ctx;
}
