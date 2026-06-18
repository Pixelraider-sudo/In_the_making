import { Section } from "./Section";
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Download,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";

// ─── UPDATE THESE WITH YOUR REAL INFO ───────────────────────────────────────
const CONTACT_INFO = {
  email: "kipkiruijohn@gmail.com", // ← your real email
  github: "github.com/Kipkirui-John",
  githubUrl: "https://github.com/Kipkirui-John",
  linkedin: "linkedin.com/in/kipkirui-john",
  linkedinUrl: "https://linkedin.com/in/kipkirui-john",
  whatsapp: "+254 XXX XXX XXX", // ← your real number
  whatsappUrl: "https://wa.me/254XXXXXXXXX",
  location: "Nairobi, Kenya",
  timezone: "EAT (UTC+3)",
};
// ────────────────────────────────────────────────────────────────────────────

const PRIMARY_LINKS = [
  {
    icon: Mail,
    label: "email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    preferred: true,
  },
  {
    icon: Github,
    label: "github",
    value: CONTACT_INFO.github,
    href: CONTACT_INFO.githubUrl,
    preferred: true,
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: CONTACT_INFO.linkedin,
    href: CONTACT_INFO.linkedinUrl,
    preferred: true,
  },
  {
    icon: MessageCircle,
    label: "whatsapp",
    value: CONTACT_INFO.whatsapp,
    href: CONTACT_INFO.whatsappUrl,
    preferred: false,
  },
];

const OPEN_TO = [
  "Full-stack project contracts",
  "Internship opportunities",
  "AI feature integrations",
  "SaaS MVP builds",
  "Open-source collaboration",
  "Mentorship & community",
];

export function Contact() {
  return (
    <Section
      id="contact"
      tag="net :: /open-socket"
      title={
        <>
          Open a <span className="text-gradient-forge">socket</span>.
        </>
      }
      intro="Collaborations, internships, client projects, or curious conversations — all welcome. Response within 24 hours."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        {/* Left — links */}
        <div className="space-y-6">
          {/* Resume CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-shadow"
            >
              <Download className="h-4 w-4" /> Download résumé / CV
            </a>
            <span className="text-[11px] font-mono text-muted-foreground">
              PDF · updated {new Date().getFullYear()}
            </span>
          </div>

          {/* Primary contact cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {PRIMARY_LINKS.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className={`group rounded-lg border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5 ${
                    l.preferred ? "border-border" : "border-border/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-primary">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs uppercase tracking-widest">{l.label}</span>
                    </div>
                    {l.preferred && (
                      <span className="text-[9px] font-mono text-green-400 uppercase tracking-widest">
                        preferred
                      </span>
                    )}
                  </div>
                  <div className="mt-3 font-mono text-sm text-foreground group-hover:text-primary transition-colors break-all flex items-center gap-1.5">
                    {l.value}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Location + timezone */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {CONTACT_INFO.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {CONTACT_INFO.timezone} · remote-first
            </span>
          </div>
        </div>

        {/* Right — open to */}
        <div className="rounded-lg border border-border bg-card p-5 min-w-[220px]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
            open to →
          </div>
          <ul className="space-y-2">
            {OPEN_TO.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Response time */}
          <div className="mt-6 border-t border-border pt-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              response time
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-mono text-green-400">within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* This site */}
      <div className="mt-8 rounded-lg border border-border/50 bg-card/40 px-5 py-4 font-mono text-xs text-muted-foreground">
        <span className="text-primary">$</span> This portfolio is{" "}
        <a
          href="https://github.com/Kipkirui-John/in-the-making"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          open-source on GitHub
        </a>{" "}
        · built with React 18, TypeScript, Vite, Tailwind · deployed on Vercel · forged in Kenya
      </div>
    </Section>
  );
}
