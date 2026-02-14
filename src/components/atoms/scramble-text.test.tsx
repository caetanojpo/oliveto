import { render, screen, act } from '@testing-library/react';
import { ScrambleText } from './scramble-text';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ScrambleText', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Default mock for matchMedia (no reduced motion)
    Object.defineProperty(window, 'matchMedia', {
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
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders accessible structure', () => {
    const text = 'Hello World';
    render(<ScrambleText text={text} />);

    // Check for sr-only text. This ensures screen readers read the correct text.
    // We expect a span with class "sr-only" containing the text.
    // Note: Since the current implementation doesn't have this, it will fail, which is expected.
    const hiddenText = screen.getByText(text, { selector: '.sr-only' });
    expect(hiddenText).not.toBeNull();

    // Check for aria-hidden on animated text
    // The animated text initially is 'Hello World' but should be hidden from AT.
    const animatedElement = screen.getByText(text, { selector: '[aria-hidden="true"]' });
    expect(animatedElement).not.toBeNull();
  });

  it('respects prefers-reduced-motion', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
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

    const text = 'Reduced Motion';
    render(<ScrambleText text={text} />);

    // Since reduced motion is preferred, the text should not scramble.
    // We advance timers to trigger any potential animation loop.
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // The text should remain exactly as passed, not scrambled.
    // And it should still have the accessible structure.
    const animatedElement = screen.getByText(text, { selector: '[aria-hidden="true"]' });
    expect(animatedElement.textContent).toBe(text);
  });
});
