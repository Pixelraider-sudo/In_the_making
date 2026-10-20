import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  Command,
  CornerDownLeft,
  Maximize2,
  Minus,
  Terminal as TerminalIcon,
  X,
} from "lucide-react";

type Line = {
  kind: "in" | "out" | "sys" | "error";
  text: string;
};

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "github",
  "linkedin",
  "whoami",
  "neofetch",
  "date",
  "clear",
];

const RESPONSES: Record<string, string> = {
  help: `AVAILABLE COMMANDS

  about       About the engineer
  skills      Explore the current technology stack
  projects    View featured projects
  github      GitHub profile and repositories
  linkedin    Professional profile
  contact     Contact information
  whoami      Current session identity
  neofetch    Portfolio system overview
  date        Current local date and time
  clear       Clear the terminal

KEYBOARD SHORTCUTS

  ↑ / ↓       Browse command history
  Tab         Complete a command
  Ctrl + L    Clear terminal output
  Esc         Close terminal
  Ctrl + K    Open terminal (when enabled in the portfolio)`,

  about: `KIPKIRUI JOHN
Software Engineering Student · Zetech University

Focused on frontend engineering, thoughtful interfaces,
and building useful digital products.

Currently building:
  → Xentro Technologies
  → In the making — developer portfolio

Philosophy:
  Learn deliberately. Build consistently. Ship with intent.`,

  skills: `CURRENT WORKING STACK

  FRONTEND
  React · TypeScript · JavaScript · HTML · CSS

  UI ENGINEERING
  Tailwind CSS · Responsive Design · Framer Motion

  FRAMEWORKS & TOOLING
  Next.js · Vite · Git · GitHub · VS Code

  PRODUCT DEVELOPMENT
  API integration · Interactive interfaces · AI product experiences

Note: familiarity varies by technology. Explore the portfolio
for projects demonstrating the work.`,

  projects: `FEATURED PROJECTS

  01 / IN THE MAKING
      Personal engineering portfolio
      React · TypeScript · Vite

  02 / XENTRO TECHNOLOGIES
      Digital product and web development brand
      Next.js · React · TypeScript · Tailwind CSS

Use the Projects section on the page to explore available
project details, source code, and live demonstrations.`,

  contact: `LET'S CONNECT

  Email     kipkiruijohn814@gmail.com
  GitHub    github.com/Pixelraider-sudo
  LinkedIn  linkedin.com/in/kipkirui-john-aa31b941b

Interested in frontend engineering, collaboration,
and opportunities to build useful products.`,

  github: `GITHUB
  github.com/Pixelraider-sudo

Explore public repositories, project source code,
and ongoing engineering work.`,

  linkedin: `LINKEDIN
  linkedin.com/in/kipkirui-john-aa31b941b

Connect for professional opportunities and collaboration.`,

  whoami: `visitor@portfolio
Access level : Public visitor
Environment  : Browser session
Permissions  : Read-only portfolio exploration

You are exploring Kipkirui John's engineering portfolio.`,

  neofetch: `KIPKIRUI JOHN / ENGINEERING PROFILE

  OS          Web-based portfolio
  Identity    Software Engineer
  Education   Zetech University
  Focus       Frontend engineering
  Stack       React · TypeScript · Next.js
  Source      GitHub
  Theme       Navy / Amber
  Mode        Interactive terminal

This is portfolio information, not a live system diagnostic.`,
};

const INITIAL_LINES: Line[] = [
  {
    kind: "sys",
    text: "XENTRO? No. This is the personal engineering workspace.",
  },
  {
    kind: "sys",
    text: "KIPKIRUI JOHN / INTERACTIVE CONSOLE v1.0",
  },
  {
    kind: "sys",
    text: "Type `help` to explore. This terminal runs in your browser.",
  },
];

