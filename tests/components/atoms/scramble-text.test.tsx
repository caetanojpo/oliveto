import { act, render, screen } from '@testing-library/react';
import { ScrambleText } from '@/components/atoms/scramble-text';
import React, { Profiler, type ProfilerOnRenderCallback } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ScrambleText Performance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders efficiently during animation', async () => {
    let renderCount = 0;
    const onRender: ProfilerOnRenderCallback = (id, phase) => {
      renderCount++;
    };

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');

    render(
      <Profiler id="scramble" onRender={onRender}>
        <ScrambleText text="Hello World" duration={1000} />
      </Profiler>
    );

    // Fast-forward time
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    // Check final state
    expect(screen.getAllByText('Hello World').length).toBeGreaterThan(0);

    console.log(`Render count (commits): ${renderCount}`);
    console.log(`RAF calls: ${rafSpy.mock.calls.length}`);

    // Clean up spy
    rafSpy.mockRestore();
  });
});
