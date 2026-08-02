import { Section } from "./Section";
import { Button } from "./ui/Button";
import { ExternalLink, Github } from "lucide-react";

const TECH_STACK = ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"];

export function FeaturedProject() {
  return (
    <Section
      id="featured"
      tag="featured project"
<<<<<<< HEAD
      title={
        <>
          Xentro <span className="text-gradient-forge">Technologies</span>
        </>
      }
=======
      title={<>Xentro <span className="text-gradient-forge">Technologies</span></>}
>>>>>>> def13e7176bd68c3746aaa908cd5ce3b9ca2dded
      intro="A featured build that puts product storytelling, trust signals, and lead conversion front and center."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <p className="text-body-lg text-slate-700">
<<<<<<< HEAD
            A high-conversion IT services website with a polished homepage, clear service
            breakdowns, and a contact flow designed to turn visitors into clients.
=======
            A high-conversion IT services website with a polished homepage, clear service breakdowns, and a contact flow designed to turn visitors into clients.
>>>>>>> def13e7176bd68c3746aaa908cd5ce3b9ca2dded
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
<<<<<<< HEAD
            <Button
              href="https://xentro-technologies.vercel.app/"
              target="_blank"
              rel="noreferrer"
              variant="primary"
            >
              Live <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              href="https://github.com/Pixelraider-sudo/Xentro-Technologies"
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
=======
            <Button href="https://xentro-technologies.vercel.app/" target="_blank" rel="noreferrer" variant="primary">
              Live <ExternalLink className="h-4 w-4" />
            </Button>
            <Button href="https://github.com/Pixelraider-sudo/Xentro-Technologies" target="_blank" rel="noreferrer" variant="outline">
>>>>>>> def13e7176bd68c3746aaa908cd5ce3b9ca2dded
              <Github className="h-4 w-4" /> Code
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-xl">
          <img
            src="/images/projects/xentro.png"
            alt="Xentro Technologies website preview"
            className="h-[420px] w-full object-cover object-center md:h-[500px]"
          />
        </div>
      </div>
    </Section>
  );
}
