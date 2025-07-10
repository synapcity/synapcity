"use client";

import { useState, useCallback } from "react";

export function useDragOverlay<T extends { id: string }>() {
	const [draggingItem, setDraggingItem] = useState<T | null>(null);

	const onDragStart = useCallback((item: T) => {
		setDraggingItem(item);
	}, []);

	const onDragEnd = useCallback(() => {
		setDraggingItem(null);
	}, []);

	return {
		draggingItem,
		onDragStart,
		onDragEnd,
	};
}
