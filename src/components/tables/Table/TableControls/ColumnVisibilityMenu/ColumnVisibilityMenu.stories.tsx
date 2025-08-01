/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  VisibilityState,
  Table as TanstackTable,
} from '@tanstack/react-table';
import { ColumnVisibilityMenu } from './ColumnVisibilityMenu';

type Person = { id: string; name: string; age: number };

const sampleData: Person[] = [
  { id: '1', name: 'Alice', age: 28 },
  { id: '2', name: 'Bob', age: 34 },
  { id: '3', name: 'Carol', age: 22 },
];

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

interface TableWithMenuProps {
  initialVisibility?: VisibilityState;
}

const TableWithMenu: React.FC<TableWithMenuProps> = ({
  initialVisibility = {},
}) => {
  const [data] = useState(() => [...sampleData]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(initialVisibility);

  const table = useReactTable<Person>({
    data,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: 24 }}>
      <ColumnVisibilityMenu table={table as unknown as TanstackTable<any>} />

      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}
        border={1}
        cellPadding={8}
      >
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta: Meta<typeof ColumnVisibilityMenu> = {
  title: 'Table/Column Visibility Menu',
  component: ColumnVisibilityMenu,
};

export default meta;

type Story = StoryObj<typeof ColumnVisibilityMenu>;

export const AllColumnsVisible: Story = {
  render: () => <TableWithMenu />,
};

export const HideAgeColumn: Story = {
  render: () => <TableWithMenu initialVisibility={{ age: false }} />,
};
