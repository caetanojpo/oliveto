"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { CreateTagDTO, CreateTagSchema, TagResponseDTO } from "@/lib/types/article";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

interface TagFormProps {
  onSubmit: (data: CreateTagDTO) => void;
  isPending: boolean;
  initialData?: TagResponseDTO;
  onCancel?: () => void;
}

export function TagForm({ onSubmit, isPending, initialData, onCancel }: TagFormProps) {
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTagDTO>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      firmId: user?.firmId || "00000000-0000-0000-0000-000000000000",
      color: "#00FF90",
    },
  });

  const watchedColor = watch("color");

  useEffect(() => {
    if (initialData) {
      reset({
        firmId: initialData.firmId,
        name: initialData.name,
        description: initialData.description || "",
        color: initialData.color || "#00FF90",
        icon: initialData.icon || "",
      });
    }
  }, [initialData, reset]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header with Back Button if onCancel is provided */}
      {onCancel && (
        <div className="flex items-center gap-4 mb-2">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">
            {initialData ? "Editar Tag" : "Nova Tag"}
          </h2>
        </div>
      )}

      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm text-neutral-400 mb-3">
            Nome da Tag
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Ex: Tributário, Agro, Notícias..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
            maxLength={100}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-3">
            Descrição (Opcional)
          </label>
          <textarea
            {...register("description")}
            placeholder="Breve descrição sobre a tag..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            maxLength={500}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-3">Cor</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={watchedColor}
              onChange={(e) =>
                setValue("color", e.target.value, { shouldValidate: true })
              }
              className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"
            />
            <input
              type="text"
              {...register("color")}
              placeholder="#000000"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors uppercase"
              maxLength={7}
            />
          </div>
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {initialData ? "Salvar Alterações" : "Criar Tag"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 font-medium rounded-xl hover:bg-red-500/20 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
