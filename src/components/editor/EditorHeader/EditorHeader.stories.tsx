import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EditorHeader from './EditorHeader';

const meta: Meta<typeof EditorHeader> = {
  title: 'Components/EditorHeader',
  component: EditorHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof EditorHeader>;

export const Default: Story = {};
