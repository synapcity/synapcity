
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/ui/dropdown-menu';
import { Button } from '@/components';
import { useEffect, useState } from 'react';

export default function TextFormatDropdown() {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState<TextFormatType[]>([]);

  useEffect(() => {
    const updateFormats = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          if (activeFormats.length !== 0) setActiveFormats([]);
          return;
        }

        const newFormats = ['bold', 'italic', 'underline', 'strikethrough', 'code'].filter((format) =>
          selection.hasFormat(format as TextFormatType)
        );

        if (
          activeFormats.length !== newFormats.length ||
          !newFormats.every((format) => activeFormats.includes(format as TextFormatType))
        ) {
          setActiveFormats(newFormats as TextFormatType[]);
        }
      });
    };

    const unregister = editor.registerUpdateListener(() => {
      updateFormats();
    });

    return () => unregister();
  }, [editor, activeFormats]);

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Text Format</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {['bold', 'italic', 'underline', 'strikethrough', 'code'].map((format) => (
          <DropdownMenuItem
            key={format}
            onClick={() => formatText(format as TextFormatType)}
            className={activeFormats.includes(format as TextFormatType) ? 'bg-gray-200 font-semibold' : ''}
          >
            {format.charAt(0).toUpperCase() + format.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}