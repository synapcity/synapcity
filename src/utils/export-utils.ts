/* eslint-disable @typescript-eslint/no-explicit-any */
// import { saveAs } from "file-saver";
// import { utils, write } from "xlsx";
// import { jsPDF } from "jspdf";
// import { PdfColumn } from "../types/export";
// import { renderPdfText, preparePdfTable } from "./pdf-utils";
// import { sanitizeFileName } from "./file-utils"; // lowercase, hyphens

// /**
//  * Export array of plain objects as CSV.
//  */
// export function exportCsv(rows: Record<string, any>[], fileName = "export") {
// 	const safeName = sanitizeFileName(fileName);
// 	const content = rows.length
// 		? [
// 				// header row
// 				Object.keys(rows[0]).join(","),
// 				// data rows, JSON-stringify each cell to preserve commas/newlines
// 				...rows.map((row) =>
// 					Object.values(row)
// 						.map((v) => {
// 							if (v === null || v === undefined) return "";
// 							// If it’s already a primitive, just toString it:
// 							if (
// 								typeof v === "string" ||
// 								typeof v === "number" ||
// 								typeof v === "boolean"
// 							) {
// 								return String(v).replace(/,/g, "\\,");
// 							}
// 							// Otherwise JSON‑stringify the whole thing:
// 							return JSON.stringify(v).replace(/,/g, "\\,");
// 						})
// 						.join(",")
// 				),
// 		  ].join("\n")
// 		: "";
// 	const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
// 	saveAs(blob, `${safeName}.csv`);
// }

// /**
//  * Export as pretty-printed JSON.
//  */
// export function exportJson(rows: Record<string, any>[], fileName = "export") {
// 	const safeName = sanitizeFileName(fileName);
// 	const blob = new Blob([JSON.stringify(rows, null, 2)], {
// 		type: "application/json;charset=utf-8",
// 	});
// 	saveAs(blob, `${safeName}.json`);
// }

// /**
//  * Export as .xlsx; assumes rows already flattened/merged if needed.
//  */
// export function exportXlsx(rows: Record<string, any>[], fileName = "export") {
// 	const safeName = sanitizeFileName(fileName);
// 	const worksheet = utils.json_to_sheet(rows);
// 	const workbook = utils.book_new();
// 	utils.book_append_sheet(workbook, worksheet, "Sheet1");
// 	const buffer = write(workbook, { bookType: "xlsx", type: "array" });
// 	const blob = new Blob([buffer], {
// 		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
// 	});
// 	saveAs(blob, `${safeName}.xlsx`);
// }

// /**
//  * Export as PDF: either text-flow (for `content` rows) or table.
//  */
// export function exportPdf(rows: Record<string, any>[], fileName = "export") {
// 	const safeName = sanitizeFileName(fileName);
// 	const doc = new jsPDF();

// 	if (rows.length > 0 && typeof (rows[0] as any).content === "string") {
// 		// Free-flowing text
// 		renderPdfText(doc, rows);
// 	} else if (rows.length > 0) {
// 		// Tabular layout
// 		const columns: PdfColumn[] = Object.keys(rows[0]).map((key) => ({
// 			header: key,
// 			dataKey: key,
// 		}));
// 		preparePdfTable(doc, rows, columns);
// 	}

// 	const blob = doc.output("blob");
// 	saveAs(blob, `${safeName}.pdf`);
// }

// /**
//  * Export as plain-text: one JSON block per paragraph.
//  */
// export function exportTxt(rows: Record<string, any>[], fileName = "export") {
// 	const safeName = sanitizeFileName(fileName);
// 	const text = rows.map((row) => JSON.stringify(row, null, 2)).join("\n\n");
// 	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
// 	saveAs(blob, `${safeName}.txt`);
// }
// File: src/utils/export-utils.ts
// --------------------------------
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
import { PdfColumn } from "../types/export";
import { renderPdfText, preparePdfTable } from "./pdf-utils";
import { sanitizeFileName } from "./file-utils";
import { prepareFlatData } from "@/components/tables/Table/TableControls/ExportButton/dataUtils";

