import Image from "next/image";
import Link from "next/link";
import { ArticleResponseDTO, TagResponseDTO } from "@/lib/types/article";
import { CategoryBadge } from "@/components/atoms/category-badge";
import { useState, memo, useMemo } from "react";

interface ArticleGridItemProps {
  article: ArticleResponseDTO;
  tagsMap: Map<string, TagResponseDTO>;
}

export const ArticleGridItem = memo(function ArticleGridItem({ article, tagsMap }: Readonly<ArticleGridItemProps>) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Resolve tags: prefer article.tags (populated), fallback to lookup in tagsMap
  const resolvedTags = useMemo(() => {
    return article.tags && article.tags.length > 0
      ? article.tags
      : (article.tagIds?.map(id => tagsMap.get(id)).filter(Boolean) as TagResponseDTO[]) || [];
  }, [article.tags, article.tagIds, tagsMap]);

  const visibleTags = useMemo(() => {
    return isExpanded ? resolvedTags : resolvedTags.slice(0, 3);
  }, [isExpanded, resolvedTags]);

  const hasMoreTags = resolvedTags.length > 3;

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking expand
    e.stopPropagation();
    setIsExpanded(true);
  };

  return (
    <div className="flex flex-col h-full group">
      <Link href={`/artigos/${article.id}`} className="cursor-pointer block">
        <div className="relative aspect-[4/3] overflow-hidden rounded mb-4">
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="flex flex-wrap gap-2 mb-2 min-h-[28px]">
        {resolvedTags.length > 0 ? (
          <>
            {visibleTags.map((tag) => (
              <CategoryBadge 
                key={tag.id} 
                category={tag.name} 
                color={tag.color} 
              />
            ))}
            {!isExpanded && hasMoreTags && (
              <button 
                onClick={handleExpand}
                className="text-xs text-neutral-400 hover:text-white transition-colors px-1 cursor-pointer"
              >
                ...
              </button>
            )}
          </>
        ) : (
          <span className="text-neutral-500 text-sm">Geral</span>
        )}
      </div>

      <Link href={`/artigos/${article.id}`} className="cursor-pointer block">
        <p className="text-sm text-white mt-1 leading-relaxed group-hover:text-primary transition-colors">
          {article.title}
        </p>
      </Link>
    </div>
  );
});

ArticleGridItem.displayName = "ArticleGridItem";
