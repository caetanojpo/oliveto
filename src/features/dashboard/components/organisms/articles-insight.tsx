import { Plus, Newspaper } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { ArticlePerformanceCard } from "../molecules/article-performance-card";
import { DashboardArticle } from "../../types";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/atoms/empty";

interface ArticlesInsightProps {
  articles: DashboardArticle[];
  isLoading: boolean;
}

function ArticleCardSkeleton() {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <Skeleton className="h-[160px] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

export function ArticlesInsight({ articles, isLoading }: ArticlesInsightProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white/5 rounded-full">
            <Newspaper className="h-8 w-8 text-neutral-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Nenhum artigo encontrado</h3>
        <p className="text-neutral-400 mb-6 max-w-md mx-auto">
          Comece a publicar conteúdo para ver métricas de performance aqui.
        </p>
        <Button className="bg-primary text-black hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Criar Artigo
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {articles.map((article) => (
        <ArticlePerformanceCard key={article.id} article={article} />
      ))}
    </div>
  );
}
