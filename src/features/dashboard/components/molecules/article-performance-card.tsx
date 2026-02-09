import Image from "next/image";
import { Eye, Clock } from "lucide-react";
import { DashboardArticle } from "../../types";
import { cn } from "@/lib/utils";

interface ArticlePerformanceCardProps {
  article: DashboardArticle;
}

export function ArticlePerformanceCard({ article }: ArticlePerformanceCardProps) {
  const isPublished = article.status === "PUBLISHED";

  return (
    <div className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500 bg-white/5">
            Sem imagem
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={cn(
            "text-xs px-2 py-1 rounded-full backdrop-blur-md font-medium",
            isPublished 
              ? "bg-primary/90 text-black"
              : "bg-white/10 text-white"
          )}>
            {isPublished ? "Publicado" : "Rascunho"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-1 font-semibold text-white group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-xs text-neutral-400">
            {article.briefing || "Sem descrição..."}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-4 text-xs text-neutral-500 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>{article.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
