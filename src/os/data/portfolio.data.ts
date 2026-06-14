// ================================
// PIXEL RAIDER PORTFOLIO DATA CORE
// Single Source of Truth for BOTH:
// - Website UI
// - Terminal OS
// ================================

export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  status: "completed" | "in-progress" | "planned";
  url?: string;
};

export type Skill = {
  category: string;
  items: string[];
};

export type Contact = {
  email: string;
  github: string;
  linkedin?: string;
  location?: string;
};

// ================================
// ABOUT YOU (GLOBAL IDENTITY)
// ================================
export const about = {
  name: "Pixel Raider",
  role: "Software Engineer",
  tagline: "Building systems, terminals, and digital worlds.",
  bio: `
I am a software engineer focused on building interactive systems,
developer tools, and immersive web experiences.

Currently building a hybrid OS-style portfolio system combining
terminal UI + modern web interface.
  `.trim(),
};

// ================================
// PROJECTS (MAIN PORTFOLIO)
// ================================
export const projects: Project[] = [
  {
    id: "pixel-os",
    name: "Pixel OS",
    description: "A browser-based operating system simulation with terminal, desktop, and apps.",
    stack: ["React", "TypeScript", "Framer Motion"],
    status: "in-progress",
    url: "https://in-the-making.vercel.app/",
  },
  {
    id: "terminal-engine",
    name: "Terminal Engine",
    description: "Custom CLI system with command parser, history, and virtual filesystem.",
    stack: ["React", "TypeScript"],
    status: "in-progress",
  },
  {
    id: "climahealth-kenya",
    name: "ClimaHealth Kenya",
    description: "Climate-linked disease prediction and alert system for Kenyan communities.",
    stack: ["React", "Node.js", "Data Visualization"],
    status: "planned",
  },
];

// ================================
// SKILLS
// ================================
export const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "APIs"],
  },
  {
    category: "Systems",
    items: ["OS Design", "CLI Engines", "State Machines"],
  },
];

// ================================
// CONTACT
// ================================
export const contact: Contact = {
  email: "pixelraider.dev@gmail.com",
  github: "https://github.com/pixel-raider",
  linkedin: "",
  location: "Kenya",
};

// ================================
// TERMINAL HELP EXPORT
// ================================
export const terminalHelp = [
  "help - show commands",
  "about - show profile",
  "projects - list projects",
  "skills - show skills",
  "contact - show contact info",
  "clear - clear terminal",
];
