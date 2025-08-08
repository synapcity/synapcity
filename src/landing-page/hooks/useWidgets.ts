"use client";

import { useState, useCallback, useEffect } from "react";
import { useWidgetStore } from "@/landing-page/stores/widgets/widgetStore";
import { scrollVariants as scrollAnimation } from "@/landing-page/lib/variants";
import { useFrameScroller } from "./useFramerScroller";

export const useWidgets = (maxWidgets = 20) => {
	const widgets = useWidgetStore((state) => state.widgets);
	const loadMoreWidgets = useWidgetStore((state) => state.loadMoreWidgets);
	const [loading, setLoading] = useState(false);
	const [widgetWidth, setWidgetWidth] = useState(0);

	const loadMore = useCallback(() => {
		if (loading || widgets.length >= maxWidgets) return;
		setLoading(true);
		setTimeout(() => {
			loadMoreWidgets();
			setLoading(false);
		}, 800);
	}, [loading, widgets.length, loadMoreWidgets, maxWidgets]);

	const calculateWidgetWidth = useCallback(() => {
		const widgets = document.querySelectorAll(".widget-container");
		const width = Array.from(widgets).reduce(
			(prev, widget) => prev + widget.getBoundingClientRect().width,
			0
		);
		if (width) {
			setWidgetWidth(width);
		}
	}, []);

	useEffect(() => {
		calculateWidgetWidth();
	}, [calculateWidgetWidth]);

	return { widgets, widgetWidth, loadMore, loading };
};

export const useWidgetGalleryController = (maxWidgets = 20) => {
	const { widgets, widgetWidth, loadMore, loading } = useWidgets(maxWidgets);

	const { x, controls, start, stop } = useFrameScroller({
		animation: scrollAnimation,
		threshold: 0.75,
		getTotalWidth: () => widgetWidth * 2,
		onThresholdReach: () => {
			loadMore();
		},
	});

	useEffect(() => {
		if (widgets.length === 0) {
			loadMore();
		}
	}, [loadMore, widgets.length]);

	return {
		widgets,
		loading,
		x,
		controls,
		start,
		stop,
		widgetWidth,
	};
};
