import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  color?: string;
  className?: string;
}

export function CategoryBadge({ category, color, className }: CategoryBadgeProps) {
  if (!color) {
    return (
      <span
        className={cn(
          "text-sm font-medium px-2 py-0.5 rounded-md border",
          "text-primary bg-primary/10 border-primary/20",
          className
        )}
      >
        {category}
      </span>
    );
  }

  return (
    <span 
      className={cn("text-sm font-medium px-2 py-0.5 rounded-md border", className)}
      style={{
        color: color,
        backgroundColor: `${color}20`,
        borderColor: `${color}40`
      }}
    >
      {category}
    </span>
  );
}
