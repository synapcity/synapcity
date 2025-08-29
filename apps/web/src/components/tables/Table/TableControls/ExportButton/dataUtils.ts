import { ExportButtonProps } from "./ExportButton";

/** Flattens a single row: nested objects → combined + sub‑columns; Lexical arrays → text */
export function flattenRow(row: Record<string, unknown>): Record<string, unknown> {
  const newRow: Record<string, unknown> = {};

  Object.entries(row).forEach(([key, value]) => {
    // Lexical content: array of text nodes
    if (
      Array.isArray(value) &&
      value.every((v): v is { text: string } => v && typeof v === "object" && "text" in v)
    ) {
      newRow[key] = value.map((v) => v.text).join("");
      return;
    }

    // Nested object: keep combined top‑level and individual fields
    if (value && typeof value === "object" && !Array.isArray(value)) {
      newRow[key] = key;
      Object.entries(value as Record<string, unknown>).forEach(([subKey, subVal]) => {
        newRow[subKey] = subVal;
      });
      return;
    }

    // Primitive
    newRow[key] = value;
  });

  return newRow;
}

export function prepareFlatData(data: Record<string, unknown>[]): Record<string, unknown>[] {
  return data.map(flattenRow);
}

export function getProcessedData(
  data: Record<string, unknown>[],
  dataType: ExportButtonProps["dataType"]
): Record<string, unknown>[] {
  switch (dataType) {
    case "nested":
      return data;
    case "flattened":
      return prepareFlatData(data);
    case "lexical":
      return data;
    default:
      return prepareFlatData(data);
  }
}
