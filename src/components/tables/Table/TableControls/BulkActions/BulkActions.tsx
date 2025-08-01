/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components";

export function BulkActions({ table, onBulkDelete }: { table: Table<any>; onBulkDelete: () => void }) {
  const selected = table.getSelectedRowModel().rows;
  if (!selected.length) return null;
  return (
    <Button variant="destructive" onClick={onBulkDelete}>
      Delete {selected.length} selected
    </Button>
  );
}
