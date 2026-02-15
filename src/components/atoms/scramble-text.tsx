"use client";

import { useEffect, useState, useRef } from "react";

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
  const [displayText, setDisplayText] = useState(text);
  const [reduceMotion, setReduceMotion] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const currentTextRef = { value: displayText };

    // Performance optimization: Pre-split text to avoid splitting in every animation frame
    const targetChars = text.split("");
    const targetLength = targetChars.length;
    const charsLength = CHARS.length;

    const startAnimation = () => {
      startTimeRef.current = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const fixedCharsCount =
          progress >= 1 ? targetLength : Math.floor(easedProgress * targetLength);

        const shouldUpdateScramble = Math.floor(now / 40) % 2 === 0;

        let result = "";

        // Optimization: Use loop and string concatenation instead of map/join
        // to reduce garbage collection during animation frames
        for (let i = 0; i < targetLength; i++) {
          const char = targetChars[i];

          if (i < fixedCharsCount) {
            result += char;
          } else if (char === " ") {
            result += " ";
          } else if (shouldUpdateScramble) {
            result += CHARS[Math.floor(Math.random() * charsLength)];
          } else {
            // Handle case where previous text length is different
            result += currentTextRef.value[i] || CHARS[0];
          }
        }

        if (result !== currentTextRef.value) {
          currentTextRef.value = result;
          setDisplayText(result);
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
  }, [text, duration, delay, reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}
