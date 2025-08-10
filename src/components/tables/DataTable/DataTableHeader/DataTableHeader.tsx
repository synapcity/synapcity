"use client";

import { flexRender, Header, Table } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead } from "@/components/atoms/ui/table";

export function DataTableHeaderCell<TData>({ header }: { header: Header<TData, unknown> }) {
  return (
    <TableHead key={header.id}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
}
export function DataTableHeader<TData>({ table }: { table: Table<TData> }) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return <DataTableHeaderCell key={header.id} header={header} />;
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
