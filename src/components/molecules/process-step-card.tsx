import type { ProcessStep } from "@/lib/types/process-step";
import { StepNumber } from "@/components/atoms/step-number";

interface ProcessStepCardProps {
  step: ProcessStep;
  index: number;
}

export function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  return (
    <div className="relative group">
      <StepNumber number={index + 1} />

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
        {/* Icon */}
        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <step.icon className="w-7 h-7 text-primary" />
        </div>

        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
