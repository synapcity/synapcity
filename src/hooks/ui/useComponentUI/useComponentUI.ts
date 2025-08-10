"use client";

import { useCallback } from "react";
import { useUIStore } from "@/stores/ui/uiStore";

export function useComponentUI(id: string) {
	const component = useUIStore((s) => s.components[id] ?? {});

	const set = useUIStore((s) => s.setCompState);
	const toggle = useUIStore((s) => s.toggleCompState);
	
        const setState = useCallback(
                <T,>(key: string, value: T) => set(id, key, value),
                [id, set]
        );

	const toggleState = useCallback(
		(key: string) => toggle(id, key),
		[id, toggle]
	);

	return {
		...component,
		setState,
		toggleState,
	};
}
