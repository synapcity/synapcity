"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import React from "react";
import TableHeader from "../TableHeader/TableHeader";
import TableRows from "../TableRows/TableRows";
import { TableControls } from "../TableControls/TableControls";
import TablePagination from "../TableControls/TablePagination/TablePagination";
import { getDynamicColumns } from "../getDynamicColumns";
import { RowData } from "@/types/table";
import { Table } from "@/components/atoms/ui/table";

export default function TableRoot({
  data,
  onUpdate,
  onDelete,
  reorderRows,
}: {
  data: RowData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (id: string, updates: Record<string, any>) => void;
  onDelete: (id: string) => void;
  reorderRows: (rows: RowData[]) => void;
}) {
  const columns = React.useMemo(() => getDynamicColumns(onUpdate, onDelete), [onUpdate, onDelete]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
  });

  return (
    <div className="rounded-lg border bg-(--background) text-(--foreground) focus:bg-(--foreground) focus:text-(--background) shadow">
      <TableControls table={table} />
      <Table className="min-w-full text-sm flex flex-col items-center justify-around w-full">
        <TableHeader table={table} />
        <TableRows
          table={table}
          onUpdate={onUpdate}
          onDelete={onDelete}
          reorderRows={reorderRows}
        />
      </Table>
      <TablePagination table={table} />
    </div>
  );
}
