"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/atoms/alert-dialog";
import { buttonVariants } from "@/components/atoms/button";

export function SidebarLogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="mt-auto p-6 border-t border-white/10">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Sair</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Tem certeza que deseja sair?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você precisará fazer login novamente para acessar o painel
              administrativo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              disabled={isPending}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saindo...
                </>
              ) : (
                "Sair"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
