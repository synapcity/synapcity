// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { TableRow, TableCell } from "@/components/atoms/ui/table";
// import React from "react";
// import { ColumnDef } from "@tanstack/react-table";

// export function UIDraggableRow({ id, row, columns, children }: { id: string; row?: any, columns?: ColumnDef<any>[]; children: React.ReactNode; }) {
//   console.log(`row:`, columns)
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   return (
//     <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {row.getVisibleCells().map((cell: any) => (
//         <TableCell key={cell.id}>
//           {children}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableRowProps {
  id: string;
  children?: React.ReactNode;
}

export const UIDraggableRow = ({ id, children }: DraggableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-move">
      {children}
    </tr>
  );
};
