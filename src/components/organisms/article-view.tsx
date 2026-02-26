import { useMemo } from "react";
import { ArticleResponseDTO, ArticleStatus } from "@/lib/types/article";
import { sanitizeHtml } from "@/lib/utils/sanitizer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Tag, User } from "lucide-react";
import Image from "next/image";

interface ArticleViewProps {
  article: ArticleResponseDTO;
  onBack: () => void;
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  const sanitizedContent = useMemo(
    () => sanitizeHtml(article.content) || "",
    [article.content]
  );

  return (
    <div className="space-y-6">
      {/* Header / Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">Visualizar Artigo</h2>
      </div>

      <div className="bg-surface border border-white/10 rounded-2xl p-8">
        {/* Article Header */}
        <div className="border-b border-white/10 pb-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            {article.authorName && (
              <>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.authorName}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
              </>
            )}
            <span>
              {article.publishedAt
                ? format(new Date(article.publishedAt), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })
                : "Data não definida"}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span
              className={`${
                article.status === ArticleStatus.PUBLISHED
                  ? "text-primary"
                  : "text-amber-400"
              }`}
            >
              {article.status === ArticleStatus.PUBLISHED
                ? "Publicado"
                : "Rascunho"}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Cover Image */}
          {article.imageUrl && (
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-white/10">
              {/* Optimization: Use sizes to prevent downloading oversized images and priority for LCP */}
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  <Tag className="w-3 h-3" />
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Briefing */}
          {article.briefing && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                Resumo
              </h3>
              <p className="text-neutral-400">{article.briefing}</p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </div>
      </div>
    </div>
  );
}
