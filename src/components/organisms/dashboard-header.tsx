"use client";

import { Bell, LogOut, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";
import { useUserStore } from "@/stores/useUserStore";
import { useUnreadLeadsCount } from "@/features/leads/hooks";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { ROUTES } from "@/lib/config/routes";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle: string;
}

export function DashboardHeader({
  onMenuClick,
  title,
  subtitle,
}: DashboardHeaderProps) {
  const { user } = useUserStore();
  const { data: unreadData } = useUnreadLeadsCount();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { mutate: logout } = useLogout();

  const unreadCount = unreadData?.count || 0;

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onMenuClick}
            className="lg:hidden hover:bg-white/10 rounded-lg"
            aria-label="Menu principal"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
            <p className="text-sm text-neutral-400">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="relative p-2 hover:bg-white/10 rounded-xl transition-colors outline-none">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 bg-[#111] border-white/10 text-white p-0">
              <div className="p-4 border-b border-white/10">
                <h4 className="font-semibold text-sm">Notificações</h4>
              </div>
              <div className="p-2">
                {unreadCount > 0 ? (
                  <Link
                    href={ROUTES.ADMIN.DASHBOARD.CONTATOS}
                    onClick={() => setIsPopoverOpen(false)}
                    className="block w-full text-left p-3 hover:bg-white/5 rounded-lg text-sm transition-colors"
                  >
                    Você tem <span className="text-primary font-bold">{unreadCount}</span> novos contatos.
                  </Link>
                ) : (
                  <p className="p-4 text-center text-sm text-neutral-500">
                    Nenhuma notificação nova.
                  </p>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="bg-primary/20 rounded-full hover:bg-primary/30"
                aria-label="Perfil do usuário"
              >
                <User className="w-5 h-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#111] border-white/10 text-white">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-neutral-400">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => logout()}
                className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
