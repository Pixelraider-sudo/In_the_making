import { useEffect, useRef, useState, useCallback } from "react";
import { TerminalEngine } from "../core/terminalEngine";

/**
 * ================================
 * TerminalApp (ENGINE WIRED VERSION)
 * ================================
 */

type Line = {
  type: "input" | "output";
  value: string;
};

export function TerminalApp() {
  const engineRef = useRef<TerminalEngine | null>(null);

  const [lines, setLines] = useState<Line[]>([
    { type: "output", value: "PixelOS Terminal Engine online..." },
    { type: "output", value: "Type 'help' to list commands." },
  ]);

  const [input, setInput] = useState("");

  // =========================
  // INIT ENGINE ONCE
  // =========================
  useEffect(() => {
    engineRef.current = TerminalEngine.buildDefaultEngine();
  }, []);

  // =========================
  // PRINT HOOK (ENGINE → UI)
  // =========================
  const print = useCallback((text: string) => {
    setLines((prev) => [...prev, { type: "output", value: text }]);
  }, []);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  // =========================
  // RUN COMMAND
  // =========================
  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || !engineRef.current) return;

    // show user input
    setLines((prev) => [...prev, { type: "input", value: raw }]);

    // execute engine (FIXED API)
    engineRef.current.execute(trimmed);

    // sync engine buffer → UI
    const buffer = engineRef.current.getBuffer();
    const last = buffer[buffer.length - 1];

    if (last) {
      setLines((prev) => [...prev, { type: "output", value: last }]);
    }

    setInput("");
  }, []);

  // =========================
  // KEY HANDLER
  // =========================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#000",
        color: "#00ff88",
        fontFamily: "monospace",
        padding: "8px",
      }}
    >
      {/* OUTPUT */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          fontSize: "12px",
          paddingBottom: "8px",
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <span style={{ color: "#22c55e" }}>$ {line.value}</span>
            ) : (
              <span>{line.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", gap: "6px" }}>
        <span style={{ color: "#22c55e" }}>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#00ff88",
            fontFamily: "monospace",
          }}
          autoFocus
        />
      </div>
    </div>
  );
}
