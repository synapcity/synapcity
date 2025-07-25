import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DynamicTabsBar } from './DynamicTabsBar';
import { useNoteViewStore } from '@/stores';

const meta: Meta<typeof DynamicTabsBar> = {
  title: 'Table/DynamicTabsBar',
  component: DynamicTabsBar,
  argTypes: {
    tabs: [{
      label: "string",
      value: "string"
    }],
    onAdd: () => useNoteViewStore.getState().addView("note-123")
  },
}

export default meta;
type Story = StoryObj<typeof DynamicTabsBar>;

const Template: Story = {
  render: (args) => {
    return (
      <DynamicTabsBar
        {...args}
      />

    );
  },
};

export const Default: Story = {
  ...Template,
  name: 'Default Tabs',
  args: {
    tabs: [
      {
        label: "All",
        value: "all"
      },
      {
        label: "Completed",
        value: "completed"
      },
      {
        label: "To Do",
        value: "todo"
      },
    ],
  },
};

export const CustomTabs: Story = {
  ...Template,
  args: {
    tabs: [{
      label: "Drafts",
      value: "drafts"
    }, {
      label: "Published",
      value: "published"
    }, {
      label: "Archived",
      value: "archived"
    }],
  },
};
