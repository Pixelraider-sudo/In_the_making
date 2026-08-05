import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "../src/components/pixelforge/Contact";

/**
 * This test exists specifically because of a real mistake made during
 * development: wrong contact info (a stale email, the wrong GitHub
 * account) got copied across multiple files and treated as "verified"
 * simply because it was consistent across the codebase — consistency
 * isn't correctness. This test pins the actual real values so a wrong
 * value can't silently ship again without a test failure.
 */
describe("Contact", () => {
  it("renders the real, current contact details", () => {
    render(<Contact />);

    expect(screen.getByText("kipkiruijohn814@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("github.com/Pixelraider-sudo")).toBeInTheDocument();
    expect(screen.getByText("linkedin.com/in/kipkirui-john-aa31b941b")).toBeInTheDocument();
    expect(screen.getByText("+254 790 563 520")).toBeInTheDocument();
    expect(screen.getByText("+254 740 838 078")).toBeInTheDocument();
  });

  it("does not render any known-wrong contact info", () => {
    render(<Contact />);

    expect(screen.queryByText("kipkiruijohn@gmail.com")).not.toBeInTheDocument();
    expect(screen.queryByText("github.com/Kipkirui-John")).not.toBeInTheDocument();
    expect(screen.queryByText(/XXX XXX XXX/)).not.toBeInTheDocument();
  });

  it("mailto and tel links use the real values, not placeholders", () => {
    render(<Contact />);

    const emailLink = screen.getByText("kipkiruijohn814@gmail.com").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:kipkiruijohn814@gmail.com");

    const whatsappLink = screen.getByText("+254 740 838 078").closest("a");
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/254740838078");
  });
});
