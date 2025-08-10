import { z } from "zod";
import { type WidgetType } from "@/landing-page/types";

const baseWidgetSchema = z.object({
  type: z.enum(["list", "notes", "inbox"] as [WidgetType, ...WidgetType[]]),
  component: z.function().input(z.any()).output(z.any()),
});

const listPropsSchema = z.object({
  title: z.string(),
  items: z.array(
    z.object({
      content: z.string(),
      completed: z.boolean(),
    })
  ),
});
const inboxPropsSchema = z.object({
  title: z.string(),
  initialItems: z.array(
    z.object({
      content: z.string(),
      createdAt: z.string(),
    })
  ),
});

const notesPropsSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const listWidgetSchema = baseWidgetSchema.extend({
  type: z.literal("list"),
  props: listPropsSchema,
});

export const notesWidgetSchema = baseWidgetSchema.extend({
  type: z.literal("notes"),
  props: notesPropsSchema,
});
export const inboxWidgetSchema = baseWidgetSchema.extend({
  type: z.literal("inbox"),
  props: inboxPropsSchema,
});

export const widgetSchemasByType = {
  list: listWidgetSchema,
  notes: notesWidgetSchema,
  inbox: inboxWidgetSchema,
};
