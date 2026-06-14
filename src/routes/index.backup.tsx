import { createFileRoute } from "@tanstack/react-router";

import { DesktopOS } from "@/components/pixelforge/DesktopOS";

function HomePage() {
  return <DesktopOS />;
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
