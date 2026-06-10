import { Section } from "./Section";

export function Focus() {
  const items = [
    { p: "0x01", t: "Shipping the PIXELFORGE ecosystem — modular, beautiful, expandable." },
    { p: "0x02", t: "Expanding into full-stack — Node, Express, PostgreSQL." },
    { p: "0x03", t: "Studying system design and clean architecture." },
    { p: "0x04", t: "Documenting the journey in public — repo + devlog." },
  ];
  return (
    <Section
      id="focus"
      tag="proc :: /now"
      title={
        <>
          Currently <span className="text-gradient-forge">executing</span>.
        </>
      }
    >
      <div className="rounded-lg border border-border bg-card p-6 font-mono text-sm">
        {items.map((i) => (
          <div key={i.p} className="flex gap-4 py-2">
            <span className="text-primary">{i.p}</span>
            <span className="text-foreground/90">{i.t}</span>
          </div>
        ))}
        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          status: <span className="text-primary">running</span> · pid 1 · pixelforge.daemon
        </div>
      </div>
    </Section>
  );
}
