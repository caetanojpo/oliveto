"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!+";

interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export function ScrambleText({
  text,
  duration = 1500,
  className,
  delay = 0,
}: ScrambleTextProps) {
  // Use a ref to access the span element directly
  const spanRef = useRef<HTMLSpanElement>(null);

  // Initialize state with the initial text only once.
  // This ensures the initial server render matches the client hydration.
  // Subsequent updates to `text` prop will be handled by the effect via direct DOM manipulation,
  // preventing React re-renders on every animation frame.
  const [initialText] = useState(text);

  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Initialize to false to match server rendering and avoid hydration mismatch.
  // The correct value will be set in useEffect.
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Update state immediately. React will bail out if value is the same.
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    // Use addEventListener if available, otherwise fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      // @ts-ignore - Fallback for older browsers
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        // @ts-ignore
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, ensure text is static and skip animation.
    // We also check matchMedia directly to handle the initial client render where
    // isReducedMotion state might still be false (to match SSR) but the user has the preference.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (isReducedMotion || mediaQuery.matches) {
      if (spanRef.current) {
        spanRef.current.textContent = text;
      }
      return;
    }

    let timeoutId: NodeJS.Timeout;
    // Capture the current text content of the span (from previous animation or initial render)
    // to use as the starting point for the scramble transition.
    const currentTextRef = { value: spanRef.current?.textContent || text };
    let lastFixedCharsCount = -1;

    // Performance optimization: Pre-split text to avoid splitting in every animation frame
    const targetChars = text.split("");
    const targetLength = targetChars.length;
    const charsLength = CHARS.length;

    // Optimization: Pre-allocate array to avoid allocation in every animation frame
    const resultBuffer = new Array(targetLength);

    const startAnimation = () => {
      startTimeRef.current = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const fixedCharsCount =
          progress >= 1 ? targetLength : Math.floor(easedProgress * targetLength);

        const shouldUpdateScramble = Math.floor(now / 40) % 2 === 0;

        if (fixedCharsCount === lastFixedCharsCount && !shouldUpdateScramble) {
          if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate);
          }
          return;
        }

        lastFixedCharsCount = fixedCharsCount;

        // Optimization: Reuse pre-allocated array and join instead of string concatenation
        // to reduce garbage collection of intermediate strings during animation frames
        const result = resultBuffer;

        for (let i = 0; i < targetLength; i++) {
          const char = targetChars[i];

          if (i < fixedCharsCount) {
            result[i] = char;
          } else if (char === " ") {
            result[i] = " ";
          } else if (shouldUpdateScramble) {
            result[i] = CHARS[Math.floor(Math.random() * charsLength)];
          } else {
            // Handle case where previous text length is different
            result[i] = currentTextRef.value[i] || CHARS[0];
          }
        }

        const finalResult = result.join("");

        if (finalResult !== currentTextRef.value) {
          currentTextRef.value = finalResult;
          // Direct DOM manipulation to avoid React re-renders
          if (spanRef.current) {
            spanRef.current.textContent = finalResult;
          }
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, duration, delay, isReducedMotion]);

  return (
    <span className={cn(className)}>
      <span className="sr-only">{text}</span>
      {/*
        This span displays the animated text.
        It is initialized with initialText for SSR/Hydration.
        Subsequent updates are handled directly via spanRef to improve performance.
      */}
      <span aria-hidden="true" ref={spanRef}>{initialText}</span>
    </span>
  );
}
