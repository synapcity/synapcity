import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { IconButton } from "@/components";

export default function ListToolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex space-x-2">
      <IconButton
        icon="list"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        size="sm"
      />
      <IconButton
        icon="listOrdered"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        size="sm"
      />
    </div>
  );
}
