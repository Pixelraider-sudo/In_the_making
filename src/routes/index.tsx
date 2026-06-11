import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Nav } from "@/components/pixelforge/Nav";
import { Hero } from "@/components/pixelforge/Hero";
import { Projects } from "@/components/pixelforge/Projects";
import { Skills } from "@/components/pixelforge/Skills";
import { Timeline } from "@/components/pixelforge/Timeline";
import { Achievements } from "@/components/pixelforge/Achievements";
import { Certifications } from "@/components/pixelforge/Certifications";
import { Contact } from "@/components/pixelforge/Contact";
import { Footer } from "@/components/pixelforge/Footer";
import { Terminal } from "@/components/pixelforge/Terminal";
import { BackToTop } from "@/components/pixelforge/BackToTop";
import { AuroraBackground } from "@/components/pixelforge/AuroraBackground";
import { ScrollProgress } from "@/components/pixelforge/ScrollProgress";

function HomePage() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background effects */}
      <AuroraBackground />
      <ScrollProgress />

      {/* Navigation */}
      <Nav onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main page content */}
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        <Projects />
        <Skills />
        <Timeline />
        <Achievements />
        <Certifications />
        <Contact />

        <Footer />
      </main>

      {/* Overlays */}
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      <BackToTop />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
