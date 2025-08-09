// import { WidgetResourceSchema, Widget } from "@/widgets/schemas";
// import { createResourceStore, ResourceStore } from "@/stores/resources/factory";
// import rawWidgets from "./widgets.json"
// import { initItems } from "@/utils/initItems";
// import { StoreApi, UseBoundStore } from "zustand";
// export interface WidgetStore extends ResourceStore<Widget> {
//   resetAll(): void;
// }


// const _useWidgetStore = createResourceStore<Widget>({
//   resourceName: "Widget",
//   schema: WidgetResourceSchema,
//   persistKey: "synapcity-widgets",
//   createItem: createWidget,
//   initItems: (set, get) => (raw) => {
//     if(Object.values(get().items).length > 0 || !get().hasHydrated) return;
//     const parsed = initItems<Widget>(raw, WidgetResourceSchema, createWidget);
//     set({ items: parsed as Record<string, Widget>})
//   },

//   afterHydrate: (state, err) => {
//     if(!state.hasHydrated){
//       state.setHasHydrated(true)
//     }

//     if(!err && Object.values(state.items).length === 0){
//       state.initItems?.(rawWidgets)
//     }
//   },
//   customActions: (set) => ({
//     resetAll(){
//       set({ items: {}})
//     }
//   })

// })

// export const useWidgetStore = _useWidgetStore as unknown as UseBoundStore<StoreApi<WidgetStore>>;

import { WidgetResourceSchema, Widget, createWidget, InstantiateOptions } from "@/widgets/setup";
import { createResourceStore, ResourceStore } from "@/stores/resources/factory";
import rawWidgets from "./widgets.json";
import { initItems } from "@/utils/initItems";
import { StoreApi, UseBoundStore } from "zustand";
import { WidgetKey } from "@/widgets";

export interface WidgetStore extends ResourceStore<Widget> {
  resetAll(): void;
    instantiateWidget(key: WidgetKey, opts?: InstantiateOptions): Promise<Widget>;
}

const _useWidgetStore = createResourceStore<Widget>({
  resourceName: "Widget",
  schema: WidgetResourceSchema,
  persistKey: "synapcity-widgets",
  createItem: createWidget,
  initItems: (set, get) => (raw) => {
    if (Object.values(get().items).length > 0 || !get().hasHydrated) return;
    const parsed = initItems<Widget>(raw, WidgetResourceSchema, createWidget);
    set({ items: parsed as Record<string, Widget> });
  },
  afterHydrate: (state, err) => {
    if (!state.hasHydrated) {
      state.setHasHydrated(true);
    }
    if (!err && Object.values(state.items).length === 0) {
      state.initItems?.(rawWidgets as unknown as Widget[]);
    }
  },
  customActions: (set, get) => ({
    resetAll() {
      set({ items: {} });
    },
    async instantiateWidget(key: WidgetKey, opts: InstantiateOptions = {}) {
      const widget = await get().addResource({
        widgetKey: key,
        label: opts.label,
        props: opts.props,
        settings: opts.settings,
        constraints: opts.constraints,
      } as Partial<Widget>);
      return widget;
    },
  }),
});

export const useWidgetStore = _useWidgetStore as unknown as UseBoundStore<
  StoreApi<WidgetStore>
>;