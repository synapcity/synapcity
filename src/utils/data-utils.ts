/**
 * Modes for processing data:
 * - 'nested'    : raw objects, no flattening
 * - 'flattened' : deep dot‑notation flatten
 * - 'lexical'   : collapse Lexical `children` arrays into text
 * - 'default'   : raw unless mergeNested=true
 */
export type DataType = "default" | "nested" | "flattened" | "lexical";

/**
 * Deeply flattens nested objects into dot‑notated keys.
 * E.g. { a: { b: 1 } } → { 'a.b': 1 }
 */
export function flattenObject(
  obj: Record<string, unknown>,
  parentKey = "",
  result: Record<string, unknown> = {}
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value as Record<string, unknown>, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

/**
 * Converts Lexical-style children arrays into a single text string.
 * E.g. [ { text: 'foo' }, { text: 'bar' } ] → 'foobar'
 */
export function processLexicalRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    if (Array.isArray(value) && value.every((v) => v && typeof v === "object" && "text" in v)) {
      out[key] = (value as Array<{ text: string }>).map((v) => v.text).join("");
    } else {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Returns processed data based on the given mode and mergeNested flag.
 */
export function getProcessedData(
  rows: Record<string, unknown>[],
  dataType: DataType,
  mergeNested = false
): Record<string, unknown>[] {
  switch (dataType) {
    case "nested":
      // Raw objects
      return rows;

    case "lexical":
      // Only Lexical→text processing
      return rows.map(processLexicalRow);

    case "flattened":
      // Deep flatten all objects
      return rows.map((r) => flattenObject(r));

    case "default":
    default:
      // Default: raw unless mergeNested is true
      return mergeNested ? rows.map((r) => flattenObject(r)) : rows;
  }
}
