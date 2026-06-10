import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Line = { kind: "in" | "out" | "sys"; text: string };

const responses: Record<string, string> = {
  help: "available commands:\n  about     who is behind PIXELFORGE\n  skills    list current stack\n  projects  feature project\n  contact   how to reach me\n  whoami    identity check\n  clear     wipe the buffer",
  about:
    "PIXELFORGE — software engineering student at Zetech University.\nBuilding systems, learning in public, shipping with intent.",
  skills:
    "frontend  : React · TypeScript · Vite\nstyling   : TailwindCSS\ntools     : Git · GitHub · Vercel\nlearning  : Node · Databases · System design",
  projects:
    "* PIXELFORGE — developer ecosystem (React + TS + Vite)\n  status: live · expansion: full-stack",
  contact:
    "email   : hello@pixelforge.dev\ngithub  : github.com/pixelforge\nlinkedin: linkedin.com/in/pixelforge",
  whoami: "guest@pixelforge ~ growth-mode developer",
};

export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<Line[]>([
    { kind: "sys", text: "PIXELFORGE shell v0.1 — type `help` to begin." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const next: Line[] = [...history, { kind: "in", text: input }];
    if (cmd === "clear") {
      setHistory([{ kind: "sys", text: "buffer cleared." }]);
    } else if (responses[cmd]) {
      setHistory([...next, { kind: "out", text: responses[cmd] }]);
    } else {
      setHistory([...next, { kind: "out", text: `command not found: ${cmd}\ntry 'help'` }]);
    }
    setInput("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/60 backdrop-blur p-4 md:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-primary/40 bg-card font-mono text-sm shadow-[var(--shadow-violet)]"
      >
        <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-2 text-xs text-muted-foreground">
          <span>guest@pixelforge ~ /_terminal</span>
          <button onClick={onClose} className="hover:text-primary" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-4">
          {history.map((l, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap leading-relaxed font-mono ${l.kind === "in" ? "text-foreground" : l.kind === "sys" ? "text-muted-foreground" : "text-primary"}`}
            >
              {l.kind === "in" ? `$ ${l.text}` : l.text}
            </pre>
          ))}
          <div ref={endRef} />
        </div>
        <form
          onSubmit={submit}
          className="flex items-center gap-2 border-t border-border bg-background/60 px-4 py-3"
        >
          <span className="text-primary">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a command…"
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="caret text-primary">▍</span>
        </form>
      </div>
    </div>
  );
}
