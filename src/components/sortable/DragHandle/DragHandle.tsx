/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { GripVerticalIcon } from "lucide-react";

export interface GripHandleProps {
  [key: string]: any;
  isDragging?: boolean;
  className?: string;
  children: React.ReactNode;
  position?: "left" | "right";
}


export const DragHandle = ({ isDragging, position = "left", className, children, ...props }: GripHandleProps) => {
  return (
    <div
      className={clsx(
        "cursor-grab select-none inline-flex items-center gap-2 relative w-full interactive", {
        "cursor-grabbing": isDragging,
        "opacity-50": isDragging,
        "opacity-100": !isDragging,
        "pl-6": position === "left",
        "pr-6": position === "right",
      }
      )}
      data-testid="drag-handle"
      {...props}
    >
      <GripVerticalIcon role="img" className={clsx("w-5 h-5 text-gray-400 absolute interactive", className, {
        "opacity-50": isDragging,
        "opacity-100": !isDragging,
        "left-0": position === "left",
        "right-0": position === "right",
      })} aria-hidden="true" />
      {children}
    </div >

  )
}