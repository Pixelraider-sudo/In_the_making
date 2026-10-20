// import { Github, Linkedin, ExternalLink, Terminal as TerminalIcon, Download } from "lucide-react";
// import { Button } from "./ui/Button";
// import { Badge } from "./ui/Badge";
// import { useEngineeringMode } from "@/lib/engineering-mode";

// const SKILLS = [
//   "React",
//   "TypeScript",
//   "JavaScript",
//   "Next.js",
//   "HTML & CSS",
//   "Tailwind CSS",
//   "Vite",
//   "Git & GitHub",
// ];

// export function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
//   const { enabled: engineeringMode } = useEngineeringMode();

//   return (
//     <section
//       id="hero"
//       aria-labelledby="hero-title"
//       className="relative overflow-hidden border-b border-border"
//       style={{ background: "var(--gradient-glow)" }}
//     >
//       {/* Decorative background */}
//       <div aria-hidden="true" className="absolute inset-0 scanlines pointer-events-none" />

//       <div
//         aria-hidden="true"
//         className="absolute inset-0 pointer-events-none opacity-20"
//         style={{
//           backgroundImage:
//             "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
//           backgroundSize: "40px 40px",
//         }}
//       />

//       <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-32 md:pb-28">
//         <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
//           {/* Profile */}
//           <div className="mx-auto flex shrink-0 flex-col items-center gap-3 md:mx-0">
//             <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/50 shadow-[var(--shadow-glow)] md:h-44 md:w-44">
//               <img
//                 src="/profile.jpg"
//                 alt="Portrait of Kipkirui John"
//                 className="h-full w-full object-cover"
//                 fetchPriority="high"
//               />

//               <div
//                 aria-hidden="true"
//                 className="absolute inset-0 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
//               />
//             </div>

//             <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-label font-mono uppercase text-green-400">
//               <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-400" />
//               Open to opportunities
//             </span>
//           </div>

//           {/* Introduction */}
//           <div className="min-w-0 flex-1 text-center md:text-left">
//             <div className="mb-5 flex items-center justify-center gap-2 text-overline uppercase text-muted-foreground md:justify-start">
//               <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
//               <span>Software Engineering · Nairobi, Kenya</span>
//             </div>

//             <h1 id="hero-title" className="font-[Space_Grotesk] text-display-xl tracking-tight">
//               Kipkirui <span className="text-gradient-forge">John</span>
//               <br />
//               <span className="text-display-lg text-foreground/80">Software Engineer</span>
//             </h1>

//             <p className="mt-4 font-mono text-sm text-primary md:text-base">
//               Frontend Development · React · TypeScript · Next.js
//             </p>

//             <p className="mt-6 max-w-prose text-body-lg text-muted-foreground">
//               I build thoughtful, responsive web experiences with a focus on clean interfaces,
//               maintainable code, and practical solutions. I'm growing my engineering skills by
//               building real projects, including{" "}
//               <a
//                 href="https://xentrotechnologies.co.ke"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="font-medium text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
//               >
//                 Xentro Technologies
//               </a>
//               .
//             </p>

//             {/* Primary actions */}
//             <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
//               <Button href="#projects" variant="primary">
//                 Explore my work
//                 <ExternalLink
//                   aria-hidden="true"
//                   className="h-4 w-4 transition-standard group-hover:translate-x-0.5"
//                 />
//               </Button>

//               <Button href="/resume.pdf" download variant="secondary">
//                 <Download aria-hidden="true" className="h-4 w-4" />
//                 Download CV
//               </Button>

//               {engineeringMode && (
//                 <Button onClick={onOpenTerminal} variant="outline">
//                   <TerminalIcon aria-hidden="true" className="h-4 w-4" />
//                   _terminal
//                   <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 text-3xs text-muted-foreground">
//                     Ctrl K
//                   </kbd>
//                 </Button>
//               )}
//             </div>

//             {/* Professional profiles */}
//             <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
//               <Button
//                 href="https://github.com/Pixelraider-sudo"
//                 target="_blank"
//                 rel="noreferrer"
//                 variant="outline"
//                 size="icon"
//                 aria-label="GitHub profile"
//               >
//                 <Github aria-hidden="true" className="h-4 w-4" />
//               </Button>

