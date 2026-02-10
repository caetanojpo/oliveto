import { ArticleResponseDTO } from "@/lib/types/article";
import { memo } from "react";
import { ArticleListItem } from "@/components/molecules/article-list-item";
import { FileText } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/atoms/empty";

interface ArticleListProps {
  articles: ArticleResponseDTO[];
  onView: (article: ArticleResponseDTO) => void;
  onEdit: (article: ArticleResponseDTO) => void;
  onDelete: (id: string) => void;
}

export const ArticleList = memo(function ArticleList({ articles, onView, onEdit, onDelete }: ArticleListProps) {
  return (
    <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-neutral-500 border-b border-white/10">
              <th className="px-6 py-4 font-medium">Título</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Data</th>
              <th className="px-6 py-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {articles.length === 0 ? (
               <tr>
                 <td colSpan={4} className="py-12 text-center text-neutral-500">
                   <Empty>
                     <EmptyHeader>
                       <EmptyMedia>
                         <FileText className="size-10 text-neutral-500" />
                       </EmptyMedia>
                       <EmptyTitle>Nenhum artigo encontrado</EmptyTitle>
                       <EmptyDescription>
                         Você ainda não criou nenhum artigo.
                       </EmptyDescription>
                     </EmptyHeader>
                   </Empty>
                 </td>
               </tr>
            ) : (
              articles.map((article) => (
                <ArticleListItem
                  key={article.id}
                  article={article}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});
