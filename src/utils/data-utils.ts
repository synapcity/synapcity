/* eslint-disable @typescript-eslint/no-explicit-any */
// /**
//  * The modes you can ask your exporter to use:
//  *  - 'nested'    → raw objects (no flattening)
//  *  - 'flattened' → full dot‑notation flatten (deep)
//  *  - 'lexical'   → only collapse Lexical children arrays to text
//  *  - 'default'   → leave nested objects intact unless mergeNested=true
//  */
// export type DataType = "default" | "nested" | "flattened" | "lexical";

// /**
//  * Deeply flattens nested objects into dot‑notated keys.
//  * E.g. { a: { b: 1 } } → { 'a.b': 1 }
//  */
// export function flattenObject(
// 	obj: Record<string, any>,
// 	parentKey = "",
// 	result: Record<string, any> = {}
// ): Record<string, any> {
// 	for (const [key, value] of Object.entries(obj)) {
// 		const newKey = parentKey ? `${parentKey}.${key}` : key;
// 		if (value && typeof value === "object" && !Array.isArray(value)) {
// 			flattenObject(value, newKey, result);
// 		} else {
// 			result[newKey] = value;
// 		}
// 	}
// 	return result;
// }

// /**
//  * Handles the common “Lexical editor” shape:
//  *   [{ text: 'a' }, { text: 'b' }] → 'ab'
//  */
// export function processLexicalRow(
// 	row: Record<string, any>
// ): Record<string, any> {
// 	const out: Record<string, any> = {};
// 	for (const [key, value] of Object.entries(row)) {
// 		if (
// 			Array.isArray(value) &&
// 			value.every((v) => v && typeof v === "object" && "text" in v)
// 		) {
// 			out[key] = (value as any[]).map((v) => v.text).join("");
// 		} else {
// 			out[key] = value;
// 		}
// 	}
// 	return out;
// }

// /**
//  * Given your rows, a dataType, and an optional mergeNested flag,
//  * returns the appropriately transformed array.
//  */
// export function getProcessedData(
// 	rows: Record<string, any>[],
// 	dataType: DataType,
// 	mergeNested = false
// ): Record<string, any>[] {
// 	switch (dataType) {
// 		case "nested":
// 			// Leave raw
// 			return rows;

// 		case "lexical":
// 			// Only Lexical → text
// 			return rows.map(processLexicalRow);

// 		case "flattened":
// 			// Always deep‑flatten everything
// 			return rows.map((r) => flattenObject(r));

// 		case "default":
// 		default:
// 			// Default: raw objects, unless mergeNested requested
// 			return mergeNested ? rows.map((r) => flattenObject(r)) : rows;
// 	}
// }
// File: src/utils/data-utils.ts
// -------------------------------

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
	obj: Record<string, any>,
	parentKey = "",
	result: Record<string, any> = {}
): Record<string, any> {
	for (const [key, value] of Object.entries(obj)) {
		const newKey = parentKey ? `${parentKey}.${key}` : key;
		if (value && typeof value === "object" && !Array.isArray(value)) {
			flattenObject(value, newKey, result);
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
export function processLexicalRow(
	row: Record<string, any>
): Record<string, any> {
	const out: Record<string, any> = {};
	for (const [key, value] of Object.entries(row)) {
		if (
			Array.isArray(value) &&
			value.every((v) => v && typeof v === "object" && "text" in v)
		) {
			out[key] = (value as any[]).map((v) => v.text).join("");
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
	rows: Record<string, any>[],
	dataType: DataType,
	mergeNested = false
): Record<string, any>[] {
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
