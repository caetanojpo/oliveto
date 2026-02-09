"use client";

import { useState, useCallback } from "react";
import { Plus, Tag, Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { ArticleList } from "@/components/organisms/article-list";
import { ArticleForm } from "@/components/organisms/article-form";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { useArticle } from "@/features/articles/hooks/useArticle";
import {
  CreateArticleDTO,
  ArticleResponseDTO,
  CreateTagDTO,
  TagResponseDTO,
  UpdateArticleDTO,
  UpdateTagDTO,
} from "@/lib/types/article";
import { useTags } from "@/features/articles/hooks/useTags";
import { TagList } from "@/components/organisms/tag-list";
import { TagForm } from "@/components/organisms/tag-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog";

type TabType = "list" | "create" | "tags" | "create-tag" | "edit" | "view" | "edit-tag";

export default function ArtigosPage() {
  const [activeTab, setActiveTab] = useState<TabType>("list");
  const { user } = useUserStore();

  // State for selection
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<TagResponseDTO | null>(null);
  
  // Delete modals state
  const [isDeleteArticleOpen, setIsDeleteArticleOpen] = useState(false);
  const [isDeleteTagOpen, setIsDeleteTagOpen] = useState(false);

  // Fetch articles and tags for the current user's firm
  const {
    articles,
    isLoadingArticles,
    createArticle,
    deleteArticle,
    updateArticle,
  } = useArticles(user?.firmId);

  const { tags, isLoadingTags, createTag, deleteTag, updateTag } = useTags(
    user?.firmId
  );

  // Fetch full article details when an ID is selected
  const { article: fullArticle, isLoading: isLoadingFullArticle } = useArticle(selectedArticleId);

  // Article Handlers
  const handleCreateArticle = (data: CreateArticleDTO) => {
    createArticle.mutate(data, {
      onSuccess: () => {
        setActiveTab("list");
      },
    });
  };

  const handleUpdateArticle = (data: CreateArticleDTO) => {
    if (selectedArticleId) {
      // Map CreateArticleDTO to UpdateArticleDTO
      const updateData: UpdateArticleDTO = {
        ...data,
      };
      updateArticle.mutate(
        { id: selectedArticleId, data: updateData },
        {
          onSuccess: () => {
            setActiveTab("list");
            setSelectedArticleId(null);
          },
        }
      );
    }
  };

  const handleDeleteArticleConfirm = () => {
    if (selectedArticleId) {
      deleteArticle.mutate(selectedArticleId, {
        onSuccess: () => {
          setIsDeleteArticleOpen(false);
          setSelectedArticleId(null);
        },
      });
    }
  };

  // Tag Handlers
  const handleCreateTag = (data: CreateTagDTO) => {
    createTag.mutate(data, {
      onSuccess: () => {
        setActiveTab("tags");
      },
    });
  };

  const handleUpdateTag = (data: CreateTagDTO) => {
    if (selectedTag) {
      const updateData: UpdateTagDTO = {
        ...data,
      };
      updateTag.mutate(
        { id: selectedTag.id, data: updateData },
        {
          onSuccess: () => {
            setActiveTab("tags");
            setSelectedTag(null);
          },
        }
      );
    }
  };

  const handleDeleteTagConfirm = () => {
    if (selectedTag) {
      deleteTag.mutate(selectedTag.id, {
        onSuccess: () => {
          setIsDeleteTagOpen(false);
          setSelectedTag(null);
        },
      });
    }
  };

  // Navigation Triggers
  const openViewArticle = useCallback((article: ArticleResponseDTO) => {
    setSelectedArticleId(article.id);
    setActiveTab("view");
  }, []);

  const openEditArticle = useCallback((article: ArticleResponseDTO) => {
    setSelectedArticleId(article.id);
    setActiveTab("edit");
  }, []);

  const openDeleteArticle = useCallback((id: string) => {
    setSelectedArticleId(id);
    setIsDeleteArticleOpen(true);
  }, []);

  const openEditTag = useCallback((tag: TagResponseDTO) => {
    setSelectedTag(tag);
    setActiveTab("edit-tag");
  }, []);

  const openDeleteTag = useCallback((tag: TagResponseDTO) => {
    setSelectedTag(tag);
    setIsDeleteTagOpen(true);
  }, []);

  // Helper to get article title for delete modal
  const getSelectedArticleTitle = () => {
    if (fullArticle) return fullArticle.title;
    const fromList = articles.find(a => a.id === selectedArticleId);
    return fromList?.title;
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Tabs - Only show main tabs when not in edit/view/create mode */}
      {["list", "tags"].includes(activeTab) && (
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "list"
                ? "bg-primary text-black"
                : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Todos os Artigos
          </button>
          <button
            onClick={() => setActiveTab("tags")}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeTab === "tags"
                ? "bg-primary text-black"
                : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Tag className="w-5 h-5" />
            Gerenciar Tags
          </button>
        </div>
      )}

      {/* Content */}
      {activeTab === "list" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab("create")}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Artigo
            </button>
          </div>
          <ArticleList
            articles={articles}
            onView={openViewArticle}
            onEdit={openEditArticle}
            onDelete={openDeleteArticle}
          />
        </div>
      )}

      {activeTab === "create" && (
        <ArticleForm
          onSubmit={handleCreateArticle}
          isPending={createArticle.isPending}
          tags={tags || []}
          authorId={user?.userId || ""}
          firmId={user?.firmId || ""}
          authorName={user?.name || "Usuário"}
          onCancel={() => setActiveTab("list")}
        />
      )}

      {activeTab === "view" && (
        isLoadingFullArticle ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : fullArticle ? (
          <ArticleForm
            onSubmit={() => {}} // No-op for view mode
            isPending={false}
            tags={tags || []}
            authorId={fullArticle.authorId || ""}
            firmId={fullArticle.firmId || ""}
            authorName={fullArticle.authorName || "Usuário"}
            initialData={fullArticle}
            readOnly={true}
            onCancel={() => {
              setActiveTab("list");
              setSelectedArticleId(null);
            }}
          />
        ) : null
      )}

      {activeTab === "edit" && (
        isLoadingFullArticle ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : fullArticle ? (
          <ArticleForm
            onSubmit={handleUpdateArticle}
            isPending={updateArticle.isPending}
            tags={tags || []}
            authorId={fullArticle.authorId || ""}
            firmId={fullArticle.firmId || ""}
            authorName={fullArticle.authorName || "Usuário"}
            initialData={fullArticle}
            onCancel={() => {
              setActiveTab("list");
              setSelectedArticleId(null);
            }}
          />
        ) : null
      )}

      {activeTab === "tags" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab("create-tag")}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Tag
            </button>
          </div>
          <TagList
            tags={tags}
            onEdit={openEditTag}
            onDelete={openDeleteTag}
          />
        </div>
      )}

      {activeTab === "create-tag" && (
        <TagForm
          onSubmit={handleCreateTag}
          isPending={createTag.isPending}
          onCancel={() => setActiveTab("tags")}
        />
      )}

      {activeTab === "edit-tag" && selectedTag && (
        <TagForm
          onSubmit={handleUpdateTag}
          isPending={updateTag.isPending}
          initialData={selectedTag}
          onCancel={() => {
            setActiveTab("tags");
            setSelectedTag(null);
          }}
        />
      )}

      {/* Delete Article Confirmation */}
      <AlertDialog open={isDeleteArticleOpen} onOpenChange={setIsDeleteArticleOpen}>
        <AlertDialogContent className="bg-[#111] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Artigo</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Tem certeza que deseja excluir o artigo "{getSelectedArticleTitle()}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 hover:bg-white/10 text-white hover:text-white">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteArticleConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Tag Confirmation */}
      <AlertDialog open={isDeleteTagOpen} onOpenChange={setIsDeleteTagOpen}>
        <AlertDialogContent className="bg-[#111] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Tag</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Tem certeza que deseja excluir a tag "{selectedTag?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 hover:bg-white/10 text-white hover:text-white">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteTagConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
