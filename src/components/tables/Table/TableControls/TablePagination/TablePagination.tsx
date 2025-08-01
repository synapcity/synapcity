'use client';

import { Table } from "@tanstack/react-table";
import { Button } from "@/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TablePagination({ table }: { table: Table<any> }) {
  return (
    <div className="flex justify-end gap-2 p-2 border-t bg-muted">
      <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</Button>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      <span className="ml-2 text-xs">{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</span>
    </div>
  );
}
