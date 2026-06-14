import { createMiddleware } from "@tanstack/react-start";

const errorMiddleware = createMiddleware({
  type: "request",
}).server(async (ctx) => {
  return await ctx.next();
});

export const startInstance = {
  middleware: [errorMiddleware],
};
