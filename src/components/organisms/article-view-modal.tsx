import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { ArticleResponseDTO, ArticleStatus } from "@/lib/types/article";
import { sanitizeHtml } from "@/lib/utils/sanitizer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tag } from "lucide-react";

interface ArticleViewModalProps {
  article: ArticleResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleViewModal({
  article,
  isOpen,
  onClose,
}: ArticleViewModalProps) {
  const sanitizedContent = useMemo(
    () => (article?.content ? sanitizeHtml(article.content) : "") || "",
    [article?.content]
  );

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {article.title}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-neutral-400 mt-2">
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
        </DialogHeader>

        <div className="space-y-6 mt-4">
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
      </DialogContent>
    </Dialog>
  );
}
