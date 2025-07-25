/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RowActionsCell from './RowActionsCell';

const metaRow: Meta<typeof RowActionsCell> = {
  title: 'Table/RowActionsCell',
  component: RowActionsCell,
  tags: ['autodocs'],
};
export default metaRow;

type StoryRow = StoryObj<typeof RowActionsCell>;

export const Default: StoryRow = {
  args: {
    row: { id: '1', name: 'Sample Row' },
    onDelete: (id: string) => console.log('delete', id),
    onUpdate: (id: string, updates: Record<string, any>) => console.log('update', id, updates),
  },
};

export const NoActions: StoryRow = {
  args: {
    row: { id: '2' },
    onDelete: undefined,
    onUpdate: undefined,
  },
};