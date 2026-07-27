import { Section } from "./Section";
import { Award, Flame, Sprout, Trophy, Cpu, Zap } from "lucide-react";

const badges = [
  {
    icon: Sprout,
    title: "Discipline forged early",
    lore: "Years of boarding school taught me to show up, plan, and execute — daily. Described by teachers as 'self-disciplined, polite, and ever-ready to compete.' That mindset now drives my engineering practice.",
    earned: true,
  },
  {
    icon: Flame,
    title: "Self-taught momentum",
    lore: "Built full React + TypeScript fluency outside of the classroom while studying at Zetech University. The personal repo grew faster than the syllabus — because real learning happens when you ship.",
    earned: true,
  },
  {
    icon: Cpu,
    title: "AI-native engineer",
    lore: "Integrated the Anthropic API into a live production dashboard — streaming responses, prompt routing across 10 categories, and markdown rendering — before most developers I know have tried an LLM call.",
    earned: true,
  },
  {
    icon: Trophy,
    title: "Solo full-stack delivery",
    lore: "Delivered a 13-file production rental platform for Sperian Studios solo — landing page, listings, detail views, Node/Express REST API, PostgreSQL schema, M-Pesa + Stripe payments — all to deadline.",
    earned: true,
  },
  {
    icon: Zap,
    title: "PIXELFORGE founded",
    lore: "Launched a personal technology ecosystem with 9 active divisions (Dev, AI, Labs, Security, Cloud, Mobile, Community, Garage, Media) and the tagline 'Build Beyond Limits.' Part company, part laboratory.",
    earned: true,
  },
  {
    icon: Award,
    title: "Hackathon · incoming",
    lore: "Next competitive milestone. Targeting team hackathons and open-source sprints to test engineering under pressure and deadline. Slot reserved — certificate landing soon.",
    earned: false,
    pending: true,
  },
];

export function Achievements() {
  return (
    <Section
      id="achievements"
      tag="achv :: /unlocked"
      title={
        <>
          Badges with <span className="text-gradient-forge">lore</span>.
        </>
      }
      intro="Hover any badge to read the story behind it. Five earned, one incoming."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className={`group relative rounded-lg border bg-card p-5 transition-all hover:-translate-y-1 ${
                b.pending
                  ? "border-dashed border-border"
                  : "border-border hover:border-primary hover:shadow-[var(--shadow-glow)]"
              }`}
            >
              {/* Earned indicator */}
              {b.earned && !b.pending && (
                <span className="absolute top-4 right-4 text-[10px] font-mono text-primary/60 uppercase tracking-widest">
                  ✓ earned
                </span>
              )}
              {b.pending && (
                <span className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                  ○ pending
                </span>
              )}

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-md ${
                  b.pending
                    ? "border border-dashed border-border text-muted-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                } transition-colors`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {b.lore}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
