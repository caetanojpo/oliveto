"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LeadResponseDTO } from "../types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DataTableColumnHeader } from "@/components/organisms/data-table/data-table-column-header";
import { Badge } from "@/components/atoms/badge";
import { Eye } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface LeadsColumnsProps {
  onViewDetails: (lead: LeadResponseDTO) => void;
}

export const getLeadsColumns = ({
  onViewDetails,
}: LeadsColumnsProps): ColumnDef<LeadResponseDTO>[] => [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-neutral-400">
          {format(date, "dd/MM/yyyy HH:mm", { locale: ptBR })}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <span className="text-white font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-neutral-400">{row.getValue("email")}</span>,
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => <span className="text-neutral-400">{row.getValue("phone")}</span>,
  },
  {
    accessorKey: "isRead",
    header: "Status",
    cell: ({ row }) => {
      const isRead = row.original.isRead;
      return (
        <Badge
          variant={isRead ? "secondary" : "default"}
          className={
            !isRead
              ? "bg-primary text-black hover:bg-primary/90 font-bold"
              : "bg-neutral-800 text-neutral-400 hover:bg-neutral-800/90"
          }
        >
          {isRead ? "Lido" : "Novo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original;
      return (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onViewDetails(lead)}
          className="text-primary hover:text-primary hover:bg-primary/10 cursor-pointer"
          aria-label="Ver detalhes"
        >
          <Eye className="w-4 h-4" />
        </Button>
      );
    },
  },
];
