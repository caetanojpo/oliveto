"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Clientes Atendidos" },
  { value: 1200, suffix: "+", label: "Processos Resolvidos" },
  { value: 3, suffix: "", label: "Anos de Experiência" },
  { value: 1, prefix: "R$ ", suffix: "M+", label: "Recuperados para Clientes" },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-[#0a0a0a] border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm tracking-wider uppercase">
            Nossos Números
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Resultados que <span className="text-primary">falam por si</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
            >
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                inView={inView}
              />
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
