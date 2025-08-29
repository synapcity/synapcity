import { clockWidget } from "./components/Clock";
import { todoWidget } from "./components/Todo";

export type WidgetKey = keyof typeof widgetRegistry;

export const widgetRegistry = {
  clock: clockWidget,
  todo: todoWidget,
} as const;
