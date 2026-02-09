"use client";

import { processSteps } from "@/lib/constants/process-steps";
import { howItWorksContent } from "@/lib/constants/how-it-works";
import { ProcessStepCard } from "@/components/molecules/process-step-card";

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-wider uppercase">
            {howItWorksContent.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            {howItWorksContent.title}
            <span className="text-primary">
              {howItWorksContent.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {howItWorksContent.description}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
