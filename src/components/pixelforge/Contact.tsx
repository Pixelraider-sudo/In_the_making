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
      intro="Collaborations, mentorship, internships, or curious conversations — all welcome."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)]"
        >
          <Download className="h-4 w-4" /> Download résumé
        </a>
        <span className="text-[10px] font-mono text-muted-foreground">
          drop your CV at <code className="text-primary">public/resume.pdf</code>
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 text-primary">
                <Icon className="h-5 w-5" />
                <span className="text-xs uppercase tracking-widest">{l.label}</span>
              </div>
              <div className="mt-3 font-mono text-sm text-foreground group-hover:text-primary transition-colors break-all">
                {l.value}
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
