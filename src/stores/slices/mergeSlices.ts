/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";

export function mergeSlices<T extends object>(
  base: T,
  slices: Array<StateCreator<T, [], [], Partial<T>>>,
  set: any,
  get: any,
  store: any
): T {
  for (const slice of slices) {
    Object.assign(base, slice(set, get, store));
  }
  return base;
}
