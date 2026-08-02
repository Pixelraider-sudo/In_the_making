import { Section } from "./Section";
import { Button } from "./ui/Button";

const EDUCATION = [
  {
    title: "Zetech University",
    subtitle: "B.Sc. Software Engineering (in progress)",
    description:
      "Building product-ready frontend systems, app interfaces, and modern web solutions while refining engineering practice and system design.",
  },
  {
    title: "Modcom Institute of Technology",
    subtitle: "Web & App Development",
    description:
      "Gained hands-on skills in React, Flask, UI/UX design, and practical app development while delivering real client-facing projects.",
  },
];

const CONTACT_POINTS = [
  { label: "Country", value: "Kenya" },
  { label: "City", value: "Nairobi" },
  { label: "Email", value: "kipkiruijohn@gmail.com" },
  { label: "Availability", value: "Open for new work" },
];

export function Experience() {
  return (
    <Section
      id="experience"
      tag="education :: /credentials"
      title={
        <>
          Education <span className="text-gradient-forge">& contact</span>
        </>
      }
      intro="A snapshot of where I’m learning and how to reach me for new product work."
    >
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {EDUCATION.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.3em] text-primary">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-7 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
          <div className="mb-6 text-sm uppercase tracking-[0.3em] text-slate-500">Contact information</div>
          <div className="grid gap-4">
            {CONTACT_POINTS.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-base font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button href="#contact" variant="primary" size="sm">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
 