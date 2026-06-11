import { Section } from "./Section";
import { useState } from "react";
import { Award, Plus, ExternalLink, X } from "lucide-react";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  note?: string;
};

const seed: Cert[] = [
  {
    title: "Add your first certificate",
    issuer: "Issuer name",
    date: "YYYY",
    note: "Replace this entry or use + to add credentials in-session.",
  },
];

export function Certifications() {
  const [items, setItems] = useState<Cert[]>(seed);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Cert>({
    title: "",
    issuer: "",
    date: "",
    url: "",
    note: "",
  });

  const add = () => {
    if (!draft.title.trim()) return;
    setItems((prev) => [{ ...draft }, ...prev]);
    setDraft({ title: "", issuer: "", date: "", url: "", note: "" });
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
      intro="A structured vault of verified learning milestones and skill proofs."
    >
      {/* HEADER */}
      <div className="mb-12 flex items-center justify-between">
        <div className="text-xs font-mono text-muted-foreground tracking-wide">
          {items.length} entr{items.length === 1 ? "y" : "ies"} recorded
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            group inline-flex items-center gap-2
            rounded-lg border border-border/70
            bg-card/40 backdrop-blur-md
            px-3 py-1.5 text-xs font-mono
            text-muted-foreground transition-all duration-300
            hover:-translate-y-0.5 hover:border-primary/30
            hover:text-primary hover:shadow-[var(--shadow-glow)]
          "
        >
          <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
          add credential
        </button>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <article
            key={`${c.title}-${i}`}
            className="
              group relative overflow-hidden rounded-2xl
              border border-border/70 bg-card/40 backdrop-blur-md
              p-6 transition-all duration-300
              hover:-translate-y-1 hover:border-primary/30
              hover:shadow-[var(--shadow-glow)]
            "
          >
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl" />
            </div>

            <div className="relative">
              {/* top row */}
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition">
                  <Award className="h-5 w-5" />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {c.date || "—"}
                </span>
              </div>

              {/* title */}
              <h3 className="mt-5 text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {c.title}
              </h3>

              {/* issuer */}
              <div className="mt-1 text-xs font-mono text-primary/90">{c.issuer}</div>

              {/* note */}
              {c.note && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground opacity-85 group-hover:opacity-100 transition">
                  {c.note}
                </p>
              )}

              {/* link */}
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-5 inline-flex items-center gap-1.5
                    text-xs text-primary
                    transition hover:underline
                  "
                >
                  verify credential <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-md p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              w-full max-w-md rounded-2xl
              border border-border/70 bg-card/80 backdrop-blur-xl
              p-6 shadow-[var(--shadow-glow)]
              animate-fadeUp
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Add credential</h3>

              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* form */}
            <div className="space-y-4 font-mono text-sm">
              {(["title", "issuer", "date", "url", "note"] as const).map((k) => (
                <label key={k} className="block">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </span>

                  <input
                    value={(draft as any)[k] ?? ""}
                    onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
                    className="
                        mt-1 w-full rounded-md
                        border border-border
                        bg-background/60 px-3 py-2
                        text-sm text-foreground
                        outline-none transition
                        focus:border-primary focus:ring-1 focus:ring-primary/30
                      "
                    placeholder={k === "url" ? "https://..." : ""}
                  />
                </label>
              ))}
            </div>

            {/* action */}
            <button
              onClick={add}
              className="
                mt-6 w-full rounded-md
                bg-primary px-4 py-2
                text-sm font-semibold text-primary-foreground
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-[var(--shadow-glow)]
              "
            >
              Add to vault
            </button>

            <p className="mt-3 text-[10px] text-muted-foreground leading-relaxed">
              Stored in session only. Persist manually in <code className="text-primary">seed</code>
              .
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
