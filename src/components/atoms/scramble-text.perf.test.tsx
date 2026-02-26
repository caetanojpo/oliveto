import { render, act } from '@testing-library/react';
import { ScrambleText } from '@/components/atoms/scramble-text';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ScrambleText Performance & Accessibility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(() => cb(performance.now()), 16) as unknown as number; // Simulate 60fps
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id);
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // Default to false
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('starts animation loop by default', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');
    render(<ScrambleText text="Hello" />);

    // Should call rAF immediately (or after delay 0)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(rafSpy).toHaveBeenCalled();
  });

  it('respects prefers-reduced-motion: reduce by NOT animating', () => {
    // Override matchMedia for this test
    (window.matchMedia as any).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');
    const { getAllByText } = render(<ScrambleText text="Hello" />);

    // Should render final text immediately
    expect(getAllByText('Hello').length).toBeGreaterThan(0);

    // Should NOT start animation loop
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(rafSpy).not.toHaveBeenCalled();
  });
});
