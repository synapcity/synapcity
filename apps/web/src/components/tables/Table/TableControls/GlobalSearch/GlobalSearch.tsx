"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components";

export function GlobalSearch<TData>({ table }: { table: Table<TData> }) {
  const filterValue = (table.getState().globalFilter as string) ?? "";

  return (
    <Input
      className="w-44"
      placeholder="Search..."
      value={filterValue}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
    />
  );
}
