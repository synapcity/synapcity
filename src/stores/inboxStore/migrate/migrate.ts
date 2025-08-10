import { InboxState } from "../useInboxStore";

const today = new Date().toLocaleString();

const defaultInboxStore: InboxState = {
  hasHydrated: false,
  items: [],
  selectedDate: today,
};

export const migrateInboxStore = (persistedState: unknown, version: number): InboxState => {
  const state = (persistedState as Partial<InboxState>) ?? {};
  if (version < 1) {
    return defaultInboxStore;
  }
  return {
    ...defaultInboxStore,
    ...state,
  };
};
