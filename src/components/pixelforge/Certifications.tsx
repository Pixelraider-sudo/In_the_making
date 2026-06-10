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

// Add your certificates here
const seed: Cert[] = [
  {
    title: "Add your first certificate",
    issuer: "Issuer name",
    date: "YYYY",
    note: "Replace this entry inside src/components/pixelforge/Certifications.tsx — or use the + button to draft new ones in-session.",
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

    setDraft({
      title: "",
      issuer: "",
      date: "",
      url: "",
      note: "",
    });

    setOpen(false);
  };

  // ✅ FIX: strongly typed keys instead of "any"
  const fields: (keyof Cert)[] = ["title", "issuer", "date", "url", "note"];

  return (
    <Section
      id="certifications"
      tag="vault :: /certs"
      title={
        <>
          Certifications & <span className="text-gradient-forge">credentials</span>.
        </>
      }
      intro="A growing vault of certificates, courses, and proof-of-skill artifacts."
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="text-xs font-mono text-muted-foreground">
          {items.length} entr{items.length === 1 ? "y" : "ies"} on file
        </div>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary"
        >
          <Plus className="h-3.5 w-3.5" /> add cert
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <article
            key={`${c.title}-${i}`}
            className="group relative rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {c.date || "—"}
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold leading-snug text-foreground">{c.title}</h3>

            <div className="mt-1 text-xs font-mono text-primary">{c.issuer}</div>

            {c.note && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
            )}

            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                verify <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </article>
        ))}
      </div>

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
              {fields.map((k) => (
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
            </div>

            <button
              onClick={add}
              className="mt-5 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)]"
            >
              Add to vault
            </button>

            <p className="mt-3 text-[10px] text-muted-foreground">
              Note: in-session only. To persist, add the entry to the <code>seed</code> array in{" "}
              <code>Certifications.tsx</code>.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
