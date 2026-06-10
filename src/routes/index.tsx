import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/pixelforge/Nav";
import { Hero } from "@/components/pixelforge/Hero";
import { Environment } from "@/components/pixelforge/Environment";
import { Timeline } from "@/components/pixelforge/Timeline";
import { Identity } from "@/components/pixelforge/Identity";
import { Projects } from "@/components/pixelforge/Projects";
import { Roadmap } from "@/components/pixelforge/Roadmap";
import { Skills } from "@/components/pixelforge/Skills";
import { Achievements } from "@/components/pixelforge/Achievements";
import { Certifications } from "@/components/pixelforge/Certifications";
import { Focus } from "@/components/pixelforge/Focus";
import { DevLog } from "@/components/pixelforge/DevLog";
import { Contact } from "@/components/pixelforge/Contact";
import { Footer } from "@/components/pixelforge/Footer";
import { Terminal } from "@/components/pixelforge/Terminal";
import { usePixelCursor } from "@/components/pixelforge/usePixelCursor";
import { ScrollProgress } from "@/components/pixelforge/ScrollProgress";
import { BackToTop } from "@/components/pixelforge/BackToTop";
import { KonamiEgg } from "@/components/pixelforge/KonamiEgg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kipkirui John — Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Kipkirui John — a Zetech University software engineering student building React + TypeScript systems. A living developer ecosystem, not a resume.",
      },
      { property: "og:title", content: "Kipkirui John — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software engineering student at Zetech University, forging full-stack systems with React, TypeScript and Vite.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [termOpen, setTermOpen] = useState(false);
  usePixelCursor();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTermOpen((o) => !o);
      } else if (e.key === "Escape") {
        setTermOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Nav onOpenTerminal={() => setTermOpen(true)} />
      <main>
        <Hero onOpenTerminal={() => setTermOpen(true)} />
        <Environment />
        <Timeline />
        <Identity />
        <Projects />
        <Roadmap />
        <Skills />
        <Achievements />
        <Certifications />
        <Focus />
        <DevLog />
        <Contact />
      </main>
      <Footer />
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
      <BackToTop />
      <KonamiEgg />
    </div>
  );
}
