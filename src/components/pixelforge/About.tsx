import { Section } from "./Section";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

const SERVICES = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites built with React, TypeScript and scalable frontend systems for high-impact digital products.",
  },
  {
    title: "App Development",
    description:
      "Product-ready app interfaces with clean UX, polished navigation, and performance-first delivery for web and mobile.",
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive interfaces and clear interaction systems that help users move confidently through your product.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      tag="services :: /offerings"
      title={
        <>
          My <span className="text-gradient-forge">services</span>
        </>
      }
      intro="A focused set of frontend and product services designed to launch polished, modern digital experiences."
    >
      <div className="marquee">
        <div className="marquee-track" aria-hidden="false">
          {SERVICES.concat(SERVICES).map((service, idx) => (
            <div key={`${service.title}-${idx}`} className="marquee-item rounded-[2rem] border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.description}</p>
              <Button href="#contact" variant="outline" size="sm" className="mt-6">
                Hire now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
 