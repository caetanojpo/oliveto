import { cn } from "@/lib/utils";

interface StepNumberProps {
  number: number;
  className?: string;
}

export function StepNumber({ number, className }: StepNumberProps) {
  return (
    <div
      className={cn(
        "absolute -top-3 -left-3 w-8 h-8 bg-primary text-black rounded-full flex items-center justify-center font-bold text-sm z-10",
        className
      )}
    >
      {number}
    </div>
  );
}
