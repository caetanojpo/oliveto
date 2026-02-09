"use client";

import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Banco do Brasil", initials: "BB" },
  { name: "Caixa Econômica", initials: "CEF" },
  { name: "Itaú", initials: "ITAÚ" },
  { name: "Bradesco", initials: "BRAD" },
  { name: "Santander", initials: "SANT" },
  { name: "INSS", initials: "INSS" },
  { name: "Receita Federal", initials: "RFB" },
  { name: "OAB", initials: "OAB" },
  { name: "CRC", initials: "CRC" },
  { name: "SESCAP", initials: "SESC" },
];

const doubledPartners = [...partners, ...partners];

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isHovered) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <section className="py-16 bg-secondary border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-primary text-sm tracking-wider uppercase">
            Parceiros & Instituições
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">
            Trabalhamos com as{" "}
            <span className="text-primary">principais instituições</span>
          </h2>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-hidden gap-8"
        >
          {/* Duplicate for infinite scroll */}
          {doubledPartners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="text-center">
                <span className="text-xl font-bold text-gray-400 group-hover:text-primary transition-colors">
                  {partner.initials}
                </span>
                <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
