/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IconButton } from "@/components";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/atoms/ui/dropdown-menu";

export default function RowActionsCell({ row, onDelete, onUpdate }: { row: any; onDelete: (id: string) => void; onUpdate: (id: string, updates: Record<string, any>) => void; }) {
  return (
    <div className="flex gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="sm"
            icon="moreHorizontal"
            tooltip="Click to open menu"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => onUpdate(row?.id, {})}>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(row?.id)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}