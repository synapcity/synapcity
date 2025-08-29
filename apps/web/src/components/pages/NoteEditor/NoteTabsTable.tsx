// 'use client';

// import React, { useMemo } from 'react';
// import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/atoms/ui/table';
// import { Active, DndContext, Over, closestCenter } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
// import { useNoteViewStore } from '@/stores/noteViewStore/useNoteViewStore';

// interface NoteTabsTableProps {
//   /** The ID of the note whose tabs we are rendering */
//   noteId: string;
// }

// /**
//  * Renders the note editor tabs for a given noteId as a sortable table,
//  * using the centralized useTabsStore slice.
//  */
// export function NoteTabsTable({ noteId }: NoteTabsTableProps) {
//   // const tabMap = useTabsStore((s) => s.tabs['note']?.[noteId] ?? {});

//   const getTabsFor = useNoteViewStore(s => s.)
//   const tabMap = useMemo(() => getTabsFor ? getTabsFor(noteId) : {}, [getTabsFor, noteId])
//   const tabs = useMemo(() => Object.values(tabMap ?? {}), [tabMap]) as Tab[];
//   const allActiveTabs = useNoteViewStore((s) => s.)
//   // const activeTabId = allActiveTabs ? allActiveTabs[noteId] : ""
//   // const activeTabId = useTabsStore((s) => s.getActiveTabId('note', noteId)) ?? '';
//   // const setActive = useTabsStore((s) => s.setActiveTab);
//   // const setTabs = useTabsStore((s) => s.setTabs);
//   // const deleteTab = useTabsStore((s) => s.deleteTab);

//   React.useEffect(() => {
//     const currentTabs = useTabsStore.getState().tabs['note']?.[noteId] ?? {};
//     if (Object.keys(currentTabs).length === 0) {
//       useTabsStore.getState().createTab('note', noteId, { label: 'Untitled', content: '' });
//       const firstTabId = Object.keys(useTabsStore.getState().tabs['note'][noteId])[0];
//       useTabsStore.getState().setActiveTab('note', noteId, firstTabId);
//     }
//   }, [noteId]);

//   const columns = useMemo<ColumnDef<NoteTab>[]>(
//     () => [
//       {
//         accessorKey: 'label',
//         header: 'Tab',
//         cell: ({ getValue, row }) => (
//           <button
//             className={row.original.id === activeTabId ? 'font-semibold' : 'text-gray-700'}
//             onClick={() => setActive('note', noteId, row.original.id)}
//           >
//             {getValue<string>()}
//           </button>
//         ),
//       },
//       {
//         accessorKey: 'dirty',
//         header: 'Unsaved',
//         cell: ({ getValue }) => (getValue<boolean>() ? '●' : ''),
//       },
//       {
//         accessorKey: 'lastEdited',
//         header: 'Last Edited',
//         cell: ({ getValue }) => new Date(getValue<number>()).toLocaleDateString(),
//       },
//       {
//         id: 'actions',
//         header: '',
//         cell: ({ row }) => (
//           <button
//             aria-label="Close tab"
//             className="text-sm"
//             onClick={() => deleteTab('note', noteId, row.original.id)}
//           >
//             ✕
//           </button>
//         ),
//       },
//     ],
//     [activeTabId, noteId, setActive, deleteTab]
//   );

//   // Table instance
//   const table = useReactTable({ data: Object.values(tabs) as unknown as NoteTab[], columns, getCoreRowModel: getCoreRowModel() });

//   // Handle drag-and-drop to reorder tabs
//   const handleDragEnd = ({ active, over }: { active: Active; over: Over | null }) => {
//     if (over && active.id !== over.id) {
//       // const oldIndex = tabs.findIndex((t) => t.id === active.id);
//       // const newIndex = tabs.findIndex((t) => t.id === over.id);
//       // const reordered = arrayMove(tabs, oldIndex, newIndex);
//       // setTabs('note', noteId, reordered);
//     }
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <SortableContext items={tabs.map(t => t?.id)} strategy={verticalListSortingStrategy}>
//         <div className="overflow-auto">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((hg) => (
//                 <TableRow key={hg.id}>
//                   {hg.headers.map((header) => (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())
//                       }
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} data-id={row.original?.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </SortableContext>
//     </DndContext>
//   );
// }

export const NoteTabTable = () => {
  return <div>Tabs</div>;
};
