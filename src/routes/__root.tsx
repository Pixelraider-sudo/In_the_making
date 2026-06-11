import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { Hotkeys } from "../lib/hotkeys";
import { DevMode } from "../lib/dev-mode";
import { SystemLog } from "../lib/system-log";

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
   ERROR BOUNDARY (FIXED)
--------------------------- */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("App Error:", error);

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

/* ---------------------------
   ROUTE CONFIG
--------------------------- */
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kipkirui John | Portfolio" },
      { name: "description", content: "Portfolio of Kipkirui John" },
      { property: "og:title", content: "Kipkirui John | Portfolio" },
      { property: "og:description", content: "Software engineer portfolio" },
    ],
    links: [
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

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* ---------------------------
   ROOT SHELL (FIXED SCROLL)
--------------------------- */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* ---------------------------
   ROOT COMPONENT (FIXED)
--------------------------- */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    SystemLog.bootSequence();

    const cleanup = Hotkeys.init();

    Hotkeys.onKey((key) => {
      if (key === "d") {
        console.log("D key detected");

        DevMode.toggle();

        console.log("DevMode =", DevMode.isEnabled());

        SystemLog.add("Dev Mode toggled", "warn");
      }
    });

    return () => cleanup?.();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
