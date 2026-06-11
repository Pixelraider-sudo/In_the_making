import { Section } from "./Section";
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Music2,
  Download,
  ArrowUpRight,
} from "lucide-react";

export function Contact() {
  const links = [
    {
      icon: Mail,
      label: "email",
      value: "kipkiruijohn@example.com",
      href: "mailto:kipkiruijohn@example.com",
    },
    {
      icon: Github,
      label: "github",
      value: "github.com/your-username",
      href: "https://github.com/your-username",
    },
    {
      icon: Linkedin,
      label: "linkedin",
      value: "linkedin.com/in/your-handle",
      href: "https://linkedin.com/in/your-handle",
    },
    {
      icon: MessageCircle,
      label: "whatsapp",
      value: "+254 7XX XXX XXX",
      href: "https://wa.me/2547XXXXXXXX",
    },
    {
      icon: Facebook,
      label: "facebook",
      value: "facebook.com/your-handle",
      href: "https://facebook.com/your-handle",
    },
    {
      icon: Instagram,
      label: "instagram",
      value: "@your-handle",
      href: "https://instagram.com/your-handle",
    },
    {
      icon: Music2,
      label: "tiktok",
      value: "@your-handle",
      href: "https://tiktok.com/@your-handle",
    },
    {
      icon: Twitter,
      label: "twitter/x",
      value: "@your-handle",
      href: "https://twitter.com/your-handle",
    },
  ];

  return (
    <Section
      id="contact"
      tag="net :: /open-socket"
      title={
        <>
          Open a <span className="text-gradient-forge">socket</span>.
        </>
      }
      intro="Collaborations, mentorship, internships, or anything worth building together."
    >
      {/* CTA */}
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <a
          href="/resume.pdf"
          download
          className="
            group inline-flex items-center gap-2
            rounded-lg bg-primary px-5 py-2.5
            text-sm font-semibold text-primary-foreground
            transition-all duration-300
            hover:scale-[1.03]
            hover:shadow-[var(--shadow-glow)]
          "
        >
          <Download className="h-4 w-4" />
          Download résumé
          <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        <span className="text-[11px] font-mono text-muted-foreground">
          drop CV at <code className="text-primary">public/resume.pdf</code>
        </span>
      </div>

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {links.map((l) => {
          const Icon = l.icon;

          return (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="
                group relative overflow-hidden
                rounded-xl border border-border/60
                bg-card/40 backdrop-blur-xl
                p-5 transition-all duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-[var(--shadow-glow)]
              "
            >
              {/* glow layer */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              </div>

              {/* header */}
              <div className="relative flex items-center gap-3 text-primary">
                <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {l.label}
                </span>
              </div>

              {/* value */}
              <div className="relative mt-3 font-mono text-sm text-foreground break-all transition-colors group-hover:text-primary">
                {l.value}
              </div>

              {/* arrow hint */}
              <div className="absolute right-4 top-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
