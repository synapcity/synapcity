"use client"

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table
} from "@/components/atoms/ui/table"
import { DataTableHeader } from "./DataTableHeader/DataTableHeader"
import { DataTableBody } from "./DataTableBody"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border flex-1">
      <Table>
        <DataTableHeader table={table} />
        <DataTableBody table={table} columns={columns} />
      </Table>
    </div>
  )
}