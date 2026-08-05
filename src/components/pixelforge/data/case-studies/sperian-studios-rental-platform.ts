import type { CaseStudy } from "../case-study-types";

/**
 * REAL case study — Sperian Studios rental platform.
 *
 * Built entirely from facts already stated in `data/projects.ts` — no
 * invented business goals, metrics, or narrative details. Anywhere the
 * case-study schema asks for something more specific than what's
 * actually known (exact dates, specific challenges faced, measured
 * outcomes), it's marked with a `[TODO: ...]` placeholder rather than
 * a plausible-sounding guess. Search this file for "[TODO" before
 * publishing and fill those in with the real specifics — everything
 * else here is accurate as of the current portfolio content.
 */
export const sperianStudiosCaseStudy: CaseStudy = {
  slug: "sperian-studios-rental-platform",
  title: "Sperian Studios — Rental Platform",
  tagline:
    "Full production rental system for a client: property listings, booking flows, tenant management, and integrated payments.",
  category: "Client Project",
  status: "shipped",
  timeline: {
    start: "[TODO: start date]",
    end: "[TODO: delivery date]",
  },
  techStack: [
    "HTML/CSS/JS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "M-Pesa Daraja",
    "Stripe",
    "REST API",
  ],
  links: {
    // [TODO: add a live demo / repo link here if the client project can be shared publicly]
  },

  problem: {
    description:
      "A client needed a production rental platform covering the full tenant lifecycle — from browsing listings through booking to ongoing tenant management — with payment collection that worked for both local (M-Pesa) and international (card) tenants.",
    businessGoals: ["[TODO: what was the client trying to achieve with this platform?]"],
    painPoints: ["[TODO: what was broken or missing before this existed?]"],
    objectives: [
      "Property listings with detail pages",
      "End-to-end booking flow",
      "Tenant management",
      "Dual payment collection (local mobile money + international cards)",
    ],
    successMetrics: [
      "[TODO: how was success measured — bookings processed, uptime, client-reported outcome?]",
    ],
  },

  architecture: {
    overview:
      "Full-stack delivery: a frontend of landing, listings, and property-detail pages; a Node.js/Express REST API backend; a relational PostgreSQL schema. Delivered as 13 files spanning frontend, backend, and DB schema.",
    frontend:
      "Landing, listings, and property-detail pages built with HTML/CSS/JS, using glassmorphism styling and scroll-reveal effects.",
    backend: "Node.js + Express REST API.",
    database: "Relational schema in PostgreSQL. [TODO: table structure / key relationships]",
    authFlow: "[TODO: how do tenants and any admin/landlord users authenticate?]",
    apiStructure: "[TODO: key REST endpoints, e.g. /listings, /bookings, /payments]",
    folderOrganization: "[TODO: how the 13 files are organized across frontend/backend/db]",
    deployment:
      "Deployed and handed over to the client. [TODO: hosting platform, deployment process]",
  },

  techDecisions: [
    {
      technology: "M-Pesa Daraja + Stripe (dual payment integration)",
      reasonSelected:
        "M-Pesa is the dominant mobile money method in Kenya, where the client's tenants are primarily based; Stripe covers card payments for tenants paying internationally or by card. Supporting both meant not excluding either payment preference.",
      advantages: [
        "Covers the dominant local payment method (M-Pesa) and international card payments in one system",
      ],
      tradeoffs: [
        "[TODO: what was harder about maintaining two payment integrations instead of one?]",
      ],
      alternativesConsidered: ["[TODO: were other payment providers evaluated?]"],
      whyAlternativesRejected: "[TODO]",
    },
    {
      technology: "PostgreSQL",
      reasonSelected:
        "Relational data (properties, bookings, tenants, payments) fits a relational schema.",
      advantages: ["Strong fit for structured, related data like listings/bookings/tenants"],
      tradeoffs: ["[TODO]"],
      alternativesConsidered: ["[TODO]"],
      whyAlternativesRejected: "[TODO]",
    },
  ],

  features: [
    {
      name: "Property listings",
      purpose: "Let prospective tenants browse available properties.",
      implementation: "Listings and property-detail pages on the frontend, backed by the REST API.",
      technicalChallenges: "[TODO]",
    },
    {
      name: "Booking flow",
      purpose: "Let a tenant move from browsing to a confirmed booking.",
      implementation: "[TODO: describe the actual booking flow steps]",
      technicalChallenges: "[TODO]",
    },
    {
      name: "Tenant management",
      purpose: "Give the client (property owner/manager) a way to manage tenants.",
      implementation: "[TODO: what does tenant management actually let the client do?]",
      technicalChallenges: "[TODO]",
    },
    {
      name: "Dual payment integration",
      purpose: "Collect rent/booking payments via either M-Pesa or card.",
      implementation: "M-Pesa Daraja API integration alongside Stripe.",
      technicalChallenges:
        "[TODO: e.g. handling two different payment confirmation/webhook flows, reconciling payment state across providers]",
    },
  ],

  devTimeline: [
    { phase: "[TODO: e.g. Discovery / requirements]", description: "[TODO]" },
    { phase: "[TODO: e.g. Build]", description: "[TODO]" },
    { phase: "Delivery", description: "Deployed and handed over to the client." },
  ],

  challenges: [
    {
      title: "[TODO: a real specific challenge faced building this]",
      description: "[TODO]",
      solution: "[TODO]",
      lessonLearned: "[TODO]",
    },
  ],

  futureImprovements: ["[TODO: anything you'd add or change if you revisited this project]"],
};
