/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { WidgetType, AvailableWidget, Widget } from "@/landing-page/types";
import { createWidget, shuffleArray } from "@/landing-page/utils";
import { WIDGET_TEMPLATES } from "@/landing-page/lib/widgetTemplates";

type WidgetStore = {
	availableWidgets: AvailableWidget[];
	widgets: Widget[];
	loadMoreWidgets: (count?: number) => void;
	loadAvailableWidgets: (widgets: AvailableWidget[]) => void;
	addWidget: (widget: Widget, initialProps?: Record<string, any>) => void;

	removeWidget: (id: string) => void;
	updateWidgetProps: (id: string, newProps: Partial<Widget["props"]>) => void;
	getWidgetByType: (type: WidgetType) => AvailableWidget | undefined;
};

export const useWidgetStore = create<WidgetStore>((set, get) => ({
	availableWidgets: [...WIDGET_TEMPLATES],
	widgets: [],
	loadMoreWidgets: (count = 10) => {
		const remainingWidgetsCount = Math.max(0, count - get().widgets.length);
		if (remainingWidgetsCount === 0) return;

		set((state) => {
			const newWidgets = state.availableWidgets.slice(0, remainingWidgetsCount);
			const createdWidgets = newWidgets
				.map((widget) => createWidget(widget))
				.filter(Boolean);
			const finalWidgets = shuffleArray(createdWidgets).filter((w) => !!w);

			return {
				widgets: [...state.widgets, ...finalWidgets],
			};
		});
	},
	loadAvailableWidgets: (widgets) =>
		set((state) => ({
			availableWidgets: [
				...state.availableWidgets,
				...widgets.filter(
					(w) => !state.availableWidgets.some((aw) => aw.type === w.type)
				),
			],
		})),
	addWidget: (widget, initialProps = {}) => {
		const available = get().availableWidgets.find(
			(widget) => widget === widget
		);
		if (!available) return;

		// Create widget using your utility function
		// const finalWidget = createWidget({
		// 	...available,
		// 	props: { ...available.props, ...initialProps },
		// });

		const id = crypto.randomUUID();

		if (id) {
			const finalWidget = {
				...available,
				props: { ...available.props, ...initialProps, ...widget.props },
				id,
				isDeleted: false,
				layout: {
					...widget.layout,
					i: id,
				},
			};

			if (finalWidget) {
				set((state) => ({
					widgets: [...state.widgets, finalWidget],
				}));
			}
		}
	},
	removeWidget: (id: string) =>
		set((state) => ({
			widgets: state.widgets.map((widget) =>
				widget.id === id ? { ...widget, isDeleted: true } : widget
			),
		})),
	updateWidgetProps: (id, newProps) =>
		set((state) => ({
			widgets: state.widgets.map((w) =>
				w.id === id ? { ...w, props: { ...w.props, ...newProps } } : w
			),
		})),
	getWidgetByType: (type) =>
		get().availableWidgets.find((w) => w.type === type),
}));
