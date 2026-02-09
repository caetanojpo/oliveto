"use client";

import { useState } from "react";
import { useLeads } from "@/features/leads/hooks";
import { LeadsTable } from "@/features/leads/components/LeadsTable";
import { LeadResponseDTO } from "@/features/leads/types";
import { LeadDetailsModal } from "@/features/leads/components/LeadDetailsModal";
import { PaginationState } from "@tanstack/react-table";

export default function LeadsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null); // null = All, false = Unread, true = Read
  const [selectedLead, setSelectedLead] = useState<LeadResponseDTO | null>(null);

  const { data, isLoading } = useLeads({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    isRead: filterStatus
  });

  const pageCount = data?.page.totalPages || 0;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Contatos</h2>
          <p className="text-neutral-400">Gerencie os leads recebidos pelo site.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl w-fit">
          <FilterButton
            label="Todos"
            active={filterStatus === null}
            onClick={() => { setFilterStatus(null); setPagination(p => ({ ...p, pageIndex: 0 })); }}
          />
          <FilterButton
            label="Não Lidos"
            active={filterStatus === false}
            onClick={() => { setFilterStatus(false); setPagination(p => ({ ...p, pageIndex: 0 })); }}
          />
          <FilterButton
            label="Lidos"
            active={filterStatus === true}
            onClick={() => { setFilterStatus(true); setPagination(p => ({ ...p, pageIndex: 0 })); }}
          />
        </div>
      </div>

      {/* Table */}
      <LeadsTable
        leads={data?.content || []}
        isLoading={isLoading}
        onViewDetails={setSelectedLead}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
      />

      {/* Modal */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-primary text-black shadow-lg shadow-primary/20'
          : 'text-neutral-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}
