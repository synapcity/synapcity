import dynamic from "next/dynamic";
import { AvailableWidget } from "@/landing-page/types";

const TaskWidget = dynamic(
  () => import("@/landing-page/components/widgets/Tasks/TaskWidget").then((mod) => mod.TaskWidget),
  { ssr: true }
);
const NoteWidget = dynamic(
  () => import("@/landing-page/components/widgets/Notes/NoteWidget").then((mod) => mod.NoteWidget),
  { ssr: true }
);
const InboxWidget = dynamic(
  () =>
    import("@/landing-page/components/widgets/CaptureInbox/CaptureInboxWidget").then(
      (mod) => mod.CaptureInboxWidget
    ),
  { ssr: true }
);

export const LIST_TEMPLATES: AvailableWidget[] = [
  {
    type: "list",
    component: TaskWidget,
    props: {
      title: "📋 Today’s Tasks",
      items: [
        { content: "Complete project report.", completed: false },
        { content: "Email client feedback.", completed: true },
        { content: "Prepare for meeting.", completed: false },
      ],
    },
  },
  {
    type: "list",
    component: TaskWidget,
    props: {
      title: "Tasks",
      items: [
        { content: "Learn Zustand", completed: false },
        { content: "Bake banana bread", completed: true },
        { content: "Nap.", completed: false },
      ],
    },
  },
  {
    type: "list",
    component: TaskWidget,
    props: {
      title: "Today's Tasks",
      items: [
        { content: "Check email", completed: false },
        { content: "Write proposal", completed: true },
      ],
    },
  },
  {
    type: "list",
    component: TaskWidget,
    props: {
      title: "Launch Day Tasks",
      items: [
        { content: "Deploy site", completed: false },
        { content: "Announce on Twitter", completed: false },
      ],
    },
  },
];

export const NOTE_TEMPLATES: AvailableWidget[] = [
  {
    type: "notes",
    component: NoteWidget,
    props: {
      title: "Untitled",
      content: "Don't forget to take breaks!",
    },
  },
  {
    type: "notes",
    component: NoteWidget,
    props: {
      title: "PARA Method",
      content: "P - Projects, A - Areas, R - Resources, A - Archives",
    },
  },
  {
    type: "notes",
    component: NoteWidget,
    props: {
      title: "Note to Self:",
      content:
        "Don’t forget to pack your umbrella for tomorrow's hike. The weather forecast looks unpredictable!",
    },
  },
  {
    type: "notes",
    component: NoteWidget,
    props: {
      content: "Welcome to your dashboard demo!",
    },
  },
];

export const INBOX_TEMPLATES: AvailableWidget[] = [
  {
    type: "inbox",
    component: InboxWidget,
    props: {
      title: "Inbox #1",
      initialItems: [
        {
          content: "Item #1",
          createdAt: String(new Date()),
        },
      ],
    },
  },
  {
    type: "inbox",
    component: InboxWidget,
    props: {
      title: "Inbox #2",
      initialItems: [
        {
          content: "Item #2",
          createdAt: String(new Date()),
        },
      ],
    },
  },
];
export const WIDGET_TEMPLATES: AvailableWidget[] = [
  ...INBOX_TEMPLATES,
  ...LIST_TEMPLATES,
  ...NOTE_TEMPLATES,
];
