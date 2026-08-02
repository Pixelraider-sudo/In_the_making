import { useEffect, useState } from "react";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Listens for the Konami code; triggers a rainbow hue-rotate sweep. */
export function KonamiEgg() {
  const [hot, setHot] = useState(false);
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-CODE.length);
      if (
        buf.length === CODE.length &&
        buf.every((k, i) => k.toLowerCase() === CODE[i].toLowerCase())
      ) {
        setHot(true);
        setTimeout(() => setHot(false), 5000);
        buf = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.documentElement.style.transition = "filter .4s";
    document.documentElement.style.filter = hot ? "hue-rotate(360deg) saturate(1.4)" : "";
    if (hot) {
      let h = 0;
      const id = setInterval(() => {
        h = (h + 24) % 360;
        document.documentElement.style.filter = `hue-rotate(${h}deg) saturate(1.4)`;
      }, 80);
      return () => {
        clearInterval(id);
        document.documentElement.style.filter = "";
      };
    }
  }, [hot]);
  if (!hot) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[70] mx-auto w-fit rounded-full border border-primary/40 bg-card px-4 py-1.5 font-mono text-xs text-primary shadow-[var(--shadow-violet)]">
      ↑↑↓↓←→←→BA · cheat mode engaged
    </div>
  );
}
