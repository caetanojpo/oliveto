"use client";

import { useMemo } from "react";
import { LeadResponseDTO } from "../types";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/organisms/data-table/data-table";
import { getLeadsColumns } from "./leads-columns";
import { PaginationState, OnChangeFn } from "@tanstack/react-table";

interface LeadsTableProps {
  leads: LeadResponseDTO[];
  isLoading: boolean;
  onViewDetails: (lead: LeadResponseDTO) => void;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function LeadsTable({
  leads,
  isLoading,
  onViewDetails,
  pageCount,
  pagination,
  onPaginationChange,
}: LeadsTableProps) {
  const columns = useMemo(
    () => getLeadsColumns({ onViewDetails }),
    [onViewDetails]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 border border-white/10 rounded-xl bg-white/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={leads}
      searchKey="name"
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );
}
