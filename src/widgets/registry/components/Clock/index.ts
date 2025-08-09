import { defineWidget } from "@/widgets/setup/widgetDefinition";
import { lazyWidget } from "@/widgets/setup/types";
import z from "zod";

const ClockPropsSchema = z.object({
  title: z.string(),
  timezone: z.string(), // e.g. "America/New_York"
  showSeconds: z.boolean().default(false),
});
const ClockSettingsSchema = z.object({
  format: z.union([z.literal("12h"), z.literal("24h")]).default("24h"),
});

export const clockWidget = defineWidget({
  id: "clock.v1",
  widgetKey: "clock",
  type: "utility",
  category: ["time", "utility"],
  name: "Clock",
  icon: "Clock",
  description: "Simple time display by timezone.",
  version: 1,
  tags: ["time", "clock"],
  propsSchema: ClockPropsSchema,
  settingsSchema: ClockSettingsSchema,
  defaultProps: {
    title: "Local Time",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC",
    showSeconds: false,
  },
  defaultSettings: {
    format: "24h",
  },
  constraints: {
    minW: 3,
    minH: 2,
    preferredSize: { w: 4, h: 3 },
    lockAspectRatio: false,
  },
  getComponent: lazyWidget(async () => import("./ClockWidget")),
});