'use client';

import { Table } from '@tanstack/react-table';

type TableControlsProps<TData> = { table: Table<TData> };

export function TableControls<TData>({ table }: TableControlsProps<TData>) {
  return (
    <div className="flex justify-between items-center p-2 border-b bg-muted">
      <span className="font-semibold">Table Controls</span>
      <div className="flex space-x-4">
        {table.getAllLeafColumns().map((column) => (
          <label
            key={column.id}
            className="inline-flex items-center text-sm"
          >
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
              className="mr-1"
            />
            {column.id}
          </label>
        ))}
      </div>
    </div>
  );
}
