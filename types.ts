/* Shared types for version history components */

export type VersionAction =
  | "create"
  | "update"
  | "delete"
  | "undo"
  | "redo"
  | "reset"
  | "restore";

export interface VersionEntry<TState = unknown> {
  id: string;
  userId: string;
  entityId: string;
  entityType: string;
  action: VersionAction;
  entityState: TState;
  previousState?: TState;
  /** Timestamp of the change */
  timestamp: Date;
}