function getOutput(command: string): Line[] {
  const [name, ...args] = command.trim().toLowerCase().split(/\s+/);
  const argument = args.join(" ");

  if (name === "clear") return [];

  if (name === "date") {
    return [
      {
        kind: "out",
        text: new Date().toLocaleString(undefined, {
          dateStyle: "full",
          timeStyle: "medium",
        }),
      },
    ];
  }

  if (name === "open") {
    const destinations: Record<string, string> = {
      github: "https://github.com/Pixelraider-sudo",
      linkedin: "https://www.linkedin.com/in/kipkirui-john-aa31b941b/",
      portfolio: "https://in-the-making.vercel.app/",
      xentro: "https://xentrotechnologies.co.ke",
      email: "mailto:kipkiruijohn814@gmail.com",
    };

    if (destinations[argument]) {
      return [
        {
          kind: "sys",
          text: `Opening ${argument} in a new tab...`,
        },
        {
          kind: "out",
          text: destinations[argument],
        },
      ];
    }

    return [
      {
        kind: "error",
        text: `Unknown destination: ${argument || "(empty)"}\nTry: open github | linkedin | portfolio | xentro | email`,
      },
    ];
  }

  if (RESPONSES[name]) {
    return [{ kind: "out", text: RESPONSES[name] }];
  }

  if (!name) return [];

  return [
    {
      kind: "error",
      text: `Command not found: ${name}\nType 'help' to see available commands.`,
    },
  ];
}

export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<Line[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = input.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    const nextHistory = [...history, { kind: "in" as const, text: command }];

    setCommandHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);
    setInput("");

    if (normalized === "clear") {
      setHistory([]);
      return;
    }

    const output = getOutput(command);
    setHistory([...nextHistory, ...output]);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) return;

      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const query = input.trim().toLowerCase();
      if (!query) return;

      const matches = COMMANDS.filter((command) => command.startsWith(query));

      if (matches.length === 1) {
        setInput(`${matches[0]} `);
      } else if (matches.length > 1) {
        setHistory((previous) => [...previous, { kind: "sys", text: matches.join("    ") }]);
      }
    }

    if (event.key.toLowerCase() === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setHistory([]);
    }

    if (event.key === "c" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setInput("");
      setHistory((previous) => [...previous, { kind: "sys", text: "^C" }]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/75 p-2 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Interactive engineering terminal"
        className="flex h-[min(720px,92dvh)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-primary/30 bg-card font-mono text-xs shadow-[0_24px_100px_rgba(0,0,0,0.4)] sm:text-sm"
      >
        {/* Window chrome */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>

            <span className="hidden text-muted-foreground sm:inline">/</span>

            <div className="flex min-w-0 items-center gap-2">
              <TerminalIcon className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate text-foreground">kipkirui@portfolio:~</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <span className="mr-2 hidden items-center gap-1.5 text-[10px] text-muted-foreground sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              INTERACTIVE SESSION
            </span>

            <button
              type="button"
              onClick={() => setHistory([])}
              aria-label="Clear terminal output"
              title="Clear output"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Minus className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close terminal"
              title="Close terminal (Escape)"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Session metadata */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-background/30 px-4 py-2 text-[10px] text-muted-foreground sm:px-5">
          <span>SESSION / PUBLIC</span>
          <span className="flex items-center gap-2">
            <Command className="h-3 w-3" />
            BROWSER-BASED CONSOLE
          </span>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="mb-6">
            <p className="text-primary">KJ / ENGINEERING CONSOLE</p>
            <p className="mt-1 text-muted-foreground">A little deeper than the interface.</p>
          </div>

          <div className="space-y-3">
            {history.map((line, index) => (
              <div
                key={`${index}-${line.kind}`}
                className="whitespace-pre-wrap break-words leading-relaxed"
              >
                {line.kind === "in" ? (
                  <p className="text-foreground">
                    <span className="mr-2 text-primary">$</span>
                    {line.text}
                  </p>
                ) : (
                  <pre
                    className={`whitespace-pre-wrap break-words font-mono leading-relaxed ${
                      line.kind === "sys"
                        ? "text-muted-foreground"
                        : line.kind === "error"
                          ? "text-red-400"
                          : "text-foreground/90"
                    }`}
                  >
                    {line.text}
                  </pre>
                )}
              </div>
            ))}
          </div>

          <div aria-hidden="true" className="h-4" />
        </div>

        {/* Input */}
        <form
          onSubmit={submit}
          className="shrink-0 border-t border-border bg-background/70 px-4 py-4 sm:px-6"
        >
          <label
            htmlFor="engineering-terminal-input"
            className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            Command input
          </label>

          <div className="flex items-center gap-3">
            <span className="select-none text-primary">$</span>

            <input
              id="engineering-terminal-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type help to get started..."
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:ring-0"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Run command"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
            <span>↑↓ history · Tab autocomplete · Ctrl+L clear</span>
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3 w-3" />
              ESC to exit
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}
