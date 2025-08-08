/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { defaultWidgetProps } from "@/landing-page/lib/constants";
import {
	type AvailableWidget,
	type Widget,
	type WidgetType,
} from "@/landing-page/types";
import { widgetRegistry } from "@/landing-page/stores/widgets/widgetRegistry";
import { useWidgetStore } from "@/landing-page/stores/widgets/widgetStore";
import { v4 as uuidv4 } from "uuid";
import { widgetSchemasByType as widgetSchemas } from "@/landing-page/stores/widgets";
import { LayoutItem } from "@/stores";
export const getDefaultProps = (overrides = {}) => ({
	...defaultWidgetProps,
	...overrides,
});

export function getWidgetProps(widget: AvailableWidget) {
	if (widget.type === "list") {
		return getDefaultProps({
			initialTasks: ["Learn Synapcity", "Add a new widget"],
		});
	} else if (widget.type === "notes") {
		return getDefaultProps({
			note: "This is a note",
		});
	}
	return getDefaultProps();
}

export function getRandomPosition(seed?: number) {
	const positions = ["top", "center", "bottom"];
	if (seed !== undefined) {
		return positions[seed % 3];
	}
	return positions[Math.floor(Math.random() * positions.length)];
}

export const getRandomWidgets = (
	templates: AvailableWidget[],
	count: number
): AvailableWidget[] => {
	const shuffled = [...templates].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};
export const createWidget = (
	availableWidget: AvailableWidget,
	layout?: LayoutItem
): Widget | null => {
	const registryEntry = widgetRegistry[availableWidget.type];
	if (!registryEntry) {
		console.warn(`Unknown widget type: ${availableWidget.type}`);
		return null;
	}

	const id = uuidv4();
	const props = getDefaultProps(registryEntry.defaultProps);
	const widgetDefaultProps = getWidgetProps(availableWidget);

	const mergedProps = {
		...props,
		...widgetDefaultProps,
		...registryEntry.defaultProps,
		...availableWidget.props,
	};

	const result = registryEntry.schema.safeParse(mergedProps);
	if (!result.success) {
		console.warn(
			`Invalid widget props for ${availableWidget.type}`,
			result.error
		);
		return null;
	}

	const { minWidth, minHeight, maxWidth, width, height, maxHeight } =
		mergedProps;

	const finalLayout: LayoutItem = layout || {
		i: id,
		x: Infinity,
		y: 0,
		w: width,
		h: height,
		minW: minWidth,
		minH: minHeight,
		maxW: maxWidth,
		maxH: maxHeight,
	};

	const widget: Widget = {
		id,
		type: availableWidget.type,
		props: result.data,
		component: registryEntry.component,
		layout: finalLayout,
		isDeleted: false,
	};

	useWidgetStore.getState().addWidget(widget, widget.props);

	return widget;
};

export const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const validateWidget = (type: WidgetType, props: any) => {
	const schema = widgetSchemas[type];
	if (!schema) return { success: false, error: "Unknown widget type" };

	const result = schema.safeParse(props);
	return result.success
		? { success: true }
		: { success: false, error: result.error.message };
};
