"use client";

import { DataTable } from "@/components/organisms/data-table/data-table";
import { recentLeadsColumns } from "./recent-leads-columns";
import { DashboardLead } from "../../types";
import { Skeleton } from "@/components/atoms/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/config/routes";

interface RecentLeadsProps {
  data: DashboardLead[];
  isLoading: boolean;
}

export function RecentLeads({ data, isLoading }: RecentLeadsProps) {
  if (isLoading) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Leads Recentes</h2>
        <Link
          href={ROUTES.ADMIN.DASHBOARD.CONTATOS || "#"}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="p-0">
        <DataTable
          columns={recentLeadsColumns}
          data={data}
        />
      </div>
    </div>
  );
}
