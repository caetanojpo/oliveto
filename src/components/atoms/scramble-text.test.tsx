import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ScrambleText } from "./scramble-text";

describe("ScrambleText", () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders accessible text for screen readers", () => {
    render(<ScrambleText text="Accessible Text" />);
    // Check if the sr-only element exists
    const elements = screen.getAllByText("Accessible Text");
    const srElement = elements.find((el) => el.classList.contains("sr-only"));
    expect(srElement).toBeDefined();
  });

  it("hides animated text from screen readers", () => {
    const { container } = render(<ScrambleText text="Hidden Animation" />);
    // There should be a span with aria-hidden="true"
    const hiddenSpan = container.querySelector('[aria-hidden="true"]');
    expect(hiddenSpan).not.toBeNull();
    // Verify it contains the text (initially)
    expect(hiddenSpan?.textContent).toBe("Hidden Animation");
  });

  it("respects prefers-reduced-motion", () => {
     // Mock matchMedia to return true for prefers-reduced-motion
     Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<ScrambleText text="Reduced Motion" />);
    // The visible text should be "Reduced Motion" immediately
    const elements = screen.getAllByText("Reduced Motion");
    const visibleText = elements.find(el => !el.classList.contains('sr-only'));
    expect(visibleText).toBeDefined();
    // And it should probably have aria-hidden="true" because it's the animated part (even if static now)
    expect(visibleText?.getAttribute('aria-hidden')).toBe('true');
  });
});
