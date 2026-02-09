"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { heroContent } from "@/lib/constants/hero";
import { ScrambleText } from "@/components/atoms/scramble-text";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroContent.slides[currentSlide];

  return (
    <section className=" relative px-4 pt-10 lg:pt-20 pb-10 md:px-16 md:pt-32 flex flex-col justify-start md:justify-center overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-end justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px]">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 z-10" />
          <Image
            src={heroContent.backgroundImage}
            alt="Banner Words"
            fill
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-10 md:mb-20 lg:mb-40">
        <p className="text-sm text-gray-400 animate-in fade-in duration-1000">
          {heroContent.tagline}
        </p>
        <div className="min-h-[120px] md:min-h-[140px] flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-light leading-tight">
            <ScrambleText text={slide.prefix} duration={1500} />{" "}
            <span className="text-primary font-medium">
              <ScrambleText
                text={slide.highlight}
                duration={2000}
                delay={300}
              />
            </span>
            <br />
            <ScrambleText text={slide.suffix} duration={2500} delay={600} />
          </h1>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
