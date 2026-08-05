import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement IntersectionObserver — polyfill with a
// no-op stub so components using it (e.g. Section's scroll-reveal)
// don't throw in tests. Tests that need real intersection behavior
// should mock this per-test instead of relying on this default.
class MockIntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}
// @ts-expect-error -- partial stub, sufficient for components that
// only call observe/disconnect and never rely on real intersection data
window.IntersectionObserver = MockIntersectionObserver;

// jsdom doesn't implement matchMedia — polyfill so components that
// check prefers-reduced-motion / prefers-color-scheme don't crash.
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
