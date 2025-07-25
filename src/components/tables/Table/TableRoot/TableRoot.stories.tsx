import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TableRoot from './TableRoot';
import type { RowData } from '@/types/table';

const metaRoot: Meta<typeof TableRoot> = { title: 'Table/TableRoot', component: TableRoot, tags: ['autodocs'] };
export default metaRoot;

type StoryRoot = StoryObj<typeof TableRoot>;

const sampleData: RowData[] = [
  { id: '1', title: 'Alice', status: 'active', linkedResources: [] },
  { id: '2', title: 'Bob', status: 'completed', linkedResources: [{ resourceId: 'a', label: 'Doc A', type: 'note' }] },
];

export const DefaultRoot: StoryRoot = { args: { data: sampleData, onUpdate: id => console.log('update', id), onDelete: id => console.log('delete', id), reorderRows: rows => console.log('reorder', rows) } };
export const ManyRows: StoryRoot = { args: { data: Array.from({ length: 20 }).map((_, i) => ({ id: `${i}`, title: `User ${i}`, status: 'active', linkedResources: [] })), onUpdate: () => { }, onDelete: () => { }, reorderRows: () => { } } };
