import { useEffect } from "react";

export function usePixelCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      "width:14px",
      "height:14px",
      "border:1px solid oklch(0.82 0.16 200)",
      "background:oklch(0.82 0.16 200 / 0.15)",
      "pointer-events:none",
      "z-index:9999",
      "transform:translate(-50%, -50%)",
      "transition:width .15s, height .15s, background .15s",
      "mix-blend-mode:screen",
    ].join(";");
    document.body.appendChild(el);
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,input,textarea,[role=button]");
      if (interactive) {
        el.style.width = "28px";
        el.style.height = "28px";
        el.style.background = "oklch(0.65 0.22 300 / 0.25)";
      } else {
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.background = "oklch(0.82 0.16 200 / 0.15)";
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      el.remove();
    };
  }, []);
}
