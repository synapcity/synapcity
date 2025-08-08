/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import { TableGlobalSearchInline } from './TableGlobalSearchInline';
import type { Table } from '@tanstack/react-table';

type DataRow = {
  id: string;
  firstName: string;
  lastName: string;
};

const rawRows: DataRow[] = [
  { id: '1', firstName: 'Alice', lastName: 'Johnson' },
  { id: '2', firstName: 'Bob', lastName: 'Smith' },
  { id: '3', firstName: 'Carol', lastName: 'Brown' },
];

const makeStubTable = (
  rows: DataRow[],
  onFilter: (val: string) => void
): Table<unknown> => ({
  getCoreRowModel: () => ({
    rows: rows.map((r) => ({
      id: r.id,
      getAllCells: () => [
        { getValue: () => r.firstName },
        { getValue: () => r.lastName },
      ],
    } as any)),
  }),
  setGlobalFilter: onFilter,
} as any);

const meta: Meta<typeof TableGlobalSearchInline> = {
  title: 'Components/TableGlobalSearchInline',
  component: TableGlobalSearchInline,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableGlobalSearchInline>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 300 }}>
      <TableGlobalSearchInline
        table={makeStubTable(rawRows, action('filterChanged'))}
      />
    </div>
  ),
};

export const Portaled: Story = {
  render: () => {
    const Wrapper: React.FC = () => {
      const containerRef = React.useRef<HTMLDivElement>(null);
      return (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TableGlobalSearchInline
            table={makeStubTable(rawRows, action('filterChanged'))}
            resultsContainerRef={containerRef}
          />
          <div
            ref={containerRef}
            style={{ height: 120, border: '1px solid #ccc', overflow: 'auto', padding: 8 }}
          />
        </div>
      );
    };
    return <Wrapper />;
  },
};

export const EmptyResults: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 300 }}>
      <TableGlobalSearchInline
        table={makeStubTable([], action('filterChanged'))}
      />
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ padding: 16, maxWidth: 300 }}>
      <TableGlobalSearchInline
        table={makeStubTable(rawRows, action('filterChanged'))}
        inputClassName="border-2 border-blue-500 rounded-lg p-2"
        resultsClassName="mt-1 border-2 border-green-500 rounded-lg bg-gray-50 p-2 max-h-48 overflow-auto"
      />
    </div>
  ),
};
