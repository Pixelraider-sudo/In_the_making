import { about, projects, skills, contact } from "../data/portfolio.data";

/**
 * ================================
 * LEGACY COMMAND REGISTRY (DISABLED)
 * ================================
 * This file is now deprecated.
 * Commands are handled inside TerminalEngine.
 */

export const registerCommands = () => {
  console.warn(
    "[PixelOS] registerCommands is deprecated. Use TerminalEngine.buildDefaultEngine() instead.",
  );

  return {
    help: () => ["help is now handled by TerminalEngine"],

    clear: () => "__CLEAR__",

    about: () => about.bio,

    whoami: () => about.name,

    projects: () => projects.map((p) => `• ${p.name} (${p.status}) — ${p.description}`),

    skills: () => skills.map((s) => `${s.category}: ${s.items.join(", ")}`),

    contact: () =>
      [
        `Email: ${contact.email}`,
        `GitHub: ${contact.github}`,
        contact.linkedin ?? "",
        contact.location ?? "",
      ].filter(Boolean),
  };
};
