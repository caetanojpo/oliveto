import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";
import { QUERY_CONFIG } from "@/lib/config/query";

export const useArticle = (id: string | null) => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => articlesApi.getById(id!),
    enabled: !!id,
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
  });

  return {
    article,
    isLoading,
    error,
  };
};
