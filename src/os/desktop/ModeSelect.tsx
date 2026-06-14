import { useOSStore } from "../store";

export function ModeSelect() {
  const setMode = useOSStore(
    (s: { setMode: (mode: "boot" | "select" | "website" | "os") => void }) => s.setMode,
  );

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white font-mono">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-green-400">PixelOS System</h1>

        <p className="text-gray-400">Choose your environment</p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setMode("website")}
            className="px-6 py-3 border border-white hover:bg-white hover:text-black transition"
          >
            Website Mode
          </button>

          <button
            onClick={() => setMode("os")}
            className="px-6 py-3 border border-green-500 hover:bg-green-500 hover:text-black transition"
          >
            Terminal OS
          </button>
        </div>

        <p className="text-xs text-gray-600">Shared portfolio kernel data source</p>
      </div>
    </div>
  );
}
