import { SidebarScope } from "@/types/sidebar";

export function generateScopeKey(scope: SidebarScope, id: string) {
	return `${scope}:${id}`;
}
