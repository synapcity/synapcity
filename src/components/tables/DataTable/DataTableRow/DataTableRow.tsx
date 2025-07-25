"use client";

import { TableRow, TableCell } from "@/components/atoms/ui/table";
import { flexRender, Row } from "@tanstack/react-table";

export function DataTableRows<TData>({ rows }: { rows: Row<TData>[]; }) {
  return rows.map((row) => (
    <DataTableRow key={row.id} row={row} />
  ))
}


export function DataTableRow<TData>({ row }: { row: Row<TData> }) {
  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
