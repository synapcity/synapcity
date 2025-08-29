/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  VisibilityState as ColumnVisibilityState,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { TableControls } from "./TableControls";

type Person = { id: string; name: string; age: number };

const sampleData: Person[] = [
  { id: "1", name: "Alice", age: 28 },
  { id: "2", name: "Bob", age: 34 },
  { id: "3", name: "Carol", age: 22 },
];

const columns: ColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
];

interface TableWithControlsProps {
  initialVisibility?: ColumnVisibilityState;
}

const TableWithControls: React.FC<TableWithControlsProps> = ({ initialVisibility = {} }) => {
  const [data] = useState(() => [...sampleData]);
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>(initialVisibility);

  const table = useReactTable<Person>({
    data,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: 24 }}>
      <TableControls table={table as unknown as TanstackTable<any>} />

      <table style={{ width: "100%", borderCollapse: "collapse" }} border={1} cellPadding={8}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta: Meta<typeof TableControls> = {
  title: "Table/Controls",
  component: TableControls,
};

export default meta;
type Story = StoryObj<typeof TableControls>;

export const Default: Story = {
  render: () => <TableWithControls />,
  name: "All Columns Visible",
};

export const HideAgeColumn: Story = {
  render: () => <TableWithControls initialVisibility={{ age: false }} />,
  name: "“Age” Column Hidden",
};
