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
import { WhatsAppFloat } from "../components/pixelforge/WhatsAppFloat";

const SITE_URL = "https://in-the-making.vercel.app";
const SITE_TITLE = "Kipkirui John | Frontend Developer";
const SITE_DESCRIPTION =
  "Kipkirui John builds thoughtful web experiences with React, TypeScript, JavaScript, and Next.js. Explore projects, technical skills, and ways to connect.";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Kipkirui John" },
      { name: "theme-color", content: "#0E9C6B" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kipkirui John",
  jobTitle: "Frontend Developer",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/profile.jpg`,
  email: "kipkiruijohn814@gmail.com",
  sameAs: [
    "https://github.com/Pixelraider-sudo",
    "https://www.linkedin.com/in/kipkirui-john-aa31b941b/",
  ],
  knowsAbout: [
    "Frontend Development",
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
  ],
};

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    SystemLog.bootSequence();

    const cleanup = Hotkeys.init();

    Hotkeys.onKey((key) => {
      if (key.toLowerCase() === "d") {
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PERSON_SCHEMA),
        }}
      />

      <Outlet />

      <WhatsAppFloat />

      {import.meta.env.DEV && (
        <>
          <DevOverlay />
          <SystemHUD />
        </>
      )}
    </QueryClientProvider>
  );
}

function NotFoundComponent() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Wrong turn</p>

        <h1 className="mt-5 text-8xl font-bold tracking-tighter text-foreground sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          This page isn't in the build.
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
          The page may have moved, the link may be outdated, or this route may not exist yet. Let's
          get you back to the good stuff.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to portfolio
          </Link>

          <a
            href="mailto:kipkiruijohn814@gmail.com"
            className="inline-flex items-center justify-center rounded-lg border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Contact me
          </a>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Route Error:", error);
  }, [error]);

  const handleRetry = () => {
    router.invalidate();
    reset();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
          !
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Temporary interruption
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Something didn't load correctly.
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This wasn't supposed to happen. Try loading the page again, or return to the portfolio and
          continue exploring.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try again
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
