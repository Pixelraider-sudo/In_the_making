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

import { PageLoader } from "@/components/pixelforge/PageLoader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kipkirui John — Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Kipkirui John — full-stack software engineer building React + TypeScript systems, AI-powered tools, and production-grade web platforms. Based in Nairobi, Kenya.",
      },
      {
        property: "og:title",
        content: "Kipkirui John — Software Engineer",
      },
      {
        property: "og:description",
        content:
          "Full-stack engineer based in Nairobi. 10+ projects shipped. Founder of the PIXELFORGE ecosystem. Open to work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "author", content: "Kipkirui John" },
    ],
  }),
  component: Index,
});

function Index() {
  const [termOpen, setTermOpen] = useState(false);
  const [booted, setBooted] = useState(false);

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

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <PageLoader onDone={() => setBooted(true)} />

      <div
        className={`min-h-screen transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
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
    </>
  );
}
