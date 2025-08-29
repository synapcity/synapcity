/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Table } from "@tanstack/react-table";
import TableHeader from "./TableHeader";

const metaHeader: Meta<typeof TableHeader> = {
  title: "Table/TableHeader",
  component: TableHeader,
  tags: ["autodocs"],
};
export default metaHeader;

type StoryHeader = StoryObj<typeof TableHeader>;

const fakeTableDefault = {
  getHeaderGroups: () => [
    {
      id: "group-1",
      headers: [
        {
          id: "col-1",
          isPlaceholder: false,
          column: { columnDef: { header: "Name" } } as any,
          getContext: () => ({}) as any,
        },
        {
          id: "col-2",
          isPlaceholder: true,
          column: { columnDef: { header: "Hidden" } } as any,
          getContext: () => ({}) as any,
        },
      ],
    },
  ],
} as unknown as Table<any>;

export const DefaultHeader: StoryHeader = { args: { table: fakeTableDefault } };
export const MultipleColumns: StoryHeader = {
  args: {
    table: {
      getHeaderGroups: () => [
        {
          id: "hg1",
          headers: [
            {
              id: "h1",
              isPlaceholder: false,
              column: { columnDef: { header: "ID" } } as any,
              getContext: () => ({}) as any,
            },
            {
              id: "h2",
              isPlaceholder: false,
              column: { columnDef: { header: "Name" } } as any,
              getContext: () => ({}) as any,
            },
            {
              id: "h3",
              isPlaceholder: false,
              column: { columnDef: { header: "Status" } } as any,
              getContext: () => ({}) as any,
            },
          ],
        },
      ],
    } as unknown as Table<any>,
  },
};
