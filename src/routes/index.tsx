import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { Nav } from "@/components/pixelforge/Nav";
import { Hero } from "@/components/pixelforge/Hero";
import { Projects } from "@/components/pixelforge/Projects";
import { Skills } from "@/components/pixelforge/Skills";
import { Contact } from "@/components/pixelforge/Contact";
import { Footer } from "@/components/pixelforge/Footer";
import { PageLoader } from "@/components/pixelforge/PageLoader";
import { GitHubStats } from "@/components/pixelforge/GitHubStats";
import { Terminal } from "@/components/pixelforge/Terminal";
import { EngineeringModeProvider, useEngineeringMode } from "@/lib/engineering-mode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kipkirui John | Software Engineer" },
      {
        name: "description",
        content:
          "Kipkirui John is a software engineering student focused on frontend development with React, TypeScript, and Next.js. Explore projects, technical skills, GitHub activity, and contact information.",
      },
      {
        property: "og:title",
        content: "Kipkirui John | Software Engineer",
      },
      {
        property: "og:description",
        content:
          "Explore Kipkirui John's software projects, frontend development skills, GitHub activity, and work with Xentro Technologies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "author", content: "Kipkirui John" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <EngineeringModeProvider>
      <IndexContent />
    </EngineeringModeProvider>
  );
}

function IndexContent() {
  const [termOpen, setTermOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const { enabled: engineeringMode } = useEngineeringMode();

  const openTerminal = useCallback(() => {
    if (engineeringMode) setTermOpen(true);
  }, [engineeringMode]);

  const closeTerminal = useCallback(() => {
    setTermOpen(false);
  }, []);

  useEffect(() => {
    if (!engineeringMode) {
      setTermOpen(false);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTermOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [engineeringMode]);

  useEffect(() => {
    if (!engineeringMode) setTermOpen(false);
  }, [engineeringMode]);

  const openDestination = useCallback((url: string) => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
      return;
    }

    try {
      const destination = new URL(url, window.location.origin);

      if (destination.protocol !== "https:" && destination.protocol !== "http:") {
        return;
      }

      window.open(destination.href, "_blank", "noopener,noreferrer");
    } catch {
      // Ignore malformed destinations.
    }
  }, []);

  return (
    <>
      <PageLoader onDone={() => setBooted(true)} />

      <div
        className={`min-h-screen transition-opacity duration-500 ${
          booted ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Nav onOpenTerminal={openTerminal} />

        <main>
          <Hero onOpenTerminal={openTerminal} />
          <Projects />
          <Skills />
          <GitHubStats />
          <Contact />
        </main>

        <Footer />

        {engineeringMode && (
          <Terminal open={termOpen} onClose={closeTerminal} onOpenUrl={openDestination} />
        )}
      </div>
    </>
  );
}
