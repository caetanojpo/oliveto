import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {articlesApi} from "../api/articles.api";
import {TagResponseDTO, UpdateTagDTO} from "@/lib/types/article";
import {toast} from "sonner";
import {getFriendlyErrorMessage} from "@/lib/utils/error-handler";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useTags = (firmId?: string, publishedOnly = false, initialData?: { content: TagResponseDTO[] }) => {
  const queryClient = useQueryClient();

  const { data: tagsData, isLoading: isLoadingTags } = useQuery({
    queryKey: ["tags", firmId, publishedOnly],
    queryFn: () => publishedOnly 
      ? articlesApi.getPublishedTagsByFirmId(firmId!)
      : articlesApi.getAllTagsByFirmId(firmId!),
    enabled: !!firmId,
    staleTime: STALE_TIME,
    initialData,
  });

  const createTag = useMutation({
    mutationFn: articlesApi.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTagDTO }) =>
      articlesApi.updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const deleteTag = useMutation({
    mutationFn: articlesApi.deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag excluída com sucesso!");
    },
    onError: (error: any) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  return {
    tags: tagsData?.content || [],
    isLoadingTags,
    createTag,
    updateTag,
    deleteTag,
  };
};
