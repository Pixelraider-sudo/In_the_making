import { useState } from "react";
import { useOSStore } from "../os/store";

export function BootSelector() {
  const setMode = useOSStore((s) => s.setMode);

  const [loading, setLoading] = useState<null | "website" | "os">(null);

  const handleSelect = (mode: "website" | "os") => {
    setLoading(mode);

    // fake boot animation delay
    setTimeout(() => {
      setMode(mode);
    }, 1600);
  };

  return (
    <div className="w-full h-screen bg-black text-green-400 flex flex-col items-center justify-center font-mono">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Pixel System Loader</h1>
        <p className="text-sm text-green-600 mt-2">Choose environment to initialize</p>
      </div>

      {/* Options */}
      <div className="flex gap-6">
        {/* WEBSITE MODE */}
        <button
          onClick={() => handleSelect("website")}
          className="border border-green-500 px-6 py-4 hover:bg-green-900 transition rounded-md"
        >
          🌐 Website Mode
        </button>

        {/* OS MODE */}
        <button
          onClick={() => handleSelect("os")}
          className="border border-green-500 px-6 py-4 hover:bg-green-900 transition rounded-md"
        >
          💻 OS Mode
        </button>
      </div>

      {/* LOADING ANIMATION */}
      {loading && (
        <div className="mt-10 text-center animate-pulse">
          <p>Booting {loading.toUpperCase()}...</p>
          <p className="text-xs text-green-600 mt-2">Initializing modules, syncing portfolio...</p>
        </div>
      )}
    </div>
  );
}
