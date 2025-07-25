"use client";

import { useMemo, useCallback } from "react";
import {
	useSidebarStore,
	SidebarPanel,
	SidebarScope,
} from "@/stores/sidebarStore";
import { getDefaultPanels } from "@/lib/data/sidebar";

// 📦 module‐level constant for an empty panels list
const EMPTY_PANELS: SidebarPanel[] = [];

export function usePanels(scope: SidebarScope, entityId: string) {
	// 1) static defaults—memoized once per scope
	const defaults = useMemo(() => getDefaultPanels(scope), [scope]);

	// 2) stable default‐prefs object per scope+entity
	const defaultPrefs = useMemo(
		() => ({
			activePanel: null,
			pinned: [] as string[],
			hidden: [] as string[],
			panels: defaults,
		}),
		[defaults]
	);

	// 3) subscribe directly to the *data* you need—never return a new array/object here
	const dynamicPanels = useSidebarStore((s) => {
		// pick out the stored array, or fall back to our constant
		const arr = s.definitions[scope]?.[entityId];
		return arr ?? EMPTY_PANELS;
	});

	const prefs = useSidebarStore((s) => {
		const key = `${scope}:${entityId}`;
		// if stored, return it; otherwise return our memoized default
		return s.prefsByKey[key] ?? defaultPrefs;
	});

	// 4) now you can safely merge
	const all = useMemo(
		() => [
			...defaults.map((p) => ({ ...p, __dynamic: false })),
			...dynamicPanels.map((p) => ({ ...p, __dynamic: true })),
		],
		[defaults, dynamicPanels]
	);

	const panels = useMemo(
		() =>
			all.map((p) => ({
				...p,
				pinned: prefs.pinned.includes(p.id),
				hidden: prefs.hidden.includes(p.id),
			})),
		[all, prefs.pinned, prefs.hidden]
	);

	const activeId = useMemo(() => {
		if (prefs.activePanel) return prefs.activePanel;
		const firstPinned = defaults.find((p) => p.defaultPinned)?.id;
		if (firstPinned) return firstPinned;
		return panels[0]?.id ?? null;
	}, [prefs.activePanel, defaults, panels]);

	const activePanel = useMemo(
		() => panels.find((p) => p.id === activeId) ?? null,
		[panels, activeId]
	);

	// 5) grab your setters (these are stable references)
	const setPanels = useSidebarStore((s) => s.setPanels);
	const setActivePanel = useSidebarStore((s) => s.setActivePanel);

	// 6) wrap in callbacks
	const updatePanels = useCallback(
		(pbs: SidebarPanel[]) => setPanels(scope, entityId, pbs),
		[setPanels, scope, entityId]
	);
	const updateActive = useCallback(
		(panelId: string | null) => setActivePanel(scope, entityId, panelId),
		[setActivePanel, scope, entityId]
	);

	return {
		panels,
		activeId,
		activePanel,
		setPanels: updatePanels,
		setActive: updateActive,
	};
}
