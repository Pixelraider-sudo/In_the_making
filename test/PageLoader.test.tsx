import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { PageLoader } from "../src/components/pixelforge/PageLoader";

/**
 * Regression tests for a real bug found during manual audit: the boot
 * effect's original `ranOnce` ref-guard pattern caused `onDone` to
 * never fire under React StrictMode's dev-only double-invoked effects
 * — the portfolio would stay permanently hidden behind the loader in
 * `npm run dev`. Fixed by removing the ref guard so each effect
 * invocation owns its own independent `cancelled` closure.
 *
 * These tests exist so that bug (or one like it) can't silently come
 * back in a future edit — this is exactly the kind of regression that
 * previously required a manual audit with a disposable test harness
 * to catch; now it's permanent and runs on every push via CI.
 */

beforeEach(() => {
  (window as unknown as { __pfBooted?: boolean }).__pfBooted = false;
});

describe("PageLoader", () => {
  it("calls onDone without StrictMode", async () => {
    const onDone = vi.fn();
    render(React.createElement(PageLoader, { onDone }));

    await vi.waitFor(() => expect(onDone).toHaveBeenCalled(), { timeout: 1500 });
  });

  it("calls onDone under React.StrictMode (regression test)", async () => {
    const onDone = vi.fn();
    render(
      React.createElement(React.StrictMode, null, React.createElement(PageLoader, { onDone })),
    );

    await vi.waitFor(() => expect(onDone).toHaveBeenCalled(), { timeout: 1500 });
  });

  it("completes within the hard timing cap (~1.2s worst case)", async () => {
    const onDone = vi.fn();
    const start = Date.now();
    render(React.createElement(PageLoader, { onDone }));

    await vi.waitFor(() => expect(onDone).toHaveBeenCalled(), { timeout: 2000 });
    expect(Date.now() - start).toBeLessThan(1200);
  });

  it("skips the boot sequence entirely on a repeat mount (__pfBooted already true)", async () => {
    (window as unknown as { __pfBooted?: boolean }).__pfBooted = true;
    const onDone = vi.fn();
    render(React.createElement(PageLoader, { onDone }));

    // Should be near-instant — no stage sequence, no floor delay.
    await vi.waitFor(() => expect(onDone).toHaveBeenCalled(), { timeout: 200 });
  });
});
