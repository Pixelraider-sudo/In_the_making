import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

/** Cycles the primary accent (hue) — persisted in localStorage. */
const PALETTES = [
  { name: "cyan", primary: "oklch(0.82 0.16 200)", accent: "oklch(0.65 0.22 300)" },
  { name: "emerald", primary: "oklch(0.80 0.18 160)", accent: "oklch(0.70 0.20 200)" },
  { name: "rose", primary: "oklch(0.75 0.22 15)", accent: "oklch(0.70 0.22 320)" },
  { name: "amber", primary: "oklch(0.82 0.18 75)", accent: "oklch(0.70 0.22 30)" },
  { name: "violet", primary: "oklch(0.70 0.22 295)", accent: "oklch(0.82 0.16 200)" },
];

function apply(i: number) {
  const p = PALETTES[i];
  const r = document.documentElement.style;
  r.setProperty("--primary", p.primary);
  r.setProperty("--accent", p.accent);
  r.setProperty("--ring", p.primary);
  r.setProperty("--sidebar-primary", p.primary);
  r.setProperty("--cyan", p.primary);
  r.setProperty("--violet", p.accent);
  r.setProperty("--gradient-forge", `linear-gradient(135deg, ${p.primary}, ${p.accent})`);
}

export function ThemeSwitcher() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const saved = Number(localStorage.getItem("kj-theme") || 0) % PALETTES.length;
    setI(saved);
    apply(saved);
  }, []);
  const cycle = () => {
    const next = (i + 1) % PALETTES.length;
    setI(next);
    apply(next);
    localStorage.setItem("kj-theme", String(next));
  };
  return (
    <button
      onClick={cycle}
      title={`Theme: ${PALETTES[i].name}`}
      aria-label="Cycle theme color"
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary"
    >
      <Palette className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{PALETTES[i].name}</span>
    </button>
  );
}
