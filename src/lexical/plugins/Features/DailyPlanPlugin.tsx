"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode } from "lexical";
import { PlanNode } from "@/lexical/nodes/DailyPlanNode";
import { isToday } from "date-fns";
export function DailyPlanPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      const first = root.getFirstChild();
      const today = isToday(new Date());

      // 1) If today's PlanNode is already first, do nothing
      if (first instanceof PlanNode && today) {
        return;
      }

      const data = new Date().toISOString();
      // 2) Create the new PlanNode
      const planNode = new PlanNode(data);

      // 3) Insert it _before_ the existing first child (or append if empty)
      if (first) {
        first.insertBefore(planNode);
      } else {
        root.append(planNode);
      }

      // 4) Always leave an empty paragraph afterwards
      const para = $createParagraphNode();
      planNode.insertAfter(para);
    });
  }, [editor]);

  return null;
}
