import { WidgetResourceSchema, Widget, createWidget } from "./widget-schema";
import { createResourceStore, ResourceStore } from "@/stores/resources/factory";
import rawWidgets from "./widgets.json"
import { initItems } from "@/utils/initItems";
import { StoreApi, UseBoundStore } from "zustand";
export interface WidgetStore extends ResourceStore<Widget> {
  resetAll(): void;
}


const _useWidgetStore = createResourceStore<Widget>({
  resourceName: "Widget",
  schema: WidgetResourceSchema,
  persistKey: "synapcity-widgets",
  createItem: createWidget,
  initItems: (set, get) => (raw) => {
    if(Object.values(get().items).length > 0 || !get().hasHydrated) return;
    const parsed = initItems<Widget>(raw, WidgetResourceSchema, createWidget);
    set({ items: parsed })
  },

  afterHydrate: (state, err) => {
    if(!state.hasHydrated){
      state.setHasHydrated(true)
    }

    if(!err && Object.values(state.items).length === 0){
      state.initItems?.(rawWidgets)
    }
  },
  customActions: (set) => ({
    resetAll(){
      set({ items: {}})
    }
  })

})

export const useWidgetStore = _useWidgetStore as unknown as UseBoundStore<StoreApi<WidgetStore>>;