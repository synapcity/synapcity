/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, Row } from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import TableCell from "../TableCell/TableCell";
import { TableBody, TableRow, TableCell as Cell } from "@/components/atoms/ui/table";
export default function TableRows({
  table,
  onUpdate,
  onDelete,
  reorderRows,
}: {
  table: Table<any>;
  onUpdate: (id: string, updates: Record<string, any>) => void;
  onDelete: (id: string) => void;
  reorderRows: (rows: any[]) => void;
}) {
  const rows = table.getRowModel().rows;
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);

    const newOrder = arrayMove(rows, oldIndex, newIndex).map((row) => row.original);
    reorderRows(newOrder);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <TableBody className="size-full">
          {rows.length === 0 && (
            <TableRow className="size-full flex items-center justify-around">
              <Cell colSpan={table.getAllLeafColumns().length} className="py-4 ">
                No data.
              </Cell>
            </TableRow>
          )}
          {rows.map((row) => (
            <SortableRow key={row.id} row={row} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </TableBody>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({ row, onUpdate, onDelete }: { row: Row<any>; onUpdate: any; onDelete: any }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? "var(--color-muted)" : undefined,
  };
  return (
    <TableRow ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} row={row} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </TableRow>
  );
}
