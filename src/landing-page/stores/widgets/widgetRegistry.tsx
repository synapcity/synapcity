import { z } from "zod";
import { defaultWidgetProps, WIDGET_TEMPLATES } from "@/landing-page/lib/constants";
import dynamic from "next/dynamic";

const TaskWidget = dynamic(
  () => import("@/landing-page/components/widgets/Tasks/TaskWidget").then((mod) => mod.TaskWidget),
  { ssr: true }
);
const NoteWidget = dynamic(
  () => import("@/landing-page/components/widgets/Notes/NoteWidget").then((mod) => mod.NoteWidget),
  { ssr: true }
);
const InboxWidget = dynamic(
  () => import("@/landing-page/components/widgets/CaptureInbox/CaptureInboxWidget").then((mod) => mod.CaptureInboxWidget),
  { ssr: true }
);

export const widgetRegistry = {
  list: {
    component: TaskWidget,
    defaultProps: {
      ...WIDGET_TEMPLATES.list,
      ...defaultWidgetProps,
      items: [],
    },
    schema: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          content: z.string(),
          completed: z.boolean(),
        })
      ),
    }),
  },
  notes: {
    component: NoteWidget,
    defaultProps: {
      ...WIDGET_TEMPLATES.notes,
      ...defaultWidgetProps,
    },
    schema: z.object({
      title: z.string(),
      content: z.string(),
    })
  },
  inbox: {
    component: InboxWidget,
    defaultProps: {
      ...WIDGET_TEMPLATES.inbox,
      ...defaultWidgetProps,
    },
    schema: z.object({
      title: z.string(),
      initialItems: z.array(
        z.object({
          content: z.string(),
          createdAt: z.string(),
        })
      )
    })
  }
};
