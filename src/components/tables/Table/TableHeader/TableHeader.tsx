/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { flexRender, Table } from "@tanstack/react-table";

export default function TableHeader({ table }: { table: Table<any> }) {
  return (
    <thead className="bg-muted">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())
              }
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
