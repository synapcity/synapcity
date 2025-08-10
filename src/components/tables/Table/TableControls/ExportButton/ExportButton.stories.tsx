/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Meta, StoryObj } from '@storybook/nextjs-vite';
// import { ExportButton } from './ExportButton';
// import { DEFAULT_FORMATS } from './FormatSelect';
// import { ModalRenderer } from '@/components/modals';
// import { useRef } from 'react';

// const sampleData = [
//   { id: '1', name: 'Alice', score: 92 },
//   { id: '2', name: 'Bob', score: 85 },
//   { id: '3', name: 'Carol', score: 78 },
// ];
// const emptyData: Record<string, any>[] = [];
// const numericData = [
//   { id: '1', value: 100 },
//   { id: '2', value: 200 },
//   { id: '3', value: 300 },
// ];
// const nestedData = [
//   { id: '1', info: { a: 1, b: 2 } },
//   { id: '2', info: { a: 3, b: 4 } },
// ];

// // Lexical content shapes
// const rawLexicalData = [
//   {
//     id: '1',
//     type: 'paragraph',
//     children: [
//       { text: 'Hello ' },
//       { text: 'world', bold: true }
//     ],
//   },
//   {
//     id: '2',
//     type: 'heading',
//     level: 2,
//     children: [
//       { text: 'Export Demo' }
//     ],
//   },
// ];

// const flattenedLexicalData = rawLexicalData.map(node => ({
//   content: node.children.map((child: any) => child.text).join('')
// }));

// const meta: Meta<typeof ExportButton> = {
//   title: 'Table/ExportButton',
//   component: ExportButton,
//   argTypes: {
//     data: {
//       control: { type: 'object' },
//       description: 'Array of objects or text rows for export',
//       table: { type: { summary: 'Record<string, any>[]' } },
//     },
//     mergeNested: { control: 'boolean' },
//     exportFormats: {
//       control: { type: 'object', },
//       options: DEFAULT_FORMATS
//     },
//     dataType: { control: 'radio', options: ['lexical', 'default', 'nested', 'flattened'] },
//     exportAs: { control: 'radio', options: ['table', 'document'] }
//   },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} />
//       </div>
//     )
//   }
// };

// export default meta;
// type Story = StoryObj<typeof ExportButton>;

// export const TabularData: Story = {
//   args: { data: sampleData, exportAs: "table", exportFormats: ["csv", "xlsx", "json"] },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='tab-data' />
//       </div>
//     )
//   }
// };
// export const EmptyData: Story = {
//   args: { data: emptyData },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='empty-data' />
//       </div>
//     )
//   }
// };
// export const NumericData: Story = {
//   args: { data: numericData },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='numeric-data' />
//       </div>
//     )
//   }
// };
// export const NestedData: Story = {
//   args: { data: nestedData },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='nested-data' />
//       </div>
//     )
//   }
// };
// export const RawLexicalExport: Story = {
//   name: 'Raw Lexical Export (JSON)',
//   args: { data: rawLexicalData, exportFormats: ["json", "xlsx"], dataType: "lexical" },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='lexical-data' />
//       </div>
//     )
//   }
// };
// export const FlattenedLexicalExport: Story = {
//   name: 'Flattened Lexical Export (Text/PDF)',
//   args: { data: flattenedLexicalData, exportFormats: ["pdf"], exportAs: "document", dataType: "lexical" },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='flattened-data' />
//       </div>
//     )
//   }
// };

// export const NestedMerged: Story = {
//   args: {
//     data: nestedData,
//     mergeNested: true,
//   },
//   render: (props) => {
//     const containerRef = useRef<HTMLDivElement | null>(null)
//     return (
//       <div ref={containerRef}>
//         <ExportButton {...props} />
//         <ModalRenderer scope="global" container={containerRef} instanceId='nested-merged-data' />
//       </div>
//     )
//   }
// };
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExportButton } from "./ExportButton";
import { ModalRenderer } from "@/components/modals";
import { useRef } from "react";
import { z } from "zod";
import type { FieldDefinitionMap } from "@/types/form";

