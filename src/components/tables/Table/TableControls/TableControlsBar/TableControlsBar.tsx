/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { ColumnVisibilityMenu } from "../ColumnVisibilityMenu";
import { GlobalSearch } from "../GlobalSearch";
import { BulkActions } from "../BulkActions";
import { DynamicTabsBar, TabOption } from "../DynamicTabsBar";
import { ExportButton } from "../ExportButton";

export default function TableControlsBar({ table, data, onBulkDelete, tabs }: {
  table: Table<any>;
  data: any[];
  onBulkDelete: () => void;
  tabs: TabOption[];
}) {

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 p-3 border-b bg-muted rounded-t-lg">
      <div className="flex items-center gap-3">
        <ColumnVisibilityMenu table={table} />
        <DynamicTabsBar onAdd={() => console.log("adding new tab")} tabs={tabs} />
      </div>
      <div className="flex items-center gap-2">
        <GlobalSearch table={table} />
        <ExportButton data={data} />
        <BulkActions table={table} onBulkDelete={onBulkDelete} />
      </div>
    </div>
  );
}