//               <Button
//                 href="https://www.linkedin.com/in/kipkirui-john-aa31b941b/"
//                 target="_blank"
//                 rel="noreferrer"
//                 variant="outline"
//                 size="icon"
//                 aria-label="LinkedIn profile"
//               >
//                 <Linkedin aria-hidden="true" className="h-4 w-4" />
//               </Button>

//               <a
//                 href="mailto:kipkiruijohn814@gmail.com"
//                 className="px-2 py-2 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
//               >
//                 Get in touch
//               </a>
//             </div>

//             {/* Verified technology focus */}
//             <div className="mt-10 border-t border-border/70 pt-6">
//               <p className="mb-3 text-label uppercase tracking-wider text-muted-foreground">
//                 Technologies I work with
//               </p>

//               <div className="flex flex-wrap justify-center gap-2 md:justify-start">
//                 {SKILLS.map((skill) => (
//                   <Badge key={skill} variant="tag" size="sm">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import {
  Github,
  Linkedin,
  ExternalLink,
  Terminal as TerminalIcon,
  Download,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { useEngineeringMode } from "@/lib/engineering-mode";

const SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "HTML & CSS",
  "Tailwind CSS",
  "Vite",
  "Git & GitHub",
];

export function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { enabled: engineeringMode } = useEngineeringMode();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-w-0 overflow-hidden border-b border-border"
      style={{ background: "var(--gradient-glow)" }}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scanlines"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* Profile */}
          <div className="flex min-w-0 flex-col items-center gap-3 lg:items-start">
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-2 border-primary/50 shadow-[var(--shadow-glow)] sm:h-40 sm:w-40 lg:h-44 lg:w-44">
              <img
                src="/profile.jpg"
                alt="Portrait of Kipkirui John"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
              />
            </div>

            <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-center text-label font-mono uppercase text-green-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"
              />
              Open to opportunities
            </span>
          </div>

          {/* Introduction */}
          <div className="min-w-0 text-center lg:text-left">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-overline uppercase text-muted-foreground lg:justify-start">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-primary"
              />
              <span>Software Engineering · Nairobi, Kenya</span>
            </div>

            <h1
              id="hero-title"
              className="font-[Space_Grotesk] text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.05] tracking-tight"
            >
              Kipkirui <span className="text-gradient-forge">John</span>
              <br />
              <span className="text-[clamp(1.8rem,3.7vw,3.25rem)] text-foreground/80">
                Software Engineer
              </span>
            </h1>

            <p className="mt-4 break-words font-mono text-sm text-primary sm:text-base">
              Frontend Development · React · TypeScript · Next.js
            </p>

            <p className="mx-auto mt-6 max-w-prose text-body-lg text-muted-foreground lg:mx-0">
              I build thoughtful, responsive web experiences with a focus on
              clean interfaces, maintainable code, and practical solutions.
              I'm growing my engineering skills by building real projects,
              including{" "}
              <a
                href="https://xentrotechnologies.co.ke"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
              >
                Xentro Technologies
              </a>
              .
            </p>

            {/* Primary actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button href="#projects" variant="primary">
                Explore my work
                <ExternalLink
                  aria-hidden="true"
                  className="h-4 w-4 transition-standard group-hover:translate-x-0.5"
                />
              </Button>

              <Button href="/resume.pdf" download variant="secondary">
                <Download aria-hidden="true" className="h-4 w-4" />
                Download CV
              </Button>

              {engineeringMode && (
                <Button onClick={onOpenTerminal} variant="outline">
                  <TerminalIcon aria-hidden="true" className="h-4 w-4" />
                  _terminal
                  <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 text-3xs text-muted-foreground">
                    Ctrl K
                  </kbd>
                </Button>
              )}
            </div>

            {/* Professional profiles */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button
                href="https://github.com/Pixelraider-sudo"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="icon"
                aria-label="GitHub profile"
              >
                <Github aria-hidden="true" className="h-4 w-4" />
              </Button>

              <Button
                href="https://www.linkedin.com/in/kipkirui-john-aa31b941b/"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="icon"
                aria-label="LinkedIn profile"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
              </Button>

              <a
                href="mailto:kipkiruijohn814@gmail.com"
                className="px-2 py-2 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Get in touch
              </a>
            </div>

            {/* Technology focus */}
            <div className="mt-10 border-t border-border/70 pt-6">
              <p className="mb-3 text-label uppercase tracking-wider text-muted-foreground">
                Technologies I work with
              </p>

              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {SKILLS.map((skill) => (
                  <Badge key={skill} variant="tag" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
