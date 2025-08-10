import dynamic from "next/dynamic";
import { type WidgetInfo, type WidgetType } from "@/landing-page/types";
import { ListCheck, NotepadText, InboxIcon } from "lucide-react";

const TaskWidget = dynamic(
  () => import("../components/widgets/Tasks").then((mod) => mod.TaskWidget),
  { ssr: true }
);
const NoteWidget = dynamic(
  () => import("../components/widgets/Notes").then((mod) => mod.NoteWidget),
  { ssr: true }
);
const InboxWidget = dynamic(
  () =>
    import("../components/widgets/CaptureInbox/CaptureInboxWidget").then(
      (mod) => mod.CaptureInboxWidget
    ),
  { ssr: true }
);

export const List = {
  title: "Untitled",
  icon: ListCheck,
  component: TaskWidget,
  items: [
    {
      content: "item 1",
      completed: false,
    },
    {
      content: "item 2",
      completed: false,
    },
    {
      content: "item 3",
      completed: false,
    },
  ],
};

export const Note = {
  title: "Untitled",
  icon: NotepadText,
  component: NoteWidget,
  content: "Start typing  here...",
};

export const Inbox = {
  title: "Inbox",
  icon: InboxIcon,
  component: InboxWidget,
  items: [
    {
      content: "item",
      createdAt: String(new Date()),
    },
  ],
};
export const WIDGET_TEMPLATES: Record<WidgetType, WidgetInfo> = {
  notes: {
    title: "Notes",
    icon: ListCheck,
    height: 3,
    width: 5,
    minHeight: 2,
    minWidth: 2,
    maxHeight: 6,
    maxWidth: 8,
    defaultProps: {
      content: "",
    },
  },
  list: {
    title: "To-Do List",
    icon: NotepadText,
    height: 5,
    width: 3,
    minHeight: 3,
    minWidth: 4,
    maxHeight: 6,
    maxWidth: 8,
    defaultProps: {
      title: "New List",
      items: [],
    },
  },
  inbox: {
    title: "Inbox",
    icon: InboxIcon,
    height: 4,
    width: 6,
    minHeight: 4,
    minWidth: 4,
    maxHeight: 8,
    maxWidth: 10,
    defaultProps: {
      title: "Inbox",
      items: [],
    },
  },
};

export const defaultWidgetProps = {
  title: "Untitled",
  date: new Date(),
  content: "Start typing here..",
};