// -----------------------------
// Sample Data
// -----------------------------
const sampleData = [
  { id: "1", name: "Alice", score: 92 },
  { id: "2", name: "Bob", score: 85 },
  { id: "3", name: "Carol", score: 78 },
];
const emptyData: Record<string, any>[] = [];
const numericData = [
  { id: "1", value: 100 },
  { id: "2", value: 200 },
  { id: "3", value: 300 },
];
const nestedData = [
  { id: "1", info: { a: 1, b: 2 } },
  { id: "2", info: { a: 3, b: 4 } },
];
const rawLexicalData = [
  {
    id: "1",
    type: "paragraph",
    children: [{ text: "Hello " }, { text: "world", bold: true }],
  },
  {
    id: "2",
    type: "heading",
    level: 2,
    children: [{ text: "Export Demo" }],
  },
];
const flattenedLexicalData = rawLexicalData.map((node) => ({
  content: node.children.map((child: any) => child.text).join(""),
}));

// -----------------------------
// Schemas + Field Maps
// -----------------------------
const defaultSchema = z.object({
  fileName: z.string().min(1, "Required"),
});
const defaultFieldMap: FieldDefinitionMap = {
  fileName: {
    name: "fileName",
    label: "File Name",
    type: "text",
    meta: { required: true },
  },
};

const lexicalSchema = z.object({
  fileName: z.string().min(1),
  exportTitle: z.string().optional(),
});
const lexicalFieldMap: FieldDefinitionMap = {
  fileName: {
    name: "fileName",
    label: "File Name",
    type: "text",
    meta: { required: true },
  },
  exportTitle: {
    name: "exportTitle",
    label: "Title",
    type: "text",
  },
};

const meta: Meta<typeof ExportButton> = {
  title: "Table/ExportButton",
  component: ExportButton,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ExportButton>;

function withModalRenderer(
  props: any,
  instanceId: string = "default",
  schema = defaultSchema,
  fieldMap = defaultFieldMap,
  defaultValues = { fileName: "export", exportTitle: "" }
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={containerRef}>
      <ExportButton {...props} schema={schema} fieldMap={fieldMap} defaultValues={defaultValues} />
      <ModalRenderer scope="global" container={containerRef} instanceId={instanceId} />
    </div>
  );
}

export const TabularData: Story = {
  args: {
    data: sampleData,
    exportAs: "table",
    exportFormats: ["csv", "xlsx", "json"],
  },
  render: (props) => withModalRenderer(props, "tabular-data"),
};

export const EmptyData: Story = {
  args: {
    data: emptyData,
  },
  render: (props) => withModalRenderer(props, "empty-data"),
};

export const NumericData: Story = {
  args: {
    data: numericData,
  },
  render: (props) => withModalRenderer(props, "numeric-data"),
};

export const NestedData: Story = {
  args: {
    data: nestedData,
  },
  render: (props) => withModalRenderer(props, "nested-data"),
};

export const NestedMerged: Story = {
  args: {
    data: nestedData,
    mergeNested: true,
  },
  render: (props) => withModalRenderer(props, "nested-merged"),
};

export const RawLexicalExport: Story = {
  name: "Raw Lexical Export (JSON)",
  args: {
    data: rawLexicalData,
    exportFormats: ["json", "xlsx"],
    dataType: "lexical",
  },
  render: (props) =>
    withModalRenderer(props, "lexical-data", lexicalSchema, lexicalFieldMap, {
      fileName: "lexical",
      exportTitle: "My Export",
    }),
};

export const FlattenedLexicalExport: Story = {
  name: "Flattened Lexical Export (Text/PDF)",
  args: {
    data: flattenedLexicalData,
    exportAs: "document",
    exportFormats: ["pdf", "txt"],
    dataType: "lexical",
  },
  render: (props) =>
    withModalRenderer(props, "flattened-lexical", lexicalSchema, lexicalFieldMap, {
      fileName: "flattened",
      exportTitle: "Flattened View",
    }),
};
