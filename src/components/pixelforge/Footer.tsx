"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  AudioLines,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Volume2,
  VolumeX,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Pixelraider-sudo",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kipkirui-john-aa31b941b/",
    icon: Linkedin,
  },
];

const FOOTER_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub activity", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const [sound, setSound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      setSound(localStorage.getItem("pf-sound") === "1");
    } catch {
      setSound(false);
    }
  }, []);

  const toggleSound = async () => {
    const nextSound = !sound;
    setSound(nextSound);

    try {
      localStorage.setItem("pf-sound", nextSound ? "1" : "0");
    } catch {
      // Audio still works if browser storage is unavailable.
    }

    if (!nextSound) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (
          window as Window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioCtx) return;

      const context = new AudioCtx();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      gain.gain.setValueAtTime(0.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.09);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.09);

      oscillator.onended = () => {
        void context.close();
      };
    } catch {
      // Audio is an optional enhancement.
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("kipkiruijohn814@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:kipkiruijohn814@gmail.com";
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-background">
      {/* Subtle technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Closing CTA */}
        <div className="grid gap-8 border-b border-border/70 py-12 sm:py-16 md:grid-cols-[1fr_auto] md:items-end md:gap-12 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              End of page. Start of something.
            </div>

            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl md:text-5xl lg:text-6xl">
              Have an idea?
              <br />
              <span className="text-primary">Let's build it.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              I’m interested in meaningful projects, ambitious ideas, and opportunities to build
              products that make a difference.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href="mailto:kipkiruijohn814@gmail.com?subject=Let's%20build%20something"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4" />
              Let's talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a
              href="#hero"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Back to the top
              <ArrowDownRight className="h-4 w-4 rotate-180" />
            </a>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="grid gap-10 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr] lg:gap-16">
          {/* Identity */}
          <div>
            <a
              href="#hero"
              aria-label="Kipkirui John — back to home"
              className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-mono text-sm font-bold text-primary transition-colors group-hover:bg-primary/15">
                KJ
              </span>

              <span>
                <span className="block text-sm font-semibold tracking-tight">Kipkirui John</span>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Software Engineer
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Engineering thoughtful digital experiences, one iteration at a time. Focused on
              frontend development, product thinking, and continuous growth.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Nairobi, Kenya
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                React · TypeScript
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </h3>

            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h3>

            <button
              type="button"
              onClick={copyEmail}
              className="group flex max-w-full items-center gap-2 text-left text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Copy email address"
            >
              <span className="break-all">kipkiruijohn814@gmail.com</span>
              {copied ? (
                <Check className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <span className="shrink-0 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                  COPY
                </span>
              )}
            </button>

            {copied && (
              <p role="status" className="mt-2 text-xs text-primary">
                Email copied to clipboard.
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} profile (opens in a new tab)`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-card/50 px-3 text-xs font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={sound}
              className="mt-5 inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {sound ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              Audio cues
              <span
                className={`ml-1 h-1.5 w-1.5 rounded-full ${
                  sound ? "bg-primary" : "bg-muted-foreground/40"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border/70 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-muted-foreground">
            © {year} Kipkirui John. Built with intention.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Always learning
            </span>

            <span className="hidden h-3 w-px bg-border sm:block" />

            <a
              href="https://github.com/Pixelraider-sudo/In_the_making"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Github className="h-3.5 w-3.5" />
              View source
              <ArrowUpRight className="h-3 w-3" />
            </a>

            <span className="hidden h-3 w-px bg-border sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <AudioLines className="h-3.5 w-3.5" />
              Made to evolve
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
