"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/constants/dashboard";
import { cn } from "@/lib/utils";
import { useUnreadLeadsCount } from "@/features/leads/hooks";
import { ROUTES } from "@/lib/config/routes";

export function SidebarNavigation() {
  const pathname = usePathname();
  const { data: unreadData } = useUnreadLeadsCount();
  const unreadCount = unreadData?.count || 0;

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        const isContatos = item.href === ROUTES.ADMIN.DASHBOARD.CONTATOS;

        // Use the static badge from config, or the dynamic unread count for Contatos
        const badgeValue = isContatos && unreadCount > 0
          ? unreadCount
          : (item as any).badge;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon
              className={cn("w-5 h-5", isActive ? "text-primary" : "")}
            />
            <span className="flex-1">{item.label}</span>
            {badgeValue && (
              <span className="px-2 py-0.5 text-xs bg-primary text-black rounded-full font-medium">
                {badgeValue}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
