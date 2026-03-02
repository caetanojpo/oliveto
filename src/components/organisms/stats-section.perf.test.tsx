import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { StatsSection } from "./stats-section";

describe("StatsSection Performance", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should use requestAnimationFrame instead of setInterval for smoother animation", () => {
    // Setup intersection observer mock to trigger immediately
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn((element) => {
        // Find the callback from the latest observer creation
        const [callback] = mockIntersectionObserver.mock.calls[0];
        callback([{ isIntersecting: true }]);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');
    const setIntervalSpy = vi.spyOn(window, 'setInterval');

    render(<StatsSection />);

    // Check if raf was called and setInterval wasn't
    expect(rafSpy).toHaveBeenCalled();
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });
});
