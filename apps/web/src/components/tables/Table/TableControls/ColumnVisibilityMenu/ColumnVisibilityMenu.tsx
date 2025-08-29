/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/atoms/ui/dropdown-menu";
import { ColumnsIcon, ChevronDown } from "lucide-react";

export function ColumnVisibilityMenu({ table }: { table: Table<any> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted">
          <ColumnsIcon className="w-4 h-4" />
          Columns
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {table
          .getAllLeafColumns()
          .filter((col) => col.getCanHide())
          .map((col) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={col.getIsVisible()}
              onCheckedChange={(checked) => col.toggleVisibility(!!checked)}
              className="capitalize"
            >
              {col.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
