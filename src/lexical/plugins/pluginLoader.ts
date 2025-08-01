import dynamic from "next/dynamic";
import { pluginMap, PluginMap } from "./pluginMap";

export const loadPlugin = <P>(
	loader: () => Promise<{ default: React.ComponentType<P> }>,
	ssr = false
) => dynamic<P>(loader, { ssr });

export const loadPluginByName = <K extends keyof PluginMap>(
	name: K,
	ssr = false
) => loadPlugin(pluginMap[name], ssr);
