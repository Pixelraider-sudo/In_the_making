import { useEffect, useState } from "react";
import { DevMode } from "../../lib/dev-mode";
import { SystemLog } from "../../lib/system-log";
import { Hotkeys } from "../../lib/hotkeys";

type Log = {
  time: number;
  message: string;
  level: "info" | "ok" | "warn";
};

export function SystemHUD() {
  const [enabled, setEnabled] = useState(DevMode.isEnabled());
  const [logs, setLogs] = useState<Log[]>([]);
  const [lastKey, setLastKey] = useState<string>("—");

  useEffect(() => {
    // DevMode subscription
    const unsub = DevMode.subscribe(setEnabled);

    // capture hotkeys
    Hotkeys.onKey((key) => {
      setLastKey(key);
    });

    // poll logs (simple + safe for now)
    const interval = setInterval(() => {
      const all = SystemLog.getAll();
      setLogs(all.slice(-8));
    }, 500);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 rounded-lg border border-border bg-black/80 text-white backdrop-blur-md shadow-xl z-50">
      {/* header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className="text-xs font-semibold tracking-widest">SYSTEM HUD</span>
        <span className="text-xs text-green-400">DEV MODE ON</span>
      </div>

      {/* body */}
      <div className="p-3 space-y-2 text-xs font-mono">
        <div>
          <span className="text-gray-400">Last Key:</span>{" "}
          <span className="text-yellow-400">{lastKey}</span>
        </div>

        <div>
          <span className="text-gray-400">Boot:</span> <span className="text-green-400">OK</span>
        </div>

        <div className="mt-2">
          <span className="text-gray-400">Logs:</span>
          <div className="mt-1 space-y-1 max-h-32 overflow-hidden">
            {logs.map((log, i) => (
              <div key={i} className="text-[10px] opacity-80">
                [{log.level.toUpperCase()}] {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
