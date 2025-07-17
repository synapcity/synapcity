"use client";

import { useUIStore } from "@/stores/uiStore";
import type { SidebarPanel, SidebarScope } from "@/types/sidebar";
import { getDefaultPanels } from "@/lib/data/sidebar";

export function usePanels(scope: SidebarScope, entityId: string) {
	const getRaw = useUIStore((s) => s.getPanelsRaw);
	// 1) dynamic panels you added at runtime
	const dynamicPanels = getRaw(scope, entityId);

	// 2) panel *prefs* (active/pinned/hidden) for this scope+entity
	const key = `${scope}:${entityId}`;
	const prefs = useUIStore((s) => s.prefsByKey[key]) ?? {
		activePanel: null,
		pinned: [],
		hidden: [],
		panels: [],
	};

	// 3) helper to overwrite panels en masse, if you ever need to
	const setPanels = useUIStore((s) => s.setPanels);

	// 4) pick the right static defaults
	const defaults = getDefaultPanels(scope);

	// 5) merge static defaults + dynamic panels
	const all = [
		...defaults.map((p: SidebarPanel) => ({ ...p, __dynamic: false })),
		...dynamicPanels.map((p: SidebarPanel) => ({ ...p, __dynamic: true })),
	];

	// 6) annotate each one with pinned/hidden from prefs
	const panels: SidebarPanel[] = all.map((p) => ({
		...p,
		pinned: prefs.pinned.includes(p.id),
		hidden: prefs.hidden.includes(p.id),
	}));

	// 7) derive the active ID (prefs → defaultPinned → first panel)
	const activeId =
		prefs.activePanel ??
		defaults.find((p) => p.defaultPinned)?.id ??
		panels[0]?.id ??
		null;

	// 8) look up the active panel object
	const activePanel = panels.find((p) => p.id === activeId) ?? null;

	return {
		panels,
		activeId,
		activePanel,
		setPanels: (newPanels: SidebarPanel[]) =>
			setPanels(scope, entityId, newPanels),
	};
}
