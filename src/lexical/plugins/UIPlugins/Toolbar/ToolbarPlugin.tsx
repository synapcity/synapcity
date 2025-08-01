"use client";

import UndoRedoTools from "./UndoRedoTools";
import ListTools from "./ListTools";
import TextFormat from "./TextFormat";
import AlignmentTools from "./AlignmentTools";
import BlockStyleTools from "./BlockStyleTools";
import clsx from "clsx";
import { Button } from "@/components";
export default function Toolbar() {
  return (
    <div
      className={clsx(
        "fixed left-0 bottom-0 justify-evenly md:relative w-full flex gap-4 p-2 border-t md:border-t-0 md:border-r shadow-lg",
        "overflow-x-auto overscroll-contain h-12 no-scrollbar max-w-screen shrink-0 group opacity-50 group-hover:opacity-100"
      )}
    >
      <ToolbarSection>
        <UndoRedoTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <TextFormat />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <ListTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <AlignmentTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <BlockStyleTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <Button
          variant="primary"
          className="w-full"
        >
          Save
        </Button>
      </ToolbarSection>
    </div>
  );
}

const ToolbarSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap justify-center items-center gap-2">{children}</div>
);

const ToolbarDivider = () => <div className="w-full bg-gray-300 md:w-px md:h-full" />;
