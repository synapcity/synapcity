/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, write } from "xlsx";
import { prepareFlatData } from "./dataUtils";

export type Format = "csv" | "json" | "xlsx" | "pdf" | "txt";

function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

function formatFileName(name: string) {
	return name.toLowerCase().split(" ").join("-");
}
export function exportCsv(
	data: Record<string, any>[],
	mergeNested = false,
	name: string
) {
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
	downloadBlob(
		new Blob([csv], { type: "text/csv" }),
		`${formatFileName(name)}.csv`
	);
}

export function exportJson(data: Record<string, any>[], name: string) {
	downloadBlob(
		new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
		`${formatFileName(name)}.json`
	);
}

export function exportXlsx(
	data: Record<string, any>[],
	mergeNested = false,
	name: string
) {
	const flat = prepareFlatData(data);
	const ws = utils.json_to_sheet(flat);
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, "Sheet1");

	if (mergeNested && flat.length) {
		const headers = Object.keys(flat[0]);
		const infoCols = Object.entries(data[0] || {})
			.filter(([_, v]) => v && typeof v === "object" && !Array.isArray(v))
			.map(([k]) => k);
		const merges = infoCols.flatMap((col) => {
			const colIndex = headers.indexOf(col);
			if (colIndex < 0) return [];
			return [
				{
					s: { r: 1, c: colIndex },
					e: { r: flat.length, c: colIndex },
				},
			];
		});
		if (merges.length) {
			ws["!merges"] = merges;
			// clear merged cells below row 1
			merges.forEach(({ s, e }) => {
				for (let r = s.r + 1; r <= e.r; r++) {
					const addr = utils.encode_cell({ r, c: s.c });
					ws[addr] = { t: "s", v: "" };
				}
			});
		}
	}
	const buffer = write(wb, { bookType: "xlsx", type: "array" });
	downloadBlob(
		new Blob([buffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		}),
		`${formatFileName(name)}.xlsx`
	);
}

export function exportPdf(data: Record<string, any>[], name: string) {
	const flat = prepareFlatData(data);
	const doc = new jsPDF();

	if (data[0]?.content && typeof data[0].content === "string") {
		// Document‑style for Lexical
		let y = 10;
		data.forEach((row) => {
			const lines = doc.splitTextToSize(String((row as any).content), 180);
			doc.text(lines, 10, y);
			y += lines.length * 8 + 10;
			if (y > 280) {
				doc.addPage();
				y = 10;
			}
		});
	} else if (flat.length) {
		// Table‑style for tabular
		const topLevelKeys = new Set(...Object.keys(data));
		const columns = Object.keys(flat[0]).map((k) => ({
			header: topLevelKeys.has(k) ? k : "",
			dataKey: k,
		}));
		autoTable(doc, {
			startY: 10,
			pageBreak: "avoid",
			showHead: "firstPage",
			columns,
			body: flat,
			styles: { fontSize: 8 },
			headStyles: { fillColor: [41, 128, 185] },
			didParseCell: (d) => {
				if (
					d.section === "body" &&
					topLevelKeys.has(d.column.dataKey.toString()) &&
					d.row.index > 0
				) {
					d.cell.text = [];
				}
			},
		});
	}

	downloadBlob(doc.output("blob"), `${formatFileName(name)}.pdf`);
}

export function exportTxt(data: Record<string, any>[], name: string) {
	const texts = data.map(
		(r) => ((r as any).content ?? JSON.stringify(r, null, 2)) as string
	);
	downloadBlob(
		new Blob([texts.join("\n\n")], { type: "text/plain" }),
		`${formatFileName(name)}.txt`
	);
}
