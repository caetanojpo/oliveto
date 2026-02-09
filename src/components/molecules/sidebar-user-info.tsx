"use client";

import { User } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

export function SidebarUserInfo() {
  const { user } = useUserStore();

  return (
    <div className="p-4 border-b border-white/10">
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate text-white">
            {user?.name || "Usuário"}
          </p>
          <p className="text-sm text-neutral-400 truncate">
            {user?.email || "email@exemplo.com"}
          </p>
        </div>
      </div>
    </div>
  );
}
