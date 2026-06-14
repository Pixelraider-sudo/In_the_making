import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerConfig } from "../config.server";

/**
 * Server Function (TanStack Start compatible)
 */

const GreetingSchema = z.object({
  name: z.string().min(1),
});

export const getGreeting = createServerFn({ method: "POST" })
  .validator(GreetingSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();

    return {
      greeting: `Hello, ${data.name}!`,
      mode: config.nodeEnv ?? "unknown",
    };
  });
