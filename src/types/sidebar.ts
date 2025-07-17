export type SidebarScope = "note" | "dashboard";

export type SidebarPanel = {
	id: string;
	label: string;
	icon?: string;
	tooltip?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ComponentProps<any>;
	order?: number;
	props?: Record<string, unknown>;
	href?: string;
	external?: boolean;
	onClick?: () => void;
	defaultPinned?: boolean;
	defaultHidden?: boolean;
	__dynamic?: boolean;
};

export interface SidebarPrefs {
	activePanel: string | null;
	pinned: string[];
	hidden: string[];
	panels: SidebarPanel[];
}

export type SidebarPrefsSlice = {
	/** key = `${scope}:${entityId}` */
	prefsByKey: Record<string, SidebarPrefs>;
	getPrefs: (scope: SidebarScope, id: string) => SidebarPrefs;
	setActivePanel: (
		scope: SidebarScope,
		entityId: string,
		panelId: string | null
	) => void;
	togglePanelPinned: (
		scope: SidebarScope,
		entityId: string,
		panelId: string
	) => void;
	togglePanelHidden: (
		scope: SidebarScope,
		entityId: string,
		panelId: string
	) => void;
	setPanels: (scope: SidebarScope, id: string, panels: SidebarPanel[]) => void;
	addPanels: (scope: SidebarScope, id: string, panels: SidebarPanel[]) => void;
	resetToDefault: (scope: SidebarScope, id: string) => void;
};

export type PanelEntitySlice = {
	/** panels[scope][entityId][panelId] = SidebarPanel */
	panels: Record<SidebarScope, Record<string, Record<string, SidebarPanel>>>;

	/** Create or add a dynamic panel */
	createPanel: (
		scope: SidebarScope,
		entityId: string,
		data: Partial<Omit<SidebarPanel, "id">>
	) => SidebarPanel;

	/** Remove a dynamic panel */
	deletePanel: (scope: SidebarScope, entityId: string, panelId: string) => void;

	/** Replace all panels for this scope+entity */
	setPanels: (
		scope: SidebarScope,
		entityId: string,
		panels: SidebarPanel[]
	) => void;

	/** Get raw panels (dynamic only) */
	getPanelsRaw: (scope: SidebarScope, entityId: string) => SidebarPanel[];
};
