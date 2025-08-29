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
    <div className="absolute right-0 left-0 top-0 group md:border-r shadow-lg bg-(--background)">
      <div
        className={clsx(
          "justify-evenly md:relative w-full flex gap-4 p-2 border-t md:border-t-0",
          "overflow-x-auto overscroll-contain h-12 no-scrollbar max-w-screen shrink-0 opacity-10 group-hover:opacity-100 transition-opacity duration-200 delay-200 ease-linear"
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
          <Button variant="primary" className="w-full">
            Save
          </Button>
        </ToolbarSection>
      </div>
    </div>
  );
}

export const ToolbarSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap justify-center items-center gap-2">{children}</div>
);

const ToolbarDivider = () => <div className="w-full bg-gray-300 md:w-px md:h-full" />;
