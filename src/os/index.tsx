import { useOSStore } from "./store";
import { BootScreen } from "./boot/BootScreen";
import { Desktop } from "./desktop/Desktop";

/**
 * PixelOS Kernel Router
 * boot → select → website → os (desktop)
 */

export default function OS() {
  const mode = useOSStore((s) => s.mode);

  // ======================
  // BOOT SCREEN
  // ======================
  if (mode === "boot") {
    return <BootScreen />;
  }

  // ======================
  // DESKTOP ENVIRONMENT
  // ======================
  if (mode === "os") {
    return <Desktop />;
  }

  // ======================
  // FALLBACK
  // ======================
  return (
    <div className="text-white bg-black h-screen flex items-center justify-center">
      Unknown OS state: {mode}
    </div>
  );
}
