import { useCallback, useMemo, useState } from "react";
import { TerminalEngine } from "../core/terminalEngine";

/**
 * ================================
 * useTerminal Hook (CLEAN VERSION)
 * ================================
 */

export type TerminalLine = {
  type: "input" | "output";
  value: string;
};

export function useTerminal() {
  // ======================
  // ENGINE (SINGLE INSTANCE)
  // ======================
  const engine = useMemo(() => {
    return TerminalEngine.buildDefaultEngine();
  }, []);

  // ======================
  // UI STATE
  // ======================
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", value: "PixelOS Terminal initialized..." },
    { type: "output", value: "Type 'help' to begin." },
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ======================
  // PRINT (optional future extension)
  // ======================
  const print = useCallback((text: string) => {
    setLines((prev) => [...prev, { type: "output", value: text }]);
  }, []);

  // ======================
  // CLEAR
  // ======================
  const clear = useCallback(() => {
    setLines([]);
  }, []);

  // ======================
  // EXECUTE COMMAND
  // ======================
  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      // show user input
      setLines((prev) => [...prev, { type: "input", value: cmd }]);

      // history
      setHistory((prev) => [cmd, ...prev].slice(0, 50));
      setHistoryIndex(-1);

      // RUN ENGINE (FIXED)
      engine.execute(trimmed);

      // SYNC BUFFER → UI
      const buffer = engine.getBuffer();
      const last = buffer[buffer.length - 1];

      if (last) {
        setLines((prev) => [...prev, { type: "output", value: last }]);
      }

      setInput("");
    },
    [engine],
  );

  // ======================
  // HISTORY UP
  // ======================
  const historyUp = useCallback(() => {
    if (historyIndex + 1 < history.length) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    }
  }, [history, historyIndex]);

  // ======================
  // HISTORY DOWN
  // ======================
  const historyDown = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else {
      setHistoryIndex(-1);
      setInput("");
    }
  }, [history, historyIndex]);

  return {
    lines,
    input,
    setInput,
    execute,
    historyUp,
    historyDown,
    clear,
  };
}
