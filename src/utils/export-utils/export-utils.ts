/* eslint-disable @typescript-eslint/no-explicit-any */


import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import { jsPDF } from "jspdf";

import { PdfColumn } from "../../types/export";
import { renderPdfText, preparePdfTable } from "../pdf-utils";
import { sanitizeFileName } from "../file-utils";
import { prepareFlatData } from "@/components/tables/Table/TableControls/ExportButton/dataUtils";

/**
 * Helper: serializes any value for a CSV cell using RFC 4180 rules.
 * Doubles internal quotes and wraps fields containing commas, quotes,
 * or newlines in double quotes, replacing the old backslash-comma logic.
 */
export function csvCell(value: any): string {
	if (value == null) return "";
	
	const raw = typeof value === "object" ? JSON.stringify(value) : String(value);
	
	const escaped = raw.replace(/"/g, '""');
	// Quote fields containing commas, quotes, or newlines
	return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

// csvCell applies RFC 4180 escaping (doubling quotes and quoting fields with
// commas, quotes, or newlines), replacing the old backslash-comma approach

export function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}


/**
 * Export rows as CSV using csvCell for RFC 4180-compliant escaping.
 * Legacy backslash-comma escaping is obsolete and no longer used.
 */
export function exportCsv(
	data: Record<string, any>[],
	mergeNested = false,
	fileName = "export"
) {
	const safeName = sanitizeFileName(fileName);
	
	const flat = prepareFlatData(data);

	
	const headers = flat.length ? Object.keys(flat[0]) : [];

	
	const nestedKeys = mergeNested
		? Object.entries(data[0] || {})
				.filter(([_, v]) => v && typeof v === "object" && !Array.isArray(v))
				.map(([k]) => k)
		: [];
    
	
  const rows = flat.map((rowObj, rowIndex) => {
      return headers.map((h) => {
      if (mergeNested && rowIndex > 0 && nestedKeys.includes(h)) {
          return "";
      }
      
      return csvCell(rowObj[h]);
      }).join(",");
  });
	
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
