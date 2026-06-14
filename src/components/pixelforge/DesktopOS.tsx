import { useEffect, useState } from "react";
import { WindowManager, WindowState } from "../../lib/window-manager";
import { Window } from "./Window";
import { TerminalOS } from "./TerminalOS";
import { BootScreen } from "./BootScreen";

export function DesktopOS() {
  console.log("🖥️ DesktopOS RENDER");

  const [windows, setWindows] = useState<WindowState[]>([]);
  const [booting, setBooting] = useState<boolean>(true);

  // =========================
  // MOUNT / WINDOW SYSTEM INIT
  // =========================
  useEffect(() => {
    console.log("⚙️ DesktopOS MOUNTED");

    if (booting) return;

    console.log("🚀 Boot finished → initializing window system");

    WindowManager.create("terminal", "Terminal");

    const unsub = WindowManager.subscribe((w: WindowState[]) => {
      console.log("🪟 Window update:", w);
      setWindows([...w]);
    });

    return () => {
      console.log("🧹 DesktopOS cleanup");
      unsub();
    };
  }, [booting]);

  // =========================
  // BOOT COMPLETE HANDLER
  // =========================
  const handleBootComplete = () => {
    console.log("✅ BootScreen completed → switching desktop");
    setBooting(false);
  };

  // =========================
  // BOOT PHASE
  // =========================
  if (booting) {
    console.log("⏳ Rendering BootScreen");

    // FIX: BootScreen does NOT accept props
    return <BootScreen />;
  }

  // =========================
  // DESKTOP UI
  // =========================
  console.log("🖥️ Rendering Desktop UI");

  return (
    <div className="h-screen w-screen overflow-hidden text-white relative bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* glass overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/5" />

      {/* WINDOWS */}
      {windows.map((w: WindowState) => (
        <Window key={w.id} win={w}>
          {w.id === "terminal" && <TerminalOS />}
        </Window>
      ))}

      {/* TASKBAR */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-2xl border-t border-white/10 flex items-center px-4 text-white justify-between">
        <button
          onClick={() => {
            console.log("🎯 Focus terminal clicked");
            WindowManager.focus("terminal");
          }}
          className="px-3 py-1 rounded-md hover:bg-white/10 transition"
        >
          Terminal
        </button>

        <div className="text-xs opacity-60">PixelOS • Developer Edition</div>
      </div>
    </div>
  );
}
