import { Section } from "./Section";
import { Award, Flame, Sprout, Trophy } from "lucide-react";
import { CountUp } from "./CountUp";

const badges = [
  {
    icon: Sprout,
    title: "Discipline forged early",
    lore: "Years of structure and consistency built the foundation for everything I create today.",
  },
  {
    icon: Flame,
    title: "Self-taught momentum",
    lore: "Built strong React + TypeScript fluency outside class through continuous building.",
  },
  {
    icon: Award,
    title: "GitSync Hackathon",
    lore: "First real-world team collaboration under pressure. Certificate pending verification.",
    pending: true,
  },
  {
    icon: Trophy,
    title: "Future milestone slot",
    lore: "Reserved for the next major win — shipped product, award, or breakthrough.",
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
      intro="Each metric reflects a real step in the building journey."
    >
      {/* STATS */}
      <div className="mb-14 grid grid-cols-2 gap-5 md:grid-cols-4">
        {[
          { n: 15, s: "+", l: "Projects built" },
          { n: 300, s: "+", l: "Hours coding" },
          { n: 25, s: "+", l: "Technologies used" },
          { n: 1000, s: "+", l: "Commits made" },
        ].map((k) => (
          <div
            key={k.l}
            className="
              group relative overflow-hidden rounded-2xl
              border border-border/70 bg-card/40 backdrop-blur-md
              p-6 transition-all duration-300
              hover:-translate-y-1 hover:border-primary/30
              hover:shadow-[var(--shadow-glow)]
            "
          >
            {/* soft ambient glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="text-3xl md:text-4xl font-bold text-gradient-forge font-[Space_Grotesk] tracking-tight">
                <CountUp to={k.n} suffix={k.s} />
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {k.l}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BADGES */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => {
          const Icon = b.icon;

          return (
            <div
              key={b.title}
              className={`
                group relative overflow-hidden rounded-2xl p-6
                transition-all duration-300
                hover:-translate-y-1 hover:border-primary/30
                hover:shadow-[var(--shadow-glow)]
                ${
                  b.pending
                    ? "border border-dashed border-border bg-card/30"
                    : "border border-border/70 bg-card/50 backdrop-blur-md"
                }
              `}
            >
              {/* glow layer */}
              {!b.pending && (
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -inset-12 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl" />
                </div>
              )}

              {/* icon */}
              <div
                className={`
                  relative flex h-12 w-12 items-center justify-center rounded-md transition-all
                  ${
                    b.pending
                      ? "border border-dashed border-border text-muted-foreground"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* title */}
              <h3 className="mt-5 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {b.title}
              </h3>

              {/* lore */}
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground opacity-85 group-hover:opacity-100 transition-opacity">
                {b.lore}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
