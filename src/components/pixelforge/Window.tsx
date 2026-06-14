import { useEffect, useRef, useState } from "react";
import { WindowManager, WindowState } from "../../lib/window-manager";

export function Window({ win, children }: { win: WindowState; children: React.ReactNode }) {
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  /**
   * 🔥 FIX 1: prevent drag listeners from stacking / stale state
   */
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging) return;

      WindowManager.move(win.id, e.clientX - offset.current.x, e.clientY - offset.current.y);
    }

    function onUp() {
      setDragging(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, win.id]);

  /**
   * 🔥 FIX 2: do NOT block render when minimized (keep window visible but hidden content)
   * This prevents "ghost window disappearance confusion"
   */
  return (
    <div
      onMouseDown={() => WindowManager.focus(win.id)}
      style={{
        position: "absolute",
        top: win.y,
        left: win.x,
        zIndex: win.z,
      }}
      className="
        w-[620px]
        rounded-xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-2xl
        text-white
        font-mono
        overflow-hidden
        select-none
      "
    >
      {/* TITLE BAR */}
      <div
        className="
          flex items-center justify-between
          px-3 py-2
          border-b border-white/10
          bg-white/5
          backdrop-blur-xl
          cursor-move
        "
        onMouseDown={(e) => {
          setDragging(true);

          offset.current = {
            x: e.clientX - win.x,
            y: e.clientY - win.y,
          };
        }}
      >
        {/* traffic lights */}
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <span className="text-xs opacity-70">{win.title}</span>

        <button
          onClick={() => WindowManager.toggleMinimize(win.id)}
          className="text-xs opacity-70 hover:opacity-100"
        >
          _
        </button>
      </div>

      {/* CONTENT */}
      <div
        className="p-3 text-green-300"
        style={{
          display: win.minimized ? "none" : "block",
        }}
      >
        {children}
      </div>
    </div>
  );
}
