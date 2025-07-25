"use client"

import { TableBody, TableCell, TableRow } from "@/components/atoms/ui/table";
import { ColumnDef, Table } from "@tanstack/react-table";
import { DataTableRows } from "../DataTableRow/DataTableRow";

export const DataTableEmptyState = ({ length }: { length: number; }) => (
  <TableRow>
    <TableCell colSpan={length} className="h-24 text-center">
      No results.
    </TableCell>
  </TableRow>
)


export function DataTableBody<TData, TValue>({ table, columns }: { table: Table<TData>; columns: ColumnDef<TData, TValue>[] }) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        <DataTableRows rows={table.getRowModel().rows} />
      ) : (
        <DataTableEmptyState length={columns.length} />
      )}

    </TableBody>
  )

}
