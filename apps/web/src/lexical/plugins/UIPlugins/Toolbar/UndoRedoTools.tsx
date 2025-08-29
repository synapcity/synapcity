import { IconButton } from "@/components";
import { ButtonSize, ButtonVariant } from "@/components/atoms/buttons/variants";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { UNDO_COMMAND, REDO_COMMAND } from "lexical";

export const commonButtonToolbarProps = {
  size: "sm" as ButtonSize,
  variant: "ghost" as ButtonVariant,
  className:
    "p-1 rounded-md hover:bg-background hover:border hover:125 active:bg-foreground transition-all duration-200 ease-linear",
};
export default function UndoRedoTools() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex space-x-1">
      <IconButton
        icon="undo"
        {...commonButtonToolbarProps}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      />
      <IconButton
        icon="redo"
        {...commonButtonToolbarProps}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      />
    </div>
  );
}
