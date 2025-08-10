import { dataLoaders, DataKey } from "@/lib/data";

export async function getData<K extends DataKey>(
  key: K
): Promise<Awaited<ReturnType<(typeof dataLoaders)[K]>>["default"]> {
  const mod = await dataLoaders[key]();
  return mod.default;
}
