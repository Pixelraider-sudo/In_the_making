import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  scrollRestoration: false,
});

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <RouterProvider router={router} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
