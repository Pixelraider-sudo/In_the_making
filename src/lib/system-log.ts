type LogLevel = "info" | "ok" | "warn";

type LogEntry = {
  time: number;
  message: string;
  level: LogLevel;
};

const logs: LogEntry[] = [];

export const SystemLog = {
  add(message: string, level: LogLevel = "info") {
    logs.push({
      time: Date.now(),
      message,
      level,
    });
  },

  getAll() {
    return logs;
  },

  clear() {
    logs.length = 0;
  },

  bootSequence() {
    this.add("Hydrating React app...", "info");
    this.add("Loading UI system...", "info");
    this.add("Injecting styles...", "ok");
    this.add("System ready.", "ok");
  },
};
