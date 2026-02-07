import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articlesApi, PaginatedResponse } from "../api/articles.api";
import { ArticleResponseDTO, UpdateArticleDTO } from "@/lib/types/article";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useArticles = (firmId?: string, page = 0, size = 10, publishedOnly = false, initialData?: PaginatedResponse<ArticleResponseDTO>) => {
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryKey: ["articles", firmId, page, size, publishedOnly],
    queryFn: () => publishedOnly 
      ? articlesApi.getPublishedByFirmId(firmId!, page, size)
      : articlesApi.getAllByFirmId(firmId!, page, size),
    enabled: !!firmId,
    staleTime: STALE_TIME,
    initialData,
  });

  const createArticle = useMutation({
    mutationFn: articlesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Artigo criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const updateArticle = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArticleDTO }) =>
      articlesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Artigo atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const deleteArticle = useMutation({
    mutationFn: articlesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Artigo excluído com sucesso!");
    },
    onError: (error: any) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  return {
    articles: articlesData?.content || [],
    totalPages: articlesData?.page?.totalPages || 0,
    totalElements: articlesData?.page?.totalElements || 0,
    isLoadingArticles,
    createArticle,
    updateArticle,
    deleteArticle,
  };
};
