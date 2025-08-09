import { defineWidget } from "@/widgets/setup/widgetDefinition";
import { lazyWidget } from "@/widgets/setup/types";
import z from "zod";

const TodoPropsSchema = z.object({
  title: z.string(),
  emptyState: z.string().default("No items"),
  showCompleted: z.boolean().default(true),
});
const TodoSettingsSchema = z.object({
  groupBy: z.union([z.literal("none"), z.literal("tag"), z.literal("priority")]).default("none"),
  sortBy: z.union([z.literal("createdAt"), z.literal("updatedAt"), z.literal("dueDate")]).default("createdAt"),
});

export const todoWidget = defineWidget({
  id: "todo.v1",
  widgetKey: "todo",
  type: "productivity",
  category: ["productivity"],
  name: "Todo",
  icon: "ListChecks",
  version: 1,
  propsSchema: TodoPropsSchema,
  settingsSchema: TodoSettingsSchema,
  defaultProps: {
    title: "My Tasks",
    emptyState: "All clear ✨",
    showCompleted: true,
  },
  defaultSettings: {
    groupBy: "none",
    sortBy: "createdAt",
  },
  constraints: {
    minW: 3,
    minH: 3,
  },
  getComponent: lazyWidget(async () => import("./TodoWidget").then(mod => ({ default: mod.TodoWidget}))),
});