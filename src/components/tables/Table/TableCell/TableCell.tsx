/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from "react";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import LinkedResourcesCell from "./LinkedResourcesCell/LinkedResourcesCell";
import RowActionsCell from "./RowActionsCell/RowActionsCell";
import { UITableCell } from "@/components/atoms/ui"

export default function TableCell({ cell, row, onUpdate, onDelete }: { cell: Cell<any, any>, row: Row<any>, onUpdate: any, onDelete: any }) {
  const { column } = cell;

  if (column.id === "linkedResources") {
    return <td><LinkedResourcesCell resources={cell.getValue()} /></td>;
  }
  if (column.id === "actions") {
    return <td><RowActionsCell row={row.original} onDelete={onDelete} onUpdate={onUpdate} /></td>;
  }

  return (
    <UITableCell>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </UITableCell>
  )
}
