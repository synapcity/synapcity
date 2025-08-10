/* eslint-disable @typescript-eslint/no-explicit-any */
// export type SidebarScope =
//   | "note"
//   | "dashboard"
//   | "resource"
//   | "annotation"
//   | "connection";

// export interface SidebarPanel {
//   id:          string;
//   label:       string;
//   icon?:       string;
//   tooltip?:    string;
//   component:   React.ComponentType<any>;
//   order?:      number;
//   props?:      Record<string,unknown>;
//   href?:       string;
//   external?:   boolean;
//   onClick?:    () => void;
//   defaultPinned?: boolean;
//   defaultHidden?: boolean;
//   __dynamic?:  boolean;
// }

export type SidebarScope =
  | "global"
  | "note"
  | "dashboard"
  | "resource"
  | "annotation"
  | "connection";
export type SidebarPanel = {
  id: string;
  label: string;
  icon?: string;
  tooltip?: string;
  component: React.ComponentType<any>;
  order?: number;
  props?: Record<string, unknown>;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  defaultPinned?: boolean;
  defaultHidden?: boolean;
  __dynamic?: boolean;
};

export interface SidebarPrefs {
  activePanel: string | null;
  pinned: string[];
  hidden: string[];
  panels: SidebarPanel[];
}
