"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface AdminTableProps {
  columns: any[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function AdminTable({ columns, data, onRowClick }: AdminTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-[#0D0D0F] border-b border-[#27272A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="px-6 py-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest cursor-pointer group"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2 group-hover:text-stone-300 transition-colors">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? (
                        <ChevronUp size={12} className="text-[#D4A843]" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ChevronDown size={12} className="text-[#D4A843]" />
                      ) : (
                        <ChevronsUpDown size={12} className="text-stone-700 opacity-0 group-hover:opacity-100" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[#1F1F23]">
            {table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id} 
                onClick={() => onRowClick?.(row.original)}
                className={`group transition-all duration-150 ${onRowClick ? 'cursor-pointer hover:bg-[#18181B]' : ''}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4.5 text-sm text-stone-300 font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
