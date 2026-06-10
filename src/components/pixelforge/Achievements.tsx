import { Section } from "./Section";
import { Award, Flame, Sprout, Trophy } from "lucide-react";

const badges = [
  {
    icon: Sprout,
    title: "Discipline forged early",
    lore: "Years of boarding school taught me to show up, plan, and execute — daily.",
  },
  {
    icon: Flame,
    title: "Self-taught momentum",
    lore: "Built fluency in React + TypeScript outside class. The repo grew faster than the syllabus.",
  },
  {
    icon: Award,
    title: "GitSync Hackathon",
    lore: "Placeholder: first team collaboration under pressure. Certificate landing soon.",
    pending: true,
  },
  {
    icon: Trophy,
    title: "Future · open slot",
    lore: "Reserved for the next milestone — hackathon, certification, shipped product.",
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
      intro="Hover any badge to read the story behind it."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className={`group relative rounded-lg border bg-card p-5 transition-all hover:-translate-y-1 ${b.pending ? "border-dashed border-border" : "border-border hover:border-primary"}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-md ${b.pending ? "border border-dashed border-border text-muted-foreground" : "bg-primary/10 text-primary"}`}
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
