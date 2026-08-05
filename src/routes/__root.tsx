import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";

import { Hotkeys } from "../lib/hotkeys";
import { DevMode } from "../lib/dev-mode";
import { SystemLog } from "../lib/system-log";

import { DevOverlay } from "../components/pixelforge/DevOverlay";
import { SystemHUD } from "../components/pixelforge/SystemHUD";

/* ---------------------------
   ROUTE CONFIG
   Note: this is a plain client-rendered SPA (see main.tsx / router.tsx).
   There is no SSR here, so we intentionally do NOT use TanStack Start's
   `shellComponent` / `<Scripts />` APIs — the HTML shell already lives in
   index.html and is bootstrapped by main.tsx. `head()` / <HeadContent />
   below are plain @tanstack/react-router APIs and work fine client-side.
--------------------------- */
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kipkirui John | Software Engineer" },
      {
        name: "description",
        content:
          "Full-stack systems, production APIs, and AI-integrated tools — Kipkirui John, Software Engineer based in Nairobi, Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://in-the-making.vercel.app/" },
      { property: "og:title", content: "Kipkirui John | Software Engineer" },
      {
        property: "og:description",
        content: "Full-stack systems, production APIs, and AI-integrated tools.",
      },
      { property: "og:image", content: "https://in-the-making.vercel.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kipkirui John | Software Engineer" },
      {
        name: "twitter:description",
        content: "Full-stack systems, production APIs, and AI-integrated tools.",
      },
      { name: "twitter:image", content: "https://in-the-making.vercel.app/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://in-the-making.vercel.app/" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),

  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* ---------------------------
   STRUCTURED DATA (JSON-LD)
   Helps search engines understand this page is about a specific
   person, their job title, and their real social/professional
   profiles — can improve how the site appears in search results
   for "Kipkirui John".
--------------------------- */
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kipkirui John",
  jobTitle: "Frontend Developer",
  url: "https://in-the-making.vercel.app/",
  image: "https://in-the-making.vercel.app/profile.jpg",
  email: "mailto:kipkiruijohn814@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
    "https://github.com/Pixelraider-sudo",
    "https://www.linkedin.com/in/kipkirui-john-aa31b941b/",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
};

/* ---------------------------
   ROOT COMPONENT
--------------------------- */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Dev-only diagnostics: system log + the "press D" engineering overlay.
    // Gated behind import.meta.env.DEV so production visitors can never
    // trigger it, no matter how the build is deployed.
    if (!import.meta.env.DEV) return;

    SystemLog.bootSequence();

    const cleanup = Hotkeys.init();

    Hotkeys.onKey((key) => {
      if (key === "d") {
        DevMode.toggle();
        SystemLog.add("Dev Mode toggled", "warn");
      }
    });

    return () => cleanup?.();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />

      <Outlet />

      {import.meta.env.DEV && (
        <>
          <DevOverlay />
          <SystemHUD />
        </>
      )}
    </QueryClientProvider>
  );
}

/* ---------------------------
   NOT FOUND
--------------------------- */
function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   ERROR BOUNDARY
--------------------------- */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Route Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or go back home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
