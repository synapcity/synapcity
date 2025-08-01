import rawTabs from "@/lib/data/tabs.json";
import { ViewResource } from "@/schemas";
import { TabEntityType } from "@/schemas/data/tab-schema";

export function getDefaultTabs(scope: TabEntityType): ViewResource[] {
	return rawTabs.map((tab, idx) => {
		const isDefault = idx === 0;
		return {
			...tab,
			isDefault,
			order: idx,
			entity: tab.entity ?? scope,
		};
	}) as ViewResource[];
}
