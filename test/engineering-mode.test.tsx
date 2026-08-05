import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EngineeringModeProvider, useEngineeringMode } from "../src/lib/engineering-mode";

const STORAGE_KEY = "pf-engineering-mode";

function TestConsumer() {
  const { enabled, toggle } = useEngineeringMode();
  return (
    <div>
      <span data-testid="state">{enabled ? "on" : "off"}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe("EngineeringModeProvider", () => {
  it("defaults to off for a first-time visitor", () => {
    render(
      <EngineeringModeProvider>
        <TestConsumer />
      </EngineeringModeProvider>,
    );
    expect(screen.getByTestId("state")).toHaveTextContent("off");
  });

  it("turns on when toggled, and persists to localStorage", () => {
    render(
      <EngineeringModeProvider>
        <TestConsumer />
      </EngineeringModeProvider>,
    );

    fireEvent.click(screen.getByText("toggle"));

    expect(screen.getByTestId("state")).toHaveTextContent("on");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
  });

  it("remembers the choice across a fresh mount (repeat visit)", () => {
    localStorage.setItem(STORAGE_KEY, "1");

    render(
      <EngineeringModeProvider>
        <TestConsumer />
      </EngineeringModeProvider>,
    );

    // The localStorage read happens in an effect, so it resolves
    // after the initial render — wait for it rather than asserting
    // synchronously.
    return screen.findByText("on").then(() => {
      expect(screen.getByTestId("state")).toHaveTextContent("on");
    });
  });

  it("toggling off again correctly persists '0', not just removing the key", () => {
    render(
      <EngineeringModeProvider>
        <TestConsumer />
      </EngineeringModeProvider>,
    );

    const button = screen.getByText("toggle");
    fireEvent.click(button); // on
    fireEvent.click(button); // off again

    expect(screen.getByTestId("state")).toHaveTextContent("off");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("0");
  });
});
