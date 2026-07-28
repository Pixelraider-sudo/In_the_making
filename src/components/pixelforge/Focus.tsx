import { Section } from "./Section";
import { StatusDot, type StatusTone } from "./ui/StatusDot";

const items = [
  {
    p: "0x01",
    t: "Phase 2 frontend polish — richer hero, real project data, no more placeholders across the entire portfolio.",
    status: "active",
  },
  {
    p: "0x02",
    t: "Expanding the PIXELFORGE AI division — building new AI-powered tools, exploring tool use and multi-turn agent patterns.",
    status: "active",
  },
  {
    p: "0x03",
    t: "Backend depth — deepening Node.js + PostgreSQL proficiency, Auth systems (JWT + OAuth), and REST best practices.",
    status: "active",
  },
  {
    p: "0x04",
    t: "Terminal section build — interactive CLI experience for the portfolio with real commands, easter eggs, and ASCII art.",
    status: "queued",
  },
  {
    p: "0x05",
    t: "Open to client work — SaaS MVPs, full-stack builds, and AI feature integrations. Available for contracts and internships.",
    status: "open",
  },
  {
    p: "0x06",
    t: "Building in public — weekly DevLog updates, GitHub commits, and documenting the full engineering journey transparently.",
    status: "ongoing",
  },
];

const STATUS_TONE: Record<string, StatusTone> = {
  active: "success",
  queued: "warning",
  open: "info",
  ongoing: "neutral",
};

const STATUS_LABEL: Record<string, string> = {
  active: "running",
  queued: "queued",
  open: "open",
  ongoing: "ongoing",
};

export function Focus() {
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
        {/* Process header */}
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <span className="text-3xs uppercase tracking-widest text-muted-foreground">process</span>
          <span className="text-3xs uppercase tracking-widest text-muted-foreground">task</span>
          <span className="text-3xs uppercase tracking-widest text-muted-foreground">status</span>
        </div>

        {items.map((i) => (
          <div
            key={i.p}
            className="flex gap-4 py-2.5 border-b border-border/30 last:border-0 items-start"
          >
            <span className="text-primary shrink-0 w-10">{i.p}</span>
            <span className="text-foreground/90 flex-1 leading-relaxed">{i.t}</span>
            <StatusDot
              label={STATUS_LABEL[i.status]}
              tone={STATUS_TONE[i.status]}
              size="sm"
              className="shrink-0"
            />
          </div>
        ))}

        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
          <span>
            status: <span className="text-green-400">running</span>
          </span>
          <span>
            pid: <span className="text-primary">1</span>
          </span>
          <span>
            uptime: <span className="text-primary">building since 2022</span>
          </span>
          <span>
            daemon: <span className="text-primary">pixelforge.v2</span>
          </span>
        </div>
      </div>
    </Section>
  );
}
