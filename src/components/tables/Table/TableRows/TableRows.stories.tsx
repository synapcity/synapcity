/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Table, Row } from "@tanstack/react-table";
import TableRows from "./TableRows";

const metaRows: Meta<typeof TableRows> = {
  title: "Table/TableRows",
  component: TableRows,
  tags: ["autodocs"],
};
export default metaRows;

type StoryRows = StoryObj<typeof TableRows>;

function fakeCell(id: string, content: any) {
  return {
    id,
    column: { id, columnDef: { cell: () => content } } as any,
    getValue: () => content,
    getContext: () => ({}) as any,
  };
}
function makeRow(id: string, cells: [string, any][]): Row<any> {
  return {
    id,
    original: { id },
    getVisibleCells: () => cells.map(([cid, val]) => fakeCell(cid, val)),
  } as unknown as Row<any>;
}

const emptyTable = {
  getRowModel: () => ({ rows: [] }),
  getAllLeafColumns: () => [],
} as unknown as Table<any>;
const singleTable = {
  getRowModel: () => ({ rows: [makeRow("row-1", [["col-1", "One"]])] }),
  getAllLeafColumns: () => ["col-1"],
} as unknown as Table<any>;
const multiTable = {
  getRowModel: () => ({
    rows: [
      makeRow("row-1", [["col-1", "One"]]),
      makeRow("row-2", [["col-1", "Two"]]),
      makeRow("row-3", [["col-1", "Three"]]),
    ],
  }),
  getAllLeafColumns: () => ["col-1"],
} as unknown as Table<any>;

export const EmptyRows: StoryRows = {
  args: { table: emptyTable, onUpdate: () => {}, onDelete: () => {}, reorderRows: () => {} },
};
export const SingleRow: StoryRows = {
  args: { table: singleTable, onUpdate: () => {}, onDelete: () => {}, reorderRows: () => {} },
};
export const MultipleRows: StoryRows = {
  args: { table: multiTable, onUpdate: () => {}, onDelete: () => {}, reorderRows: () => {} },
};
