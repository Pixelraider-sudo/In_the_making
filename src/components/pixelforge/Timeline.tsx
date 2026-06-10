import { Section } from "./Section";
import { GraduationCap, School, BookOpen } from "lucide-react";

const nodes = [
  {
    year: "2015 — 2019",
    place: "Tenwek Boarding Primary School",
    role: "Primary Education",
    note: "My academic journey began at Tenwek Boarding Primary School, where I built a strong foundation both intellectually and personally. In my Primary Leaving Certificate, I was described as “good in academics and ever ready to compete with others when given the chance,” reflecting my natural drive for excellence and healthy competition from an early age. My conduct was praised as “polite, humble, and self-disciplined,” with the ability to relate well with others and actively participate in co-curricular activities. These formative years shaped my confidence, curiosity, and willingness to challenge myself — traits that still drive me in technical fields today.",
    icon: School,
  },
  {
    year: "2020 — 2023",
    place: "Chavakali High School",
    role: "High School Education",
    note: "At Chavakali High School my character and academic focus became more refined. The school described me as “a well-behaved, focused, hardworking, and obedient student of good academic ability.” During this period my interest in technology and coding began to take shape — I grew curious about how systems work and how software solves real-world problems. I explored programming with dedication while maintaining strong relationships with peers and teachers. These years transformed my natural academic ability into a clear direction toward programming and innovation.",
    icon: BookOpen,
  },
  {
    year: "2024 — Present",
    place: "Zetech University",
    role: "Bachelor of Software Engineering",
    note: "In August 2024 I joined Zetech University to pursue a Bachelor of Software Engineering — a step that aligns perfectly with my passion for technology and problem-solving. This phase marks my transition from foundational learning into professional specialization: coding, system design, and software development. I'm actively building practical projects, exploring UI/UX ideas, designing systems, and sharpening my programming abilities. My aspiration is to be the best as I continue learning and diving into software development.",
    icon: GraduationCap,
    active: true,
  },
];

export function Timeline() {
  return (
    <Section
      id="journey"
      tag="filesystem :: /journey"
      title={
        <>
          The path that <span className="text-gradient-forge">compiled</span> me.
        </>
      }
      intro="A growth log — from boarding school discipline to building software ecosystems."
    >
      <ol className="relative space-y-10 border-l border-dashed border-border pl-8">
        {nodes.map((n) => {
          const Icon = n.icon;
          return (
            <li key={n.place} className="relative">
              <span
                className={`absolute -left-[42px] flex h-9 w-9 items-center justify-center rounded-md border ${
                  n.active
                    ? "border-primary bg-primary/10 text-primary animate-pulse-glow"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {n.year}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-foreground">{n.role}</h3>
              <div className="text-sm text-primary font-mono">{n.place}</div>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                {n.note}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
