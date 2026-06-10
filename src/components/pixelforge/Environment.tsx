import { Section } from "./Section";
import { FolderTree, Globe, Network, Database, TerminalSquare } from "lucide-react";

const cards = [
  {
    icon: FolderTree,
    label: "filesystem",
    title: "About / Journey",
    body: "Tenwek → Chavakali → Zetech. Every directory built on the last.",
    href: "#journey",
  },
  {
    icon: Globe,
    label: "browser",
    title: "Projects",
    body: "PIXELFORGE — a living developer ecosystem, growing in public.",
    href: "#projects",
  },
  {
    icon: Database,
    label: "database",
    title: "Skills",
    body: "React, TypeScript, Vite, Tailwind. Indexing backend & system design next.",
    href: "#skills",
  },
  {
    icon: Network,
    label: "network",
    title: "Contact",
    body: "Open a socket. Email, GitHub, LinkedIn — collaboration encouraged.",
    href: "#contact",
  },
  {
    icon: TerminalSquare,
    label: "terminal",
    title: "_console",
    body: "Hit Ctrl + K. Try `help`, `skills`, `projects`, `about`.",
    href: "#hero",
  },
];

export function Environment() {
  return (
    <Section
      id="environment"
      tag="env :: /pixelforge"
      title={
        <>
          The developer <span className="text-gradient-forge">environment</span>.
        </>
      }
      intro="Not pages — modules. Each card is a process in the PIXELFORGE workspace."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">~/{c.label}</span>
                <span className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              <div className="mt-6 text-xs font-mono text-muted-foreground group-hover:text-primary">
                $ open --module {c.label}
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
