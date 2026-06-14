import { Nav } from "../components/pixelforge/Nav";
import { Hero } from "../components/pixelforge/Hero";
import { Identity } from "../components/pixelforge/Identity";
import { Skills } from "../components/pixelforge/Skills";
import { Projects } from "../components/pixelforge/Projects";
import { Timeline } from "../components/pixelforge/Timeline";
import { Achievements } from "../components/pixelforge/Achievements";
import { Certifications } from "../components/pixelforge/Certifications";
import { DevLog } from "../components/pixelforge/DevLog";
import { Contact } from "../components/pixelforge/Contact";
import { Footer } from "../components/pixelforge/Footer";

export function WebsiteApp() {
  const handleOpenTerminal = () => {
    console.log("Open Terminal");
    // We'll connect this to PixelOS later.
  };

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Nav onOpenTerminal={handleOpenTerminal} />

      <section id="hero">
        <Hero onOpenTerminal={handleOpenTerminal} />
      </section>

      <section id="identity">
        <Identity />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="timeline">
        <Timeline />
      </section>

      <section id="achievements">
        <Achievements />
      </section>

      <section id="certifications">
        <Certifications />
      </section>

      <section id="devlog">
        <DevLog />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}

export default WebsiteApp;
