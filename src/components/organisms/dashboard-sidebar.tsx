"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { ROUTES } from "@/lib/config/routes";
import { SidebarUserInfo } from "@/components/molecules/sidebar-user-info";
import { SidebarNavigation } from "@/components/molecules/sidebar-navigation";
import { SidebarLogoutButton } from "@/components/molecules/sidebar-logout-button";
import { IMAGES } from "@/lib/constants/images";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-surface border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link
                href={ROUTES.PUBLIC.HOME}
                className="text-2xl font-bold tracking-tight"
              >
                <Image src={IMAGES.LOGO} alt="Logo" width={100} height={100} />
              </Link>
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Fechar menu lateral"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <SidebarUserInfo />
          <SidebarNavigation />
          <SidebarLogoutButton />
        </div>
      </aside>
    </>
  );
}
