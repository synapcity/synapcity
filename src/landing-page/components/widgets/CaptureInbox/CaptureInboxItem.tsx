import clsx from "clsx"
import { Circle, StickyNote } from "lucide-react";
import dynamic from "next/dynamic";
import { ConvertDropdown } from "./ConvertDropdown";
import { Note } from "@/landing-page/types";
import { useWidgetStore } from "@/landing-page/stores";

export interface InboxItem {
  id: string;
  content: string;
  createdAt: string;
}

interface CaptureInboxItemProps {
  item: InboxItem;
  removeItem: (id: string) => void;
}

const X = dynamic(() => import("lucide-react").then((mod) => mod.X), { ssr: false })
export const CaptureInboxItem = ({ item, removeItem }: CaptureInboxItemProps) => {
  const widgets = useWidgetStore(state => state.widgets)
  const linkToNote = () => {
    console.log("link to note")
  }

  const notes = widgets.filter((widget) => widget.type === "notes") as unknown as Note[]
  console.log("found notes", notes)
  return (
    <li
      className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded transition group flex justify-between items-start gap-2"
    >
      <button onClick={() => console.log("Reviewed")}>
        <Circle size={16} />
      </button>
      <div className="flex justify-between items-center m-0 p-0">
        <div className="flex-1 text-neutral-100 text-left p-0">
          <p className="truncate text-sm mb-2">{item.content}</p>
          <p className="text-xs text-neutral-500 mb-0">{item.createdAt}</p>
        </div>
        <div>
          <ConvertDropdown
            label="Convert to Note"
            icon={<StickyNote size={16} />}
            items={notes}
            getItemLabel={(n: Note) => n.content}
            onSelect={linkToNote}
            onCreateNew={linkToNote}
          />
        </div>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className={clsx("text-neutral-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition")}
      >
        <X size={16} />
      </button>
    </li>
  )
}