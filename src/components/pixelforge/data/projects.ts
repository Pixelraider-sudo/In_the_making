export type ProjectCategory = "frontend" | "full-stack" | "business" | "personal";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: "live" | "in-progress" | "concept";
  caseStudySlug?: string;
}

export const projects: Project[] = [
  {
    slug: "xentro-technologies",
    title: "Xentro Technologies",
    tagline: "Engineering digital products that scale.",
    description:
      "A technology services website designed to help businesses explore digital solutions, understand service options, and start project conversations.",
    category: "business",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/xentro.png",
    liveUrl: "https://xentrotechnologies.co.ke",
    repoUrl: "https://github.com/Pixelraider-sudo/Xentro-Technologies",
    featured: true,
    status: "live",
  },
  {
    slug: "in-the-making",
    title: "In the Making",
    tagline: "A portfolio built around the work.",
    description:
      "A personal developer portfolio built to present projects, technical skills, professional identity, and contact options in one place.",
    category: "personal",
    stack: ["React", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS"],
    image: "/images/projects/in-the-making.png",
    liveUrl: "https://in-the-making.vercel.app/",
    repoUrl: "https://github.com/Pixelraider-sudo/In_the_making",
    featured: true,
    status: "live",
  },
  {
    slug: "campuscycle",
    title: "CampusCycle",
    tagline: "A simpler way to explore bike rentals.",
    description:
      "A frontend bike-rental experience featuring bike discovery, rental information, and a user interface for presenting rental and payment options.",
    category: "frontend",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    image: "/images/projects/placeholder.svg",
    liveUrl: "https://campus-cycle-mauve.vercel.app/",
    repoUrl: "https://github.com/Pixelraider-sudo/CampusCycle",
    featured: true,
    status: "live",
  },
  {
    slug: "cheptalal-primary-school",
    title: "Cheptalal Primary School",
    tagline: "A digital presence for a school community.",
    description:
      "A responsive school website concept designed to make school information and essential details easier for visitors to find.",
    category: "frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/cheptalal.png",
    liveUrl: "https://cheptalal-primary-school-gamma.vercel.app/",
    repoUrl: "https://github.com/Pixelraider-sudo/cheptalal-primary-school",
    featured: true,
    status: "live",
  },
  {
    slug: "sperian-studios-rental-platform",
    title: "Sperian Studios Rental Platform",
    tagline: "A rental-platform project with a detailed case study.",
    description:
      "A rental-platform project documented through a dedicated case study. Explore the case study for its stated requirements, design decisions, implementation details, and challenges.",
    category: "full-stack",
    stack: [
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "M-Pesa",
      "Stripe",
    ],
    image: "/images/projects/placeholder.svg",
    featured: false,
    status: "in-progress",
    caseStudySlug: "sperian-studios-rental-platform",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory | "all"): Project[] {
  if (category === "all") {
    return projects;
  }

  return projects.filter((project) => project.category === category);
}
