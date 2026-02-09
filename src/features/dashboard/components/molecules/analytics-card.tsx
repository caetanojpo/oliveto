import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/atoms/skeleton";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  isLoading?: boolean;
  className?: string;
  trend?: string;
  iconClassName?: string;
  trendClassName?: string;
}

export function AnalyticsCard({
  title,
  value,
  icon: Icon,
  description,
  isLoading,
  className,
  trend,
  iconClassName = "text-primary bg-primary/10",
  trendClassName = "text-primary bg-primary/10",
}: AnalyticsCardProps) {
  if (isLoading) {
    return (
      <div className={cn("bg-[#111111] border border-white/10 rounded-2xl p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-8 w-24 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  return (
    <div className={cn("bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-colors", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-xl", iconClassName)}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={cn("text-xs px-2 py-1 rounded-full", trendClassName)}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-neutral-400 mt-1">{description || title}</p>
    </div>
  );
}
