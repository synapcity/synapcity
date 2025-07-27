import { create } from "zustand";
import { nanoid } from "nanoid";

export interface Connection {
	id: string;
	sourceId: string;
	targetId: string;
	label?: string;
}

export interface Annotation {
	id: string;
	nodeId: string;
	text: string;
	createdAt: string;
}

export interface Resource {
	id: string;
	nodeId: string;
	url: string;
	title?: string;
}

interface NodeRelationsState {
	connections: Record<string, Connection>;
	annotations: Record<string, Annotation>;
	resources: Record<string, Resource>;

	/** Add a one‑way connection from source → target */
	addConnection: (sourceId: string, targetId: string, label?: string) => void;
	removeConnection: (connectionId: string) => void;

	addAnnotation: (nodeId: string, text: string) => void;
	removeAnnotation: (annotationId: string) => void;

	addResource: (nodeId: string, url: string, title?: string) => void;
	removeResource: (resourceId: string) => void;

	/** Selectors */
	getConnectionsFor: (nodeId: string) => Connection[];
	getAnnotationsFor: (nodeId: string) => Annotation[];
	getResourcesFor: (nodeId: string) => Resource[];
}

export const useNodeRelationsStore = create<NodeRelationsState>((set, get) => ({
	connections: {},
	annotations: {},
	resources: {},

	addConnection: (sourceId, targetId, label) =>
		set((s) => {
			const id = nanoid();
			return {
				connections: {
					...s.connections,
					[id]: { id, sourceId, targetId, label },
				},
			};
		}),

	removeConnection: (connectionId) =>
		set((s) => {
			const { [connectionId]: _, ...rest } = s.connections;
			return { connections: rest };
		}),

	addAnnotation: (nodeId, text) =>
		set((s) => {
			const id = nanoid();
			return {
				annotations: {
					...s.annotations,
					[id]: { id, nodeId, text, createdAt: new Date().toISOString() },
				},
			};
		}),

	removeAnnotation: (annotationId) =>
		set((s) => {
			const { [annotationId]: _, ...rest } = s.annotations;
			return { annotations: rest };
		}),

	addResource: (nodeId, url, title) =>
		set((s) => {
			const id = nanoid();
			return {
				resources: {
					...s.resources,
					[id]: { id, nodeId, url, title },
				},
			};
		}),

	removeResource: (resourceId) =>
		set((s) => {
			const { [resourceId]: _, ...rest } = s.resources;
			return { resources: rest };
		}),

	getConnectionsFor: (nodeId) => {
		const all = get().connections;
		return Object.values(all).filter(
			(c) => c.sourceId === nodeId || c.targetId === nodeId
		);
	},

	getAnnotationsFor: (nodeId) =>
		Object.values(get().annotations).filter((a) => a.nodeId === nodeId),

	getResourcesFor: (nodeId) =>
		Object.values(get().resources).filter((r) => r.nodeId === nodeId),
}));
