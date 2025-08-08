/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState, forwardRef } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import TableControlsBar from './TableControlsBar';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  Table,
} from '@tanstack/react-table';
import { TabOption } from '../DynamicTabsBar';


type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

const sampleData: Person[] = [
  { firstName: 'Alice', lastName: 'Johnson', age: 30 },
  { firstName: 'Bob', lastName: 'Smith', age: 45 },
  { firstName: 'Carol', lastName: 'Williams', age: 27 },
  { firstName: 'Dave', lastName: 'Brown', age: 52 },
];

const columnHelper = createColumnHelper<Person>();
const columns = [
  columnHelper.accessor('firstName', { header: 'First Name' }),
  columnHelper.accessor('lastName', { header: 'Last Name' }),
  columnHelper.accessor('age', { header: 'Age' }),
];

interface TableControlsWrapperProps {
  initialSelection?: Record<number, boolean>;
  onBulkDelete?: () => void;
}

const TableControlsWrapper = forwardRef<any, TableControlsWrapperProps>(
  ({ initialSelection = {}, onBulkDelete = () => { } }, ref) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState<Record<number, boolean>>(initialSelection);
    const table = useReactTable<Person>({
      data: sampleData,
      columns,
      state: { globalFilter, rowSelection },
      onGlobalFilterChange: setGlobalFilter,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      enableRowSelection: true,
    });

    useEffect(() => {
      if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as any).current = { setGlobalFilter };
      }
    }, [ref]);

    const tabs: TabOption[] = [
      { label: "All Rows", value: "all" },
      { label: "Selected", value: "selected" },
      { label: "Archived", value: "archived" },
    ];
    return (
      <TableControlsBar table={table as Table<any>} data={sampleData} onBulkDelete={onBulkDelete} tabs={tabs} />
    );
  }
);

TableControlsWrapper.displayName = "TableControlsWrapper"

const meta: Meta<typeof TableControlsBar> = {
  title: 'Table/TableControlsBar',
  component: TableControlsBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TableControlsBar>;

export const Default: Story = {
  render: () => <TableControlsWrapper />,
};

export const WithSelection: Story = {
  render: () => <TableControlsWrapper initialSelection={{ 0: true, 2: true }} />,
};

export const ProgrammaticGlobalSearch: Story = {
  render: () => {
    const ref = React.useRef<{ setGlobalFilter: (filter: string) => void }>(null);
    React.useEffect(() => {
      setTimeout(() => {
        ref.current?.setGlobalFilter('Bob');
      }, 500);
    }, []);
    return <TableControlsWrapper ref={ref} />;
  },
};

export const ColumnVisibilityToggling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates toggling column visibility via the ColumnVisibilityMenu.',
      },
    },
  },
  render: () => <TableControlsWrapper />,
};
