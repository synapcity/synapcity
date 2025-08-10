/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Table } from "@tanstack/react-table";
import TablePagination from "./TablePagination";

const metaPag: Meta<typeof TablePagination> = {
  title: "Table/TablePagination",
  component: TablePagination,
  tags: ["autodocs"],
};
export default metaPag;

type StoryPag = StoryObj<typeof TablePagination>;

const makeTable = (canPrev: boolean, canNext: boolean, pageIndex: number, pageCount: number) =>
  ({
    previousPage: () => {},
    nextPage: () => {},
    getCanPreviousPage: () => canPrev,
    getCanNextPage: () => canNext,
    getState: () => ({ pagination: { pageIndex } }),
    getPageCount: () => pageCount,
  }) as unknown as Table<any>;

export const FirstPage: StoryPag = { args: { table: makeTable(false, true, 0, 5) } };
export const MiddlePage: StoryPag = { args: { table: makeTable(true, true, 2, 5) } };
export const LastPage: StoryPag = { args: { table: makeTable(true, false, 4, 5) } };
