import rawTabs from "@/stores/resources/noteViewStore/views.json";
import { ViewResource, ViewType } from "@/stores";
export function getDefaultTabs(scope: ViewType): ViewResource[] {
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
