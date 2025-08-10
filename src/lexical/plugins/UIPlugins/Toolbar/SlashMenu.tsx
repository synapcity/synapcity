/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { useCallback, useMemo, useState } from "react";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { MenuOption, LexicalTypeaheadMenuPlugin } from "@lexical/react/LexicalTypeaheadMenuPlugin";

class SlashCommandOption extends MenuOption {
  title: string;
  keywords: string[];
  onSelect: (close: () => void) => void;

  constructor(title: string, keywords: string[], onSelect: (close: () => void) => void) {
    super(title);
    this.title = title;
    this.keywords = keywords;
    this.onSelect = onSelect;
  }
}

export default function SlashCommandPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState("");
  const [, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const options = useMemo(
    () => [
      new SlashCommandOption("Paragraph", ["p", "text"], (close) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const parent = selection.anchor.getNode().getTopLevelElementOrThrow();
            const paragraph = $createParagraphNode();
            paragraph.append(...parent.getChildren());
            parent.replace(paragraph);
            paragraph.clear();
            close();
          }
        });
      }),
      new SlashCommandOption("Heading 1", ["h1"], (close) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const parent = selection.anchor.getNode().getTopLevelElementOrThrow();
            const h1 = $createHeadingNode("h1");
            h1.append(...parent.getChildren());
            parent.replace(h1);
            h1.clear();
            close();
          }
        });
      }),
      new SlashCommandOption("Heading 2", ["h2"], (close) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const parent = selection.anchor.getNode().getTopLevelElementOrThrow();
            const h2 = $createHeadingNode("h2");
            h2.append(...parent.getChildren());
            parent.replace(h2);
            h2.clear();
            close();
          }
        });
      }),
      new SlashCommandOption("Quote", ["blockquote", "quote"], (close) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const parent = selection.anchor.getNode().getTopLevelElementOrThrow();
            const quote = $createQuoteNode();
            quote.append(...parent.getChildren());
            parent.replace(quote);
            quote.clear();
            close();
          }
        });
      }),
    ],
    [editor]
  );

  const checkForTriggerMatch = useCallback((text: string) => {
    const match = /(?:^|\s)\/(\w*)$/.exec(text);
    return match
      ? {
          leadOffset: match.index + match[0].indexOf("/"),
          matchingString: match[1],
          replaceableString: match[0],
        }
      : null;
  }, []);

  const onSelectOption = useCallback(
    (option: SlashCommandOption) => {
      option.onSelect(closeMenu);
    },
    [closeMenu]
  );

  return (
    <LexicalTypeaheadMenuPlugin
      triggerFn={checkForTriggerMatch}
      options={
        queryString === ""
          ? options
          : options.filter(
              (opt) =>
                opt.title.toLowerCase().includes(queryString.toLowerCase()) ||
                opt.keywords.some((k) => k.includes(queryString.toLowerCase()))
            )
      }
      onQueryChange={(query) => {
        setQueryString(query ?? "");
      }}
      onSelectOption={(option: any) => {
        onSelectOption(option as SlashCommandOption);
        setQueryString("");
      }}
      menuRenderFn={(anchorRef, { selectedIndex, options, selectOptionAndCleanUp }) =>
        anchorRef.current && options.length > 0 ? (
          <div className="absolute z-50 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-md">
            {options.map((option, i) => (
              <div
                key={option.key}
                className={`px-4 py-2 text-sm cursor-pointer ${i === selectedIndex ? "bg-gray-100" : ""}`}
                onClick={() => selectOptionAndCleanUp(option)}
              >
                {option.title}
              </div>
            ))}
          </div>
        ) : null
      }
    />
  );
}
