/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TableCell from './TableCell';
import type { Row, Cell } from '@tanstack/react-table';

const metaCell: Meta<typeof TableCell> = {
  title: 'Table/TableCell',
  component: TableCell,
  tags: ['autodocs'],
};
export default metaCell;

type StoryCell = StoryObj<typeof TableCell>;

function makeCell(id: string, content: any): Cell<any, any> {
  return {
    id,
    column: { id, columnDef: { cell: () => content } },
    getValue: () => content,
    getContext: () => ({}),
  } as unknown as Cell<any, any>;
}
const fakeRow = { original: { id: '1' } } as unknown as Row<any>;

export const Plain: StoryCell = {
  args: {
    cell: makeCell('name', 'Hello World'),
    row: fakeRow,
    onDelete: () => { },
    onUpdate: () => { },
  },
};

export const LinkedResources: StoryCell = {
  args: {
    cell: makeCell('linkedResources', [{ resourceId: '1', label: 'Res', type: 'note' }]),
    row: fakeRow,
    onDelete: () => { },
    onUpdate: () => { },
  },
};

export const Actions: StoryCell = {
  args: {
    cell: makeCell('actions', null),
    row: fakeRow,
    onDelete: (id: string) => console.log(id),
    onUpdate: () => { },
  },
};
