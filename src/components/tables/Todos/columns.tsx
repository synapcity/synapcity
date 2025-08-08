"use client"

import { ComponentUIState } from "@/stores";
import { ThemePreferences } from "@/theme";
import { ColumnDef } from "@tanstack/react-table"
import { BaseResource as BaseEntity } from "@/stores";

export type ItemStatus = "done" | "not-started" | "in-progress";

export type Item = BaseEntity & {
  content: string;
  status: ItemStatus;
}
export type ListUIState<T> = ComponentUIState & {
  sortBy: keyof T;
  sortOrder: "asc" | "desc";
  selectedId: string | null;
  batchSelectedIds: string[];
};

export interface ListConfig<T> {
  itemOrder?: string[];
  itemsPerPage?: number;
  defaultSort?: keyof T;
  defaultFilter?: { status?: ItemStatus; search?: string };
  defaultView?: "list" | "board" | "calendar";
}

export type ListTheme = ThemePreferences & {
  icon?: string;
};

export type List<T extends BaseEntity> = BaseEntity & {
  name?: string;
  type: string;
  parentId?: string;
  parentType?: string;
  description?: string;
  tags?: string[];
  theme?: ListTheme;
  config?: ListConfig<T>;
  items: T[];
  meta: ListUIState<T>;
};

export const todoColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "done?",
    header: () => { },
  },
  {
    accessorKey: "content",
    header: () => { },
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("content")}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  }
]



