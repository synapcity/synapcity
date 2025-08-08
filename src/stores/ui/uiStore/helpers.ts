import { ComponentUIState, useUIStore } from "./useUIStore";

const emptyComponentState: ComponentUIState = {};
export const showComponent = (id: string) =>
	useUIStore.getState().setCompState(id, "isVisible", true);

export const hideComponent = (id: string) =>
	useUIStore.getState().setCompState(id, "isVisible", false);

export const isComponentVisible = (id: string): boolean =>
	!!useUIStore.getState().components[id]?.isVisible;

export const useComponentUIState = (id: string): ComponentUIState =>
	useUIStore((state) => state.components[id] ?? emptyComponentState);

export const getComponentUIState = (id: string): ComponentUIState =>
	useUIStore.getState().components[id] ?? emptyComponentState;
