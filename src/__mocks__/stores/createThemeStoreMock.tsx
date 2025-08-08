import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { themeStoreInitializer } from "@/stores/ui/themeStore/useThemeStore";

export function createThemeStoreMock(initial?: Partial<ReturnType<typeof themeStoreInitializer>>) {
  const store = createStore(
    persist(themeStoreInitializer, { name: "theme-preferences-test" })
  );

  if (initial) {
    store.setState({ ...store.getState(), ...initial });
  }

  return store;
}
