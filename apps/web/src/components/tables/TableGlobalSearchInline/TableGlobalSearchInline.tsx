"use client";

import React, { useState, useMemo, RefObject } from "react";
import ReactDOM from "react-dom";
import type { Table, RowData } from "@tanstack/react-table";

// interface InlineSearchItem {
//   id: string;
//   label: string;
//   onSelect: () => void;
// }

/**
 * Renders a text input and a list of matching rows inline (or into
 * a custom container via portal).
 */
export function TableGlobalSearchInline<TData extends RowData>({
  table,
  resultsContainerRef,
  inputClassName = "border rounded px-2 py-1",
  resultsClassName = "mt-1 border rounded bg-white shadow max-h-60 overflow-auto",
}: {
  table: Table<TData>;
  resultsContainerRef?: RefObject<HTMLElement | null>;
  inputClassName?: string;
  resultsClassName?: string;
}) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    return table
      .getCoreRowModel()
      .rows.map((row) => {
        const label = row
          .getAllCells()
          .map((cell) => String(cell.getValue()))
          .join(" ");

        return {
          id: row.id,
          label,
          onSelect: () => {
            setQuery(label);
            table.setGlobalFilter(label);
          },
        };
      })
      .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [table, query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    table.setGlobalFilter(v);
  };

  const ResultsList = (
    <div className={resultsClassName}>
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            onClick={item.onSelect}
          >
            {item.label}
          </div>
        ))
      ) : (
        <div className="px-2 py-1 text-gray-500">No results found.</div>
      )}
    </div>
  );

  return (
    <>
      <input
        type="text"
        className={inputClassName}
        placeholder="Search rows…"
        value={query}
        onChange={handleChange}
      />

      {resultsContainerRef && resultsContainerRef.current
        ? ReactDOM.createPortal(ResultsList, resultsContainerRef.current)
        : ResultsList}
    </>
  );
}
