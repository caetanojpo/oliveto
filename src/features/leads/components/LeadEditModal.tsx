"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/atoms/dialog";
import { LeadResponseDTO, UpdateLeadDTO, UpdateLeadSchema } from "../types";
import { useUpdateLead } from "../hooks";
import { Save, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface LeadEditModalProps {
  lead: LeadResponseDTO;
  onClose: () => void;
}

export function LeadEditModal({ lead, onClose }: LeadEditModalProps) {
  const { mutate: updateLead, isPending } = useUpdateLead();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateLeadDTO>({
    resolver: zodResolver(UpdateLeadSchema),
    defaultValues: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
    },
  });

  useEffect(() => {
    reset({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
    });
  }, [lead, reset]);

  const onSubmit = (data: UpdateLeadDTO) => {
    updateLead(
      { id: lead.id, data },
      {
        onSuccess: () => {
          toast.success("Lead atualizado com sucesso!");
          onClose();
        },
        onError: () => {
          toast.error("Erro ao atualizar lead. Tente novamente.");
        },
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-surface border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Lead</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Atualize as informações de contato do lead.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Security: maxLength limits prevent excessive payload/DoS attacks */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Nome</label>
            <input
              {...register("name")}
              maxLength={100}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Nome do lead"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Email</label>
            <input
              {...register("email")}
              maxLength={100}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Email do lead"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Telefone</label>
            <input
              {...register("phone")}
              maxLength={20}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Telefone do lead"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