/** Helper: safely serializes any value for CSV cells, quoting as needed. */
export function csvCell(value: any): string {
	if (value == null) return "";
	// Objects/arrays → JSON; primitives → toString
	const raw = typeof value === "object" ? JSON.stringify(value) : String(value);
	// Escape internal quotes
	const escaped = raw.replace(/"/g, '""');
	// If it contains comma, quote, or newline, wrap in double quotes
	return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

/**
 * Export as CSV.
 * Uses proper RFC4180 quoting rather than backslashes.
//  */
// export function exportCsv(rows: Record<string, any>[], fileName = "export") {
// 	const safeName = sanitizeFileName(fileName);
// 	if (rows.length === 0) {
// 		saveAs(new Blob([], { type: "text/csv" }), `${safeName}.csv`);
// 		return;
// 	}
// 	const headers = Object.keys(rows[0]);
// 	const lines = rows.map((row) =>
// 		headers.map((h) => csvCell(row[h])).join(",")
// 	);
// 	const content = [headers.map(csvCell).join(","), ...lines].join("\n");
// 	const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
// 	saveAs(blob, `${safeName}.csv`);
// }
// exportUtils.ts

export function exportCsv(
	data: Record<string, any>[],
	mergeNested = false,
	fileName = "export"
) {
	const safeName = sanitizeFileName(fileName);
	// 1) Flatten as before
	const flat = prepareFlatData(data);

	// 2) Build headers from the flattened shape
	const headers = flat.length ? Object.keys(flat[0]) : [];

	// 3) If merging, find which header keys came from nested objects
	const nestedKeys = mergeNested
		? Object.entries(data[0] || {})
				.filter(([_, v]) => v && typeof v === "object" && !Array.isArray(v))
				.map(([k]) => k)
		: [];

	// 4) Build CSV rows, blanking nestedKeys cells after first row if requested
	const rows = flat.map((rowObj, rowIndex) => {
		return headers
			.map((h) => {
				// if mergeNested and this is a nested key on a later row, blank it
				if (mergeNested && rowIndex > 0 && nestedKeys.includes(h)) {
					return "";
				}
				// otherwise stringify safely
				const cell = rowObj[h];
				return cell == null ? "" : String(cell).replace(/,/g, "\\,");
			})
			.join(",");
	});

	// 5) Combine header + rows and fire download
	const csv = [headers.join(","), ...rows].join("\n");
	downloadBlob(new Blob([csv], { type: "text/csv" }), `${safeName}.csv`);
}

/**
 * Export as JSON (preserves nesting).
 */
export function exportJson(rows: Record<string, any>[], fileName = "export") {
	const safeName = sanitizeFileName(fileName);
	const blob = new Blob([JSON.stringify(rows, null, 2)], {
		type: "application/json;charset=utf-8",
	});
	saveAs(blob, `${safeName}.json`);
}

/** Helper: for XLSX & PDF table exports, stringify objects */
export function scrubRowForTable(row: Record<string, any>) {
	const out: Record<string, any> = {};
	for (const [k, v] of Object.entries(row)) {
		if (v == null) out[k] = "";
		else if (typeof v === "object") out[k] = JSON.stringify(v);
		else out[k] = v;
	}
	return out;
}

/**
 * Export as XLSX.
 * Stringifies nested objects so they appear as JSON in cells.
 */
export function exportXlsx(rows: Record<string, any>[], fileName = "export") {
	const safeName = sanitizeFileName(fileName);
	const sheetData = rows.map(scrubRowForTable);
	const ws = utils.json_to_sheet(sheetData);
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, "Sheet1");
	const buffer = write(wb, { bookType: "xlsx", type: "array" });
	const blob = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
	});
	saveAs(blob, `${safeName}.xlsx`);
}

/**
 * Export as PDF (flow text or table).
 */
export function exportPdf(rows: Record<string, any>[], fileName = "export") {
	const safeName = sanitizeFileName(fileName);
	const doc = new jsPDF();

	if (rows.length > 0 && typeof (rows[0] as any).content === "string") {
		renderPdfText(doc, rows as any[]);
	} else if (rows.length > 0) {
		const tableRows = rows.map(scrubRowForTable);
		const columns: PdfColumn[] = Object.keys(tableRows[0]).map((key) => ({
			header: key,
			dataKey: key,
		}));
		preparePdfTable(doc, tableRows, columns);
	}

	const blob = doc.output("blob");
	saveAs(blob, `${safeName}.pdf`);
}

/**
 * Export as plain text (one JSON block per paragraph).
 */
export function exportTxt(rows: Record<string, any>[], fileName = "export") {
	const safeName = sanitizeFileName(fileName);
	const text = rows
		.map((r) => {
			if ((r as any).content && typeof (r as any).content === "string") {
				return String((r as any).content);
			}
			return JSON.stringify(r, null, 2);
		})
		.join("\n\n");
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
	saveAs(blob, `${safeName}.txt`);
}
