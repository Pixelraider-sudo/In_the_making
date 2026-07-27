import { Section } from "./Section";
import { useState } from "react";
import { Award, Plus, ExternalLink, X, Lock } from "lucide-react";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  note?: string;
  category: "course" | "platform" | "university" | "achievement";
};

const seed: Cert[] = [
  {
    title: "Bachelor of Software Engineering",
    issuer: "Zetech University",
    date: "2024 — ongoing",
    note: "Active degree programme. Coursework covering algorithms, system design, databases, networking, and software architecture.",
    category: "university",
  },
  {
    title: "React + TypeScript Full Course",
    issuer: "Self-directed · freeCodeCamp + official docs",
    date: "2023",
    note: "Completed structured curriculum covering React 18 hooks, TypeScript generics, component patterns, and state management. Applied directly to PIXELFORGE production builds.",
    category: "course",
  },
  {
    title: "Anthropic API & Prompt Engineering",
    issuer: "Anthropic Documentation + Build",
    date: "2024",
    note: "Hands-on mastery of the Anthropic claude-sonnet-4-6 API — streaming, structured outputs, system prompts, tool use. Delivered live AI Command Center as proof-of-work.",
    category: "platform",
  },
  {
    title: "Full-Stack Node.js + Express + PostgreSQL",
    issuer: "Self-directed · The Odin Project + client delivery",
    date: "2024",
    note: "Completed backend curriculum and validated via production delivery of the Sperian Studios rental platform — real client, real deadline, real M-Pesa and Stripe integrations.",
    category: "course",
  },
  {
    title: "Git & GitHub Advanced Workflows",
    issuer: "GitHub Learning Lab",
    date: "2023",
    note: "Branching strategies, pull request workflows, GitHub Actions CI/CD, protected branches, and monorepo patterns.",
    category: "platform",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2022",
    url: "https://freecodecamp.org",
    note: "Foundational certification covering HTML, CSS, accessibility, and responsive layouts. First formal credential — the starting block.",
    category: "platform",
  },
  {
    title: "KCSE Certificate",
    issuer: "Chavakali High School · KNEC",
    date: "2023",
    note: "Kenya Certificate of Secondary Education. Described by school as 'a well-behaved, hardworking student of good academic ability.' Direct pipeline to Zetech Software Engineering.",
    category: "university",
  },
];

const CATEGORY_COLOR: Record<Cert["category"], string> = {
  course: "border-primary/40 bg-primary/5 text-primary",
  platform: "border-violet-500/40 bg-violet-500/5 text-violet-400",
  university: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400",
  achievement: "border-green-500/40 bg-green-500/5 text-green-400",
};

export function Certifications() {
  const [items, setItems] = useState<Cert[]>(seed);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Cert>({
    title: "",
    issuer: "",
    date: "",
    url: "",
    note: "",
    category: "course",
  });

  const add = () => {
    if (!draft.title.trim()) return;
    setItems((prev) => [{ ...draft }, ...prev]);
    setDraft({ title: "", issuer: "", date: "", url: "", note: "", category: "course" });
    setOpen(false);
  };

  return (
    <Section
      id="certifications"
      tag="vault :: /certs"
      title={
        <>
          Certifications & <span className="text-gradient-forge">credentials</span>.
        </>
      }
      intro="A growing vault — university coursework, platform certificates, and proof-of-work deliverables."
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="text-xs font-mono text-muted-foreground">
          {items.length} entr{items.length === 1 ? "y" : "ies"} on file
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> add cert
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <article
            key={`${c.title}-${i}`}
            className="group relative rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Award className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {c.date || "—"}
                </span>
                <span
                  className={`rounded border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest ${CATEGORY_COLOR[c.category]}`}
                >
                  {c.category}
                </span>
              </div>
            </div>

            <h3 className="mt-4 text-base font-semibold leading-snug text-foreground">{c.title}</h3>
            <div className="mt-1 text-xs font-mono text-primary">{c.issuer}</div>

            {c.note && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
            )}

            {c.url ? (
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                verify <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/40">
                <Lock className="h-3 w-3" /> no url on file
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Add modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-border bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Draft new certificate</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 font-mono text-sm">
              {(["title", "issuer", "date", "url", "note"] as const).map((k) => (
                <label key={k} className="block">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </span>
                  <input
                    value={draft[k] ?? ""}
                    onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                    placeholder={k === "url" ? "https://… (optional)" : ""}
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  category
                </span>
                <select
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as Cert["category"] })
                  }
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value="course">course</option>
                  <option value="platform">platform</option>
                  <option value="university">university</option>
                  <option value="achievement">achievement</option>
                </select>
              </label>
            </div>
            <button
              onClick={add}
              className="mt-5 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)]"
            >
              Add to vault
            </button>
            <p className="mt-3 text-[10px] text-muted-foreground">
              In-session only. To persist, add to the <code className="text-primary">seed</code>{" "}
              array in <code>Certifications.tsx</code>.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
