import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { PdfColumn } from "../types/export";

/**
 * Renders rows that each have a string `content` field
 * as flowing text, splitting across pages as needed.
 */
export function renderPdfText(doc: jsPDF, rows: Record<string, unknown>[]): void {
  let y = 10;
  const pageHeight = doc.internal.pageSize.height as number;

  rows.forEach((row) => {
    const content = (row as { content?: unknown }).content;
    const text = typeof content === "string" ? content : String(content ?? "");
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, y);
    y += lines.length * 8 + 10;

    if (y > pageHeight - 20) {
      doc.addPage();
      y = 10;
    }
  });
}

/**
 * Renders any array of flat objects as a table in the PDF.
 * @param doc     The jsPDF document
 * @param rows    The flattened data rows
 * @param columns Column definitions ({ header, dataKey })
 */
export function preparePdfTable(
  doc: jsPDF,
  rows: Record<string, unknown>[],
  columns: PdfColumn[]
): void {
  // Build head row as array of header strings
  const head = [columns.map((col) => col.header)];

  // Build body: each row becomes an array of cell strings
  const body = rows.map((row) => columns.map((col) => String(row[col.dataKey] ?? "")));

  autoTable(doc, {
    startY: 10,
    head,
    body,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
    // Optionally tweak margins or theme here
  });
}
