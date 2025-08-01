import { create } from "zustand";

interface NodeStoreState {
	persistentKeyMap: Map<string, string>; // persistentKey -> nodeKey
	setNodeKeyForPersistentKey: (persistentKey: string, nodeKey?: string) => void;
	getNodeKey: (persistentKey: string) => string | undefined;
}

export const useNodeStore = create<NodeStoreState>((set, get) => ({
	persistentKeyMap: new Map(),
	setNodeKeyForPersistentKey: (persistentKey, nodeKey) =>
		set((state) => {
			const map = new Map(state.persistentKeyMap);
			map.set(persistentKey, nodeKey ?? "");
			return { persistentKeyMap: map };
		}),
	getNodeKey: (persistentKey) => get().persistentKeyMap.get(persistentKey),
}));
