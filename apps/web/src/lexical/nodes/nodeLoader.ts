import nodeMap from "./nodeMap";

export const loadNodeByName = async (name: keyof typeof nodeMap) => {
  if (!nodeMap[name]) {
    throw new Error(`Node ${name} is not registered in the nodeMap.`);
  }
  return nodeMap[name]();
};

export const loadAllNodes = async () => {
  const entries = Object.entries(nodeMap);
  const nodes = await Promise.all(entries.map(([, loader]) => loader()));
  return nodes;
};
