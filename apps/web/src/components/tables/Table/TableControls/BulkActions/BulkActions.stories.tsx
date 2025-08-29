import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { action } from "storybook/actions";
import { BulkActions } from "./BulkActions";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
} from "@/components/atoms/ui/table";

type Person = { id: string; name: string; age: number };

const sampleData: Person[] = [
  { id: "1", name: "Alice", age: 28 },
  { id: "2", name: "Bob", age: 34 },
  { id: "3", name: "Carol", age: 22 },
];

const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        {...{
          checked: table.getIsAllRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        {...{
          checked: row.getIsSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
];

interface TableWithBulkProps {
  initialSelection?: RowSelectionState;
}

const TableWithBulk: React.FC<TableWithBulkProps> = ({ initialSelection = {} }) => {
  const [data] = useState(() => [...sampleData]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(initialSelection);

  const table = useReactTable<Person>({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: 24 }}>
      <Table border={1} cellPadding={8}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TableFooter style={{ marginTop: 16 }}>
        <BulkActions
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          table={table as unknown as TanstackTable<any>}
          onBulkDelete={action("onBulkDelete")}
        />
      </TableFooter>
    </div>
  );
};

const meta: Meta<typeof BulkActions> = {
  title: "Table/BulkActions",
  component: BulkActions,
};

export default meta;
type Story = StoryObj<typeof BulkActions>;

export const NoSelection: Story = {
  render: () => <TableWithBulk initialSelection={{}} />,
  name: "No Rows Selected",
};

export const SomeSelected: Story = {
  render: () => <TableWithBulk initialSelection={{ "1": true, "3": true }} />,
  name: "Some Rows Selected",
};
