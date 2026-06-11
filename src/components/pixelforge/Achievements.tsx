import { Section } from "./Section";
import { Award, Flame, Sprout, Trophy } from "lucide-react";
import { CountUp } from "./CountUp";

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
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { n: 15, s: "+", l: "Projects built" },
          { n: 300, s: "+", l: "Hours coding" },
          { n: 25, s: "+", l: "Technologies" },
          { n: 1000, s: "+", l: "Commits" },
        ].map((k) => (
          <div key={k.l} className="glass rounded-xl p-5 hover-lift">
            <div className="text-3xl md:text-4xl font-bold text-gradient-forge font-[Space_Grotesk]">
              <CountUp to={k.n} suffix={k.s} />
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {k.l}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className={`group relative rounded-xl p-5 hover-lift ${b.pending ? "border border-dashed border-border bg-card/40" : "glass"}`}
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
