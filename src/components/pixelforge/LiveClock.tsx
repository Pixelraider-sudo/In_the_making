import { useEffect, useState } from "react";

/** Live UTC+3 (EAT) clock for the nav. */
export function LiveClock() {
  const [t, setT] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setT(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hidden md:inline-flex items-center gap-2 rounded border border-border bg-card px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      {t} <span className="text-primary/70">EAT</span>
    </span>
  );
}
