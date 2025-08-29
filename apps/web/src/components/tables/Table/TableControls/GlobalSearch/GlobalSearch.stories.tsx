/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlobalSearch } from "./GlobalSearch";
import { useReactTable, getCoreRowModel, getFilteredRowModel, Table } from "@tanstack/react-table";

interface Person {
  firstName: string;
  lastName: string;
}

// Sample dataset
const sampleData: Person[] = [
  { firstName: "Alice", lastName: "Johnson" },
  { firstName: "Bob", lastName: "Smith" },
  { firstName: "Charlie", lastName: "Brown" },
];

// Wrapper component to accept initialFilter as a prop
interface GlobalSearchWrapperProps {
  initialFilter?: string;
}

const GlobalSearchWrapper: React.FC<GlobalSearchWrapperProps> = ({ initialFilter = "" }) => {
  const table = useReactTable<Person>({
    data: sampleData,
    columns: [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
    ],
    state: { globalFilter: initialFilter },
    onGlobalFilterChange: () => {},
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return <GlobalSearch table={table as Table<any>} />;
};

const meta: Meta<typeof GlobalSearchWrapper> = {
  title: "Table/GlobalSearch",
  component: GlobalSearchWrapper,
  tags: ["autodocs"],
  argTypes: {
    initialFilter: { control: "text", name: "Initial Filter" },
  },
};

export default meta;

type Story = StoryObj<typeof GlobalSearchWrapper>;

export const Default: Story = {
  args: { initialFilter: "" },
};

export const WithInitialFilter: Story = {
  args: { initialFilter: "Bob" },
};

export const Playground: Story = {
  args: { initialFilter: "" },
};
