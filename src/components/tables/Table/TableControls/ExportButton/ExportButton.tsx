'use client';

import React from 'react';
import { DownloadIcon, Loader } from 'lucide-react';
import { Button, Icon, IconButton } from '@/components/atoms';
import { ModalRenderer } from '@/components/modals';
import { FormatPicker } from './FormatPicker';
import { useExport } from '@/hooks/editor/useExport/useExport';
import type { Format } from '@/types/export';

export interface ExportButtonProps {
  data: Record<string, unknown>[];
  /** 'table' allows all formats; 'document' only pdf/txt */
  exportAs?: 'table' | 'document';
  dataType?: 'default' | 'nested' | 'flattened' | 'lexical';
  /** Limits formats to this list before applying exportAs rules */
  exportFormats?: Format[];
  /** When true in 'table' mode, nested fields are merged/flattened upstream */
  mergeNested?: boolean;
}

export function ExportButton({
  data,
  exportAs = 'table',
  dataType = 'default',
  exportFormats,
  mergeNested = false,
}: ExportButtonProps) {
  const {
    format,
    setFormat,
    loading,
    formats,
    triggerRef,
    onStartExport,
  } = useExport({ data, exportAs, dataType, mergeNested, exportFormats });

  const ariaLabel = `Export as ${format.toUpperCase()}`;
  const isDocumentMode = exportAs === 'document';

  return (
    <>
      <div className="inline-flex items-center gap-2">
        {formats.length === 1 ? (
          <IconButton
            ref={triggerRef}
            onClick={onStartExport}
            disabled={loading}
            icon={loading ? 'loader2' : 'export'}
            aria-label={ariaLabel}
            tooltip={ariaLabel}
            aria-busy={loading}
            variant="primary"
          />
        ) : (
          <>
            <div className="relative inline-flex items-center">
              <FormatPicker
                value={format}
                onChange={setFormat}
                formats={formats}
                disabled={loading}
              />
              {isDocumentMode && (
                <Icon
                  name="info"
                  tooltip="Document mode only supports PDF and TXT exports"
                  className="w-4 h-4 ml-1 text-muted cursor-help"
                />
              )}
            </div>
            <Button
              ref={triggerRef}
              onClick={onStartExport}
              disabled={loading}
              aria-label={ariaLabel}
              aria-busy={loading}
              variant="outline"
              className="inline-flex items-center gap-1"
              // icon={loading ? "loader2" : "export"}
              tooltip={loading
                ? `Preparing ${format.toUpperCase()}...`
                : `Export ${format.toUpperCase()}`}
            >
              {loading ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                <DownloadIcon className="w-4 h-4" />
              )}
            </Button>
          </>
        )}
      </div>

      <ModalRenderer scope="global" instanceId="export-confirm" />
    </>
  );
}

// /**
//  * ExportButton updated to support story-based schemas + fields.
//  */

// "use client";

// import React, { useRef, useState } from "react";
// import { DownloadIcon, Loader } from "lucide-react";
// import {
//   exportCsv,
//   exportJson,
//   exportXlsx,
//   exportPdf,
//   exportTxt,
//   Format,
// } from "./exportUtils";
// import { getProcessedData } from "./dataUtils";
// import { showToast } from "@/lib/toast";
// import { Button, IconButton } from "@/components/atoms";
// import { z } from "zod";
// import type { FieldDefinitionMap } from "@/types/form";
// import { useModalStore } from "@/stores";
// import { ModalRenderer } from "@/components/modals";
// import { FormatPicker } from "./FormatPicker";

// export interface ExportButtonProps {
//   data: Record<string, any>[];
//   exportAs?: "table" | "document";
//   dataType?: "default" | "nested" | "flattened" | "lexical";
//   exportFormats?: Format[];
//   mergeNested?: boolean;
//   schema?: z.ZodObject<any>;
//   fieldMap?: FieldDefinitionMap;
//   defaultValues?: Record<string, any>;
// }


// export function ExportButton({
//   data,
//   exportAs = "table",
//   dataType = "default",
//   exportFormats,
//   mergeNested = false,
// }: ExportButtonProps) {
//   const openModal = useModalStore((s) => s.openModal);
//   const closeModal = useModalStore((s) => s.closeModal);
//   const exportRef = useRef(null);
//   const formats = exportFormats ?? (["csv", "json", "xlsx", "pdf", "txt"] as Format[]);
//   const [format, setFormat] = useState<Format>(formats[0]);
//   const [loading, setLoading] = useState(false);

//   const onCancel = () => closeModal();

//   const onSubmit = (values: any) => {
//     doExport(values.fileName?.trim() || "export");
//     closeModal();
//   };

//   const onStartExport = () => {
//     openModal(
//       "confirm",
//       "global",
//       "export-confirm",
//       {
//         title: "Enter a file name",
//         onCancel,
//         onSubmit,
//         submitText: `Export as ${format}`
//       })
//   }

//   const doExport = (name: string) => {
//     setLoading(true);
//     const rows = getProcessedData(data, dataType);
//     try {
//       setTimeout(() => {
//         if (exportAs === "document") {
//           if (format === "pdf") exportPdf(rows, name);
//           else exportTxt(rows, name);
//         } else {
//           switch (format) {
//             case "csv":
//               exportCsv(rows, mergeNested, name);
//               break;
//             case "json":
//               exportJson(rows, name);
//               break;
//             case "xlsx":
//               exportXlsx(rows, mergeNested, name);
//               break;
//             case "pdf":
//               exportPdf(rows, name);
//               break;
//             case "txt":
//               exportTxt(rows, name);
//               break;
//           }
//         }
//         showToast.success("Export complete");
//       }, 0);
//     } catch (err: any) {
//       console.error("Export error:", err);
//       showToast.error(`Export failed: ${err.message || err}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ariaLabel = `Export as ${format.toUpperCase()}`;

//   return (
//     <>
//       <div className="inline-flex items-center gap-2">
//         {formats.length === 1 ? (
//           <IconButton
//             ref={exportRef}
//             onClick={onStartExport}
//             disabled={loading}
//             icon={loading ? "loader2" : "export"}
//             aria-label={ariaLabel}
//             tooltip={ariaLabel}
//             aria-busy={loading}
//             variant="primary"
//           />
//         ) : (
//           <>
//             <Button
//               ref={exportRef}
//               onClick={onStartExport}
//               disabled={loading}
//               aria-label={ariaLabel}
//               aria-busy={loading}
//               className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-(--foreground) text-(--background) hover:bg-muted disabled:opacity-50"
//               title={ariaLabel}
//               variant="outline"
//             >
//               {loading ? (
//                 <Loader className="animate-spin w-4 h-4" />
//               ) : (
//                 <DownloadIcon className="w-4 h-4" />
//               )}
//               <span>
//                 {loading
//                   ? `Preparing ${format.toUpperCase()}...`
//                   : `Export ${format.toUpperCase()}`}
//               </span>
//             </Button>
//             <FormatPicker
//               value={format}
//               onChange={setFormat}
//               formats={formats}
//               disabled={loading}
//             />
//           </>
//         )}
//       </div>
//       <ModalRenderer scope="global" instanceId="export-confirm" />
//     </>
//   );
// }








// {showModal && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black/50">
//     <div className="bg-white text-(--foreground) p-6 rounded shadow-lg w-80 h-40">
//       <h2 className="text-lg font-semibold mb-4">
//         Export as {format.toUpperCase()}
//       </h2>
//       <DynamicForm
//         schema={fileSchema}
//         fieldMap={fileFieldMap}
//         onSubmit={onSubmit}
//         submitLabel={`Download`}
//         cancelLabel={`Cancel Export`}
//         showSubmit
//         showCancel
//         onCancel={() => setShowModal(prev => !prev)}
//       />
//     </div>
//   </div >
// )
// } */}

/* <Form>
  <for></for>

    <label className="block mb-2">
      File name:
      <input
        className="mt-1 block w-full border px-2 py-1 rounded"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        autoFocus
      />
    </label>
    <div className="mt-4 flex justify-end gap-2">
      <Button
        onClick={onCancel}
        variant="destructive"
        className="px-3 py-1 rounded"
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirmExport}
        disabled={!fileName.trim()}
        className="px-3 py-1 rounded disabled:opacity-50"
      >
        Export
      </Button>
  </form>
</Form> */


// // // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // // // // "use client";
// // // // // // // // import { DownloadIcon } from "lucide-react";

// // // // // // // // export function ExportButton({ data }: { data: any[] }) {
// // // // // // // //   const handleExport = () => {
// // // // // // // //     const csv = [
// // // // // // // //       Object.keys(data[0] || {}).join(","), // header
// // // // // // // //       ...data.map(row => Object.values(row).join(","))
// // // // // // // //     ].join("\n");

// // // // // // // //     const blob = new Blob([csv], { type: "text/csv" });
// // // // // // // //     const url = URL.createObjectURL(blob);
// // // // // // // //     const a = document.createElement("a");
// // // // // // // //     a.href = url;
// // // // // // // //     a.download = "export.csv";
// // // // // // // //     a.click();
// // // // // // // //     URL.revokeObjectURL(url);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <button
// // // // // // // //       className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // // // // //       onClick={handleExport}
// // // // // // // //       title="Export as CSV"
// // // // // // // //     >
// // // // // // // //       <DownloadIcon className="w-4 h-4" />
// // // // // // // //       Export
// // // // // // // //     </button>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // import React, { useState } from "react";
// // // // // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";

// // // // // // // const FORMATS = ["csv", "json", "xlsx"] as const;
// // // // // // // type Format = typeof FORMATS[number];

// // // // // // // export function ExportButton({
// // // // // // //   data,
// // // // // // // }: {
// // // // // // //   data: Record<string, any>[];
// // // // // // // }) {
// // // // // // //   const [format, setFormat] = useState<Format>("csv");

// // // // // // //   const handleExport = async () => {
// // // // // // //     let blob: Blob;
// // // // // // //     const filename = `export.${format}`;

// // // // // // //     if (format === "csv") {
// // // // // // //       const header = Object.keys(data[0] || {}).join(",");
// // // // // // //       const rows = data.map((r) => Object.values(r).join(","));
// // // // // // //       const csv = [header, ...rows].join("\n");
// // // // // // //       blob = new Blob([csv], { type: "text/csv" });

// // // // // // //     } else if (format === "json") {
// // // // // // //       const json = JSON.stringify(data, null, 2);
// // // // // // //       blob = new Blob([json], { type: "application/json" });

// // // // // // //     } else {
// // // // // // //       // XLSX via SheetJS
// // // // // // //       const { utils, write } = await import("xlsx");
// // // // // // //       const ws = utils.json_to_sheet(data);
// // // // // // //       const wb = utils.book_new();
// // // // // // //       utils.book_append_sheet(wb, ws, "Sheet1");
// // // // // // //       const wbout = write(wb, { bookType: "xlsx", type: "array" });
// // // // // // //       blob = new Blob([wbout], {
// // // // // // //         type:
// // // // // // //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // // // //       });
// // // // // // //     }

// // // // // // //     const url = URL.createObjectURL(blob);
// // // // // // //     const a = document.createElement("a");
// // // // // // //     a.href = url;
// // // // // // //     a.download = filename;
// // // // // // //     a.click();
// // // // // // //     URL.revokeObjectURL(url);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="inline-flex items-center gap-2">
// // // // // // //       <button
// // // // // // //         onClick={handleExport}
// // // // // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // // // //         title={`Export as ${format.toUpperCase()}`}
// // // // // // //       >
// // // // // // //         <DownloadIcon className="w-4 h-4" />
// // // // // // //         Export
// // // // // // //         <ChevronDownIcon className="w-3 h-3" />
// // // // // // //       </button>

// // // // // // //       <select
// // // // // // //         value={format}
// // // // // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // // // // //         className="px-1 py-0.5 border rounded bg-white"
// // // // // // //       >
// // // // // // //         {FORMATS.map((f) => (
// // // // // // //           <option key={f} value={f}>
// // // // // // //             {f.toUpperCase()}
// // // // // // //           </option>
// // // // // // //         ))}
// // // // // // //       </select>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import React, { useState } from "react";
// // // // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // // // // import type { Table as TanstackTable } from "@tanstack/react-table";
// // // // // // import { jsPDF } from "jspdf";
// // // // // // import "jspdf-autotable";
// // // // // // import { utils, write } from "xlsx";
// // // // // // import autoTable from "jspdf-autotable";

// // // // // // const FORMATS = ["csv", "json", "xlsx", "pdf"] as const;
// // // // // // type Format = typeof FORMATS[number];

// // // // // // export function ExportButton({ data }: { data: Record<string, any>[] }) {
// // // // // //   const [format, setFormat] = useState<Format>("csv");

// // // // // //   const handleExport = async () => {
// // // // // //     let blob: Blob;
// // // // // //     let filename = `export.${format}`;

// // // // // //     if (format === "csv") {
// // // // // //       const header = Object.keys(data[0] || {}).join(",");
// // // // // //       const rows = data.map((r) => Object.values(r).join(","));
// // // // // //       const csv = [header, ...rows].join("\n");
// // // // // //       blob = new Blob([csv], { type: "text/csv" });

// // // // // //     } else if (format === "json") {
// // // // // //       const json = JSON.stringify(data, null, 2);
// // // // // //       blob = new Blob([json], { type: "application/json" });

// // // // // //     } else if (format === "xlsx") {
// // // // // //       const ws = utils.json_to_sheet(data);
// // // // // //       const wb = utils.book_new();
// // // // // //       utils.book_append_sheet(wb, ws, "Sheet1");
// // // // // //       const wbout = write(wb, { bookType: "xlsx", type: "array" });
// // // // // //       blob = new Blob(
// // // // // //         [wbout],
// // // // // //         { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
// // // // // //       );

// // // // // //     } else {
// // // // // //       const doc = new jsPDF();
// // // // // //       const columns = Object.keys(data[0] || {}).map((key) => ({
// // // // // //         header: key,
// // // // // //         dataKey: key,
// // // // // //       }));
// // // // // //       autoTable(doc, {
// // // // // //         columns,
// // // // // //         body: data,
// // // // // //         styles: { fontSize: 8 },
// // // // // //         headStyles: { fillColor: [41, 128, 185] },
// // // // // //       });
// // // // // //       blob = doc.output("blob");
// // // // // //       filename = "export.pdf";
// // // // // //     }

// // // // // //     const url = URL.createObjectURL(blob);
// // // // // //     const a = document.createElement("a");
// // // // // //     a.href = url;
// // // // // //     a.download = filename;
// // // // // //     a.click();
// // // // // //     URL.revokeObjectURL(url);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="inline-flex items-center gap-2">
// // // // // //       <button
// // // // // //         onClick={handleExport}
// // // // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // // //         title={`Export as ${format.toUpperCase()}`}
// // // // // //       >
// // // // // //         <DownloadIcon className="w-4 h-4" />
// // // // // //         Export
// // // // // //         <ChevronDownIcon className="w-3 h-3" />
// // // // // //       </button>

// // // // // //       <select
// // // // // //         value={format}
// // // // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // // // //         className="px-1 py-0.5 border rounded bg-white"
// // // // // //       >
// // // // // //         {FORMATS.map((f) => (
// // // // // //           <option key={f} value={f}>
// // // // // //             {f.toUpperCase()}
// // // // // //           </option>
// // // // // //         ))}
// // // // // //       </select>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // "use client";
// // // // // import React, { useState } from "react";
// // // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // // // import { jsPDF } from "jspdf";
// // // // // import autoTable from "jspdf-autotable";
// // // // // import { utils, write } from "xlsx";

// // // // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // // // type Format = typeof FORMATS[number];

// // // // // interface ExportButtonProps {
// // // // //   data: Record<string, any>[];
// // // // // }

// // // // // export function ExportButton({ data }: ExportButtonProps) {
// // // // //   const [format, setFormat] = useState<Format>("csv");

// // // // //   const handleExport = async () => {
// // // // //     let blob: Blob;
// // // // //     let filename = `export.${format}`;

// // // // //     switch (format) {
// // // // //       case "csv": {
// // // // //         const header = Object.keys(data[0] || {}).join(",");
// // // // //         const rows = data.map((r) => Object.values(r).join(","));
// // // // //         blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
// // // // //         break;
// // // // //       }
// // // // //       case "json": {
// // // // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // // // //           type: "application/json",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "xlsx": {
// // // // //         const ws = utils.json_to_sheet(data);
// // // // //         const wb = utils.book_new();
// // // // //         utils.book_append_sheet(wb, ws, "Sheet1");
// // // // //         const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // // // //         blob = new Blob([arrayBuffer], {
// // // // //           type:
// // // // //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "pdf": {
// // // // //         const doc = new jsPDF();
// // // // //         // If data has 'content', render as text pages
// // // // //         if (data[0]?.content && typeof data[0].content === 'string') {
// // // // //           let y = 10;
// // // // //           data.forEach((row) => {
// // // // //             const lines = doc.splitTextToSize(row.content, 180);
// // // // //             doc.text(lines, 10, y);
// // // // //             y += lines.length * 8 + 10;
// // // // //             if (y > 280) {
// // // // //               doc.addPage();
// // // // //               y = 10;
// // // // //             }
// // // // //           });
// // // // //         } else {
// // // // //           // default table layout
// // // // //           const columns = Object.keys(data[0] || {}).map((key) => ({ header: key, dataKey: key }));
// // // // //           autoTable(doc, {
// // // // //             columns,
// // // // //             body: data,
// // // // //             styles: { fontSize: 8 },
// // // // //             headStyles: { fillColor: [41, 128, 185] },
// // // // //           });
// // // // //         }
// // // // //         blob = doc.output("blob");
// // // // //         filename = "export.pdf";
// // // // //         break;
// // // // //       }
// // // // //       case "txt": {
// // // // //         const texts = data.map((row) => {
// // // // //           if (typeof row.content === 'string') return row.content;
// // // // //           if (Array.isArray((row as any).children)) {
// // // // //             return (row as any).children.map((c: any) => c.text).join("");
// // // // //           }
// // // // //           return JSON.stringify(row);
// // // // //         });
// // // // //         const text = texts.join("\n\n");
// // // // //         blob = new Blob([text], { type: "text/plain" });
// // // // //         filename = "export.txt";
// // // // //         break;
// // // // //       }
// // // // //       default:
// // // // //         throw new Error(`Unsupported format: ${format}`);
// // // // //     }

// // // // //     const url = URL.createObjectURL(blob);
// // // // //     const a = document.createElement("a");
// // // // //     a.href = url;
// // // // //     a.download = filename;
// // // // //     a.click();
// // // // //     URL.revokeObjectURL(url);
// // // // //   };

// // // // //   return (
// // // // //     <div className="inline-flex items-center gap-2">
// // // // //       <button
// // // // //         onClick={handleExport}
// // // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // //         title={`Export as ${format.toUpperCase()}`}>
// // // // //         <DownloadIcon className="w-4 h-4" />
// // // // //         Export
// // // // //         <ChevronDownIcon className="w-3 h-3" />
// // // // //       </button>

// // // // //       <select
// // // // //         value={format}
// // // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // // //         className="px-1 py-0.5 border rounded bg-white"
// // // // //       >
// // // // //         {FORMATS.map((f) => (
// // // // //           <option key={f} value={f}>
// // // // //             {f.toUpperCase()}
// // // // //           </option>
// // // // //         ))}
// // // // //       </select>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // "use client";
// // // // // import React, { useState } from "react";
// // // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // // // import { jsPDF } from "jspdf";
// // // // // import autoTable from "jspdf-autotable";
// // // // // import { utils, write } from "xlsx";

// // // // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // // // type Format = typeof FORMATS[number];

// // // // // interface ExportButtonProps {
// // // // //   data: Record<string, any>[];
// // // // // }

// // // // // export function ExportButton({ data }: ExportButtonProps) {
// // // // //   const [format, setFormat] = useState<Format>("csv");

// // // // //   const handleExport = async () => {
// // // // //     let blob: Blob;
// // // // //     let filename = `export.${format}`;

// // // // //     // Prepare table-friendly data by stringifying nested objects
// // // // //     const tableData = data.map(row => {
// // // // //       const newRow: Record<string, any> = {};
// // // // //       Object.entries(row).forEach(([key, value]) => {
// // // // //         if (value !== null && typeof value === "object") {
// // // // //           newRow[key] = JSON.stringify(value);
// // // // //         } else {
// // // // //           newRow[key] = value;
// // // // //         }
// // // // //       });
// // // // //       return newRow;
// // // // //     });

// // // // //     switch (format) {
// // // // //       case "csv": {
// // // // //         const header = Object.keys(data[0] || {}).join(",");
// // // // //         const rows = data.map(r =>
// // // // //           Object.values(r)
// // // // //             .map(v => (v !== null && typeof v === "object" ? JSON.stringify(v) : v))
// // // // //             .join(",")
// // // // //         );
// // // // //         blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
// // // // //         break;
// // // // //       }
// // // // //       case "json": {
// // // // //         blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
// // // // //         break;
// // // // //       }
// // // // //       case "xlsx": {
// // // // //         const ws = utils.json_to_sheet(tableData);
// // // // //         const wb = utils.book_new();
// // // // //         utils.book_append_sheet(wb, ws, "Sheet1");
// // // // //         const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // // // //         blob = new Blob([arrayBuffer], {
// // // // //           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "pdf": {
// // // // //         const doc = new jsPDF();
// // // // //         if (data[0]?.content && typeof data[0].content === "string") {
// // // // //           let y = 10;
// // // // //           data.forEach(row => {
// // // // //             const lines = doc.splitTextToSize(row.content, 180);
// // // // //             doc.text(lines, 10, y);
// // // // //             y += lines.length * 8 + 10;
// // // // //             if (y > 280) {
// // // // //               doc.addPage();
// // // // //               y = 10;
// // // // //             }
// // // // //           });
// // // // //         } else {
// // // // //           const columns = Object.keys(tableData[0] || {}).map(key => ({ header: key, dataKey: key }));
// // // // //           autoTable(doc, {
// // // // //             columns,
// // // // //             body: tableData,
// // // // //             styles: { fontSize: 8 },
// // // // //             headStyles: { fillColor: [41, 128, 185] },
// // // // //           });
// // // // //         }
// // // // //         blob = doc.output("blob");
// // // // //         filename = "export.pdf";
// // // // //         break;
// // // // //       }
// // // // //       case "txt": {
// // // // //         const texts = data.map(row => {
// // // // //           if (typeof row.content === "string") return row.content;
// // // // //           if (Array.isArray((row as any).children)) {
// // // // //             return (row as any).children.map((c: any) => c.text).join("");
// // // // //           }
// // // // //           return JSON.stringify(row);
// // // // //         });
// // // // //         const text = texts.join("\n\n");
// // // // //         blob = new Blob([text], { type: "text/plain" });
// // // // //         filename = "export.txt";
// // // // //         break;
// // // // //       }
// // // // //       default:
// // // // //         throw new Error(`Unsupported format: ${format}`);
// // // // //     }

// // // // //     const url = URL.createObjectURL(blob);
// // // // //     const a = document.createElement("a");
// // // // //     a.href = url;
// // // // //     a.download = filename;
// // // // //     a.click();
// // // // //     URL.revokeObjectURL(url);
// // // // //   };

// // // // //   return (
// // // // //     <div className="inline-flex items-center gap-2">
// // // // //       <button
// // // // //         onClick={handleExport}
// // // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // //         title={`Export as ${format.toUpperCase()}`}>
// // // // //         <DownloadIcon className="w-4 h-4" />
// // // // //         Export
// // // // //         <ChevronDownIcon className="w-3 h-3" />
// // // // //       </button>
// // // // //       <select
// // // // //         value={format}
// // // // //         onChange={e => setFormat(e.target.value as Format)}
// // // // //         className="px-1 py-0.5 border rounded bg-white"
// // // // //       >
// // // // //         {FORMATS.map(f => (
// // // // //           <option key={f} value={f}>
// // // // //             {f.toUpperCase()}
// // // // //           </option>
// // // // //         ))}
// // // // //       </select>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";
// // // // import React, { useState } from "react";
// // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // // import { jsPDF } from "jspdf";
// // // // import autoTable from "jspdf-autotable";
// // // // import { utils, write } from "xlsx";

// // // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // // type Format = typeof FORMATS[number];

// // // // interface ExportButtonProps {
// // // //   data: Record<string, any>[];
// // // // }

// // // // // Utility to deeply flatten objects: { a: { b: 1 } } -> { 'a.b': 1 }
// // // // function flattenObject(
// // // //   obj: Record<string, any>,
// // // //   parentKey = "",
// // // //   result: Record<string, any> = {}
// // // // ): Record<string, any> {
// // // // //   for (const [key, value] of Object.entries(obj)) {
// // // // //     const newKey = parentKey ? `${parentKey}.${key}` : key;
// // // // //     if (value && typeof value === "object" && !Array.isArray(value)) {
// // // // //       flattenObject(value, newKey, result);
// // // // //     } else {
// // // // //       result[newKey] = value;
// // // // //     }
// // // // //   }
// // // // //   return result;
// // // // // }

// // // // // export function ExportButton({ data }: ExportButtonProps) {
// // // // //   const [format, setFormat] = useState<Format>("csv");

// // // // //   const handleExport = async () => {
// // // // //     let blob: Blob;
// // // // //     let filename = `export.${format}`;

// // // // //     // Flatten nested data for table-based formats
// // // // //     const flatData = data.map((row) => flattenObject(row));

// // // // //     switch (format) {
// // // // //       case "csv": {
// // // // //         if (!flatData.length) {
// // // // //           blob = new Blob([""], { type: "text/csv" });
// // // // //           break;
// // // // //         }
// // // // //         const headers = Object.keys(flatData[0]);
// // // // //         const csvRows = flatData.map((row) =>
// // // // //           headers.map((h) => row[h] ?? "").join(",")
// // // // //         );
// // // // //         const csv = [headers.join(","), ...csvRows].join("\n");
// // // // //         blob = new Blob([csv], { type: "text/csv" });
// // // // //         break;
// // // // //       }
// // // // //       case "json": {
// // // // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // // // //           type: "application/json",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "xlsx": {
// // // // //         const ws = utils.json_to_sheet(flatData);
// // // // //         const wb = utils.book_new();
// // // // //         utils.book_append_sheet(wb, ws, "Sheet1");
// // // // //         const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // // // //         blob = new Blob([arrayBuffer], {
// // // // //           type:
// // // // //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "pdf": {
// // // // //         const doc = new jsPDF();
// // // // //         if (data[0]?.content && typeof data[0].content === "string") {
// // // // //           // Flowing text export for content rows
// // // // //           let y = 10;
// // // // //           data.forEach((row) => {
// // // // //             const lines = doc.splitTextToSize(row.content, 180);
// // // // //             doc.text(lines, 10, y);
// // // // //             y += lines.length * 8 + 10;
// // // // //             if (y > 280) {
// // // // //               doc.addPage();
// // // // //               y = 10;
// // // // //             }
// // // // //           });
// // // // //         } else {
// // // // //           // Table layout using flattened keys
// // // // //           if (flatData.length) {
// // // // //             const columns = Object.keys(flatData[0]).map((key) => ({ header: key, dataKey: key }));
// // // // //             autoTable(doc, {
// // // // //               columns,
// // // // //               body: flatData,
// // // // //               styles: { fontSize: 8 },
// // // // //               headStyles: { fillColor: [41, 128, 185] },
// // // // //             });
// // // // //           }
// // // // //         }
// // // // //         blob = doc.output("blob");
// // // // //         filename = "export.pdf";
// // // // //         break;
// // // // //       }
// // // // //       case "txt": {
// // // // //         // Flatten to plain paragraphs
// // // // //         const texts = data.map((row) => {
// // // // //           if (typeof row.content === "string") return row.content;
// // // // //           if (Array.isArray((row as any).children)) {
// // // // //             return (row as any).children.map((c: any) => c.text).join("");
// // // // //           }
// // // // //           // For nested objects, convert to key: value lines
// // // // //           const flat = flattenObject(row);
// // // // //           return Object.entries(flat)
// // // // //             .map(([k, v]) => `${k}: ${v}`)
// // // // //             .join("\n");
// // // // //         });
// // // // //         const text = texts.join("\n\n");
// // // // //         blob = new Blob([text], { type: "text/plain" });
// // // // //         filename = "export.txt";
// // // // //         break;
// // // // //       }
// // // // //       default:
// // // // //         throw new Error(`Unsupported format: ${format}`);
// // // // //     }

// // // // //     const url = URL.createObjectURL(blob);
// // // // //     const a = document.createElement("a");
// // // // //     a.href = url;
// // // // //     a.download = filename;
// // // // //     a.click();
// // // // //     URL.revokeObjectURL(url);
// // // // //   };

// // // // //   return (
// // // // // //     <div className="inline-flex items-center gap-2">
// // // // // //       <button
// // // // // //         onClick={handleExport}
// // // // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // // //         title={`Export as ${format.toUpperCase()}`}>
// // // // // //         <DownloadIcon className="w-4 h-4" />
// // // // // //         Export
// // // // // //         <ChevronDownIcon className="w-3 h-3" />
// // // // // //       </button>
// // // // // //       <select
// // // // // //         value={format}
// // // // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // // // //         className="px-1 py-0.5 border rounded bg-white"
// // // // // //       >
// // // // // //         {FORMATS.map((f) => (
// // // // // //           <option key={f} value={f}>
// // // // // //             {f.toUpperCase()}
// // // // // //           </option>
// // // // // //         ))}
// // // // // //       </select>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // "use client";
// // // // // import React, { useState } from "react";
// // // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // // // import { jsPDF } from "jspdf";
// // // // // import autoTable from "jspdf-autotable";
// // // // // import { utils, write } from "xlsx";

// // // // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // // // type Format = typeof FORMATS[number];

// // // // // interface ExportButtonProps {
// // // // //   data: Record<string, any>[];
// // // // // }

// // // // // export function ExportButton({ data }: ExportButtonProps) {
// // // // //   const [format, setFormat] = useState<Format>("csv");

// // // // //   const handleExport = async () => {
// // // // //     let blob: Blob;
// // // // //     let filename = `export.${format}`;

// // // // //     // Prepare table-friendly data: include combined nested and individual fields
// // // // //     const flatData = data.map((row) => {
// // // // //       const newRow: Record<string, any> = {};
// // // // //       Object.entries(row).forEach(([key, value]) => {
// // // // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // // // //           // Combined column: JSON string of nested object
// // // // //           newRow[key] = JSON.stringify(value);
// // // // //           // Individual sub-columns for each nested key
// // // // //           Object.entries(value).forEach(([subKey, subVal]) => {
// // // // //             newRow[`${key}.${subKey}`] = subVal;
// // // // //           });
// // // // //         } else {
// // // // //           newRow[key] = value;
// // // // //         }
// // // // //       });
// // // // //       return newRow;
// // // // //     });

// // // // //     switch (format) {
// // // // //       case "csv": {
// // // // //         if (!flatData.length) {
// // // // //           blob = new Blob([""], { type: "text/csv" });
// // // // //           break;
// // // // //         }
// // // // //         const headers = Object.keys(flatData[0]);
// // // // //         const csvRows = flatData.map((row) =>
// // // // //           headers.map((h) => String(row[h] ?? "")).join(",")
// // // // //         );
// // // // //         const csv = [headers.join(","), ...csvRows].join("\n");
// // // // //         blob = new Blob([csv], { type: "text/csv" });
// // // // //         break;
// // // // //       }
// // // // //       case "json": {
// // // // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // // // //           type: "application/json",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "xlsx": {
// // // // //         const ws = utils.json_to_sheet(flatData);
// // // // //         const wb = utils.book_new();
// // // // //         utils.book_append_sheet(wb, ws, "Sheet1");
// // // // //         const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // // // //         blob = new Blob([arrayBuffer], {
// // // // //           type:
// // // // //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // // //         });
// // // // //         break;
// // // // //       }
// // // // //       case "pdf": {
// // // // //         const doc = new jsPDF();
// // // // //         if (flatData.length) {
// // // // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key, dataKey: key }));
// // // // //           autoTable(doc, {
// // // // //             columns,
// // // // //             body: flatData,
// // // // //             styles: { fontSize: 8 },
// // // // //             headStyles: { fillColor: [41, 128, 185] },
// // // // //           });
// // // // //         }
// // // // //         blob = doc.output("blob");
// // // // //         filename = "export.pdf";
// // // // //         break;
// // // // //       }
// // // // //       case "txt": {
// // // // //         const texts = data.map((row) => {
// // // // //           if (typeof row.content === "string") return row.content;
// // // // //           if (Array.isArray((row as any).children)) {
// // // // //             return (row as any).children.map((c: any) => c.text).join("");
// // // // //           }
// // // // //           // For nested objects, combine primary and sub-values
// // // // //           const lines: string[] = [];
// // // // //           Object.entries(row).forEach(([key, value]) => {
// // // // //             if (value !== null && typeof value === "object") {
// // // // //               lines.push(`${key}: ${JSON.stringify(value)}`);
// // // // //             } else {
// // // // //               lines.push(`${key}: ${value}`);
// // // // //             }
// // // // //           });
// // // // //           return lines.join("\n");
// // // // //         });
// // // // //         const text = texts.join("\n\n");
// // // // //         blob = new Blob([text], { type: "text/plain" });
// // // // //         filename = "export.txt";
// // // // //         break;
// // // // //       }
// // // // //       default:
// // // // //         throw new Error(`Unsupported format: ${format}`);
// // // // //     }

// // // // //     const url = URL.createObjectURL(blob);
// // // // //     const a = document.createElement("a");
// // // // //     a.href = url;
// // // // //     a.download = filename;
// // // // //     a.click();
// // // // //     URL.revokeObjectURL(url);
// // // // //   };

// // // // //   return (
// // // // //     <div className="inline-flex items-center gap-2">
// // // // //       <button
// // // // //         onClick={handleExport}
// // // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // // //         title={`Export as ${format.toUpperCase()}`}>
// // // // //         <DownloadIcon className="w-4 h-4" />
// // // // //         Export
// // // // //         <ChevronDownIcon className="w-3 h-3" />
// // // // //       </button>
// // // // //       <select
// // // // //         value={format}
// // // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // // //         className="px-1 py-0.5 border rounded bg-white"
// // // // //       >
// // // // //         {FORMATS.map((f) => (
// // // // //           <option key={f} value={f}>
// // // // //             {f.toUpperCase()}
// // // // //           </option>
// // // // //         ))}
// // // // //       </select>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";
// // // // import React, { useState } from "react";
// // // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // // import { jsPDF } from "jspdf";
// // // // import autoTable from "jspdf-autotable";
// // // // import { utils, write } from "xlsx";

// // // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // // type Format = typeof FORMATS[number];

// // // // interface ExportButtonProps {
// // // //   data: Record<string, any>[];
// // // // }

// // // // export function ExportButton({ data }: ExportButtonProps) {
// // // //   const [format, setFormat] = useState<Format>("csv");

// // // //   const handleExport = async () => {
// // // //     let blob: Blob;
// // // //     let filename = `export.${format}`;

// // // //     // Transform data: if object field, add a combined column with key name and individual sub-columns
// // // //     const flatData = data.map((row) => {
// // // //       const newRow: Record<string, any> = {};
// // // //       Object.entries(row).forEach(([key, value]) => {
// // // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // // //           // Combined column shows the nested field name
// // // //           newRow[key] = key;
// // // //           // Sub-columns for each nested property
// // // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // // //             newRow[subKey] = subVal;
// // // //           });
// // // //         } else {
// // // //           newRow[key] = value;
// // // //         }
// // // //       });
// // // //       return newRow;
// // // //     });

// // // //     switch (format) {
// // // //       case "csv": {
// // // //         if (!flatData.length) {
// // // //           blob = new Blob([""], { type: "text/csv" });
// // // //         } else {
// // // //           const headers = Object.keys(flatData[0]);
// // // //           const csvRows = flatData.map((r) =>
// // // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // // //           );
// // // //           const csv = [headers.join(","), ...csvRows].join("\n");
// // // //           blob = new Blob([csv], { type: "text/csv" });
// // // //         }
// // // //         break;
// // // //       }
// // // //       case "json": {
// // // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // // //           type: "application/json",
// // // //         });
// // // //         break;
// // // //       }
// // // //       case "xlsx": {
// // // //         const ws = utils.json_to_sheet(flatData);
// // // //         const wb = utils.book_new();
// // // //         utils.book_append_sheet(wb, ws, "Sheet1");
// // // //         const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // // //         blob = new Blob([arrayBuffer], {
// // // //           type:
// // // //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // // //         });
// // // //         break;
// // // //       }
// // // //       case "pdf": {
// // // //         const doc = new jsPDF();
// // // //         if (flatData.length) {
// // // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key, dataKey: key }));
// // // //           autoTable(doc, {
// // // //             columns,
// // // //             body: flatData,
// // // //             styles: { fontSize: 8 },
// // // //             headStyles: { fillColor: [41, 128, 185] },
// // // //           });
// // // //         }
// // // //         blob = doc.output("blob");
// // // //         filename = "export.pdf";
// // // //         break;
// // // //       }
// // // //       case "txt": {
// // // //         // Plain text: key: value lines per row
// // // //         const texts = flatData.map((r) =>
// // // //           Object.entries(r)
// // // //             .map(([k, v]) => `${k}: ${v}`)
// // // //             .join("\n")
// // // //         );
// // // //         const text = texts.join("\n\n");
// // // //         blob = new Blob([text], { type: "text/plain" });
// // // //         filename = "export.txt";
// // // //         break;
// // // //       }
// // // //       default:
// // // //         throw new Error(`Unsupported format: ${format}`);
// // // //     }

// // // //     const url = URL.createObjectURL(blob);
// // // //     const a = document.createElement("a");
// // // //     a.href = url;
// // // //     a.download = filename;
// // // //     a.click();
// // // //     URL.revokeObjectURL(url);
// // // //   };

// // // //   return (
// // // //     <div className="inline-flex items-center gap-2">
// // // //       <button
// // // //         onClick={handleExport}
// // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // //         title={`Export as ${format.toUpperCase()}`}>
// // // //         <DownloadIcon className="w-4 h-4" />
// // // //         Export
// // // //         <ChevronDownIcon className="w-3 h-3" />
// // // //       </button>
// // // //       <select
// // // //         value={format}
// // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // //         className="px-1 py-0.5 border rounded bg-white"
// // // //       >
// // // //         {FORMATS.map((f) => (
// // // //           <option key={f} value={f}>
// // // //             {f.toUpperCase()}
// // // //           </option>
// // // //         ))}
// // // //       </select>
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";
// // // import React, { useState } from "react";
// // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // import { jsPDF } from "jspdf";
// // // import autoTable from "jspdf-autotable";
// // // import { utils, write } from "xlsx";

// // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // type Format = typeof FORMATS[number];

// // // interface ExportButtonProps {
// // //   data: Record<string, any>[];
// // // }

// // // export function ExportButton({ data }: ExportButtonProps) {
// // //   const [format, setFormat] = useState<Format>("csv");

// // //   const handleExport = async () => {
// // //     let blob: Blob;
// // //     let filename = `export.${format}`;

// // //     // Prepare flatData: nested objects get combined key plus subcolumns
// // //     const flatData = data.map((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });

// // //     switch (format) {
// // //       case "xlsx": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// // //         } else {
// // //           const ws = utils.json_to_sheet(flatData);
// // //           const wb = utils.book_new();
// // //           utils.book_append_sheet(wb, ws, "Sheet1");
// // //           // Merge 'info' column across rows if present
// // //           const headers = Object.keys(flatData[0]);
// // //           const infoIndex = headers.indexOf("info");
// // //           if (infoIndex >= 0) {
// // //             const merges = [
// // //               {
// // //                 s: { r: 1, c: infoIndex },
// // //                 e: { r: flatData.length, c: infoIndex },
// // //               },
// // //             ];
// // //             ws["!merges"] = merges;
// // //           }
// // //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         if (flatData.length) {
// // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key, dataKey: key }));
// // //           autoTable(doc, {
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (data) => {
// // //               if (data.section === "body" && data.column.dataKey === "info") {
// // //                 if (data.row.index === 0) {
// // //                   data.cell.rowSpan = flatData.length;
// // //                 } else {
// // //                   data.cell.rowSpan = 0;
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // //           const rows = flatData.map((r) =>
// // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // //           );
// // //           const csv = [headers.join(","), ...rows].join("\n");
// // //           blob = new Blob([csv], { type: "text/csv" });
// // //         }
// // //         break;
// // //       }
// // //       case "json": {
// // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // //           type: "application/json",
// // //         });
// // //         break;
// // //       }
// // //       case "txt": {
// // //         const texts = flatData.map((r) =>
// // //           Object.entries(r)
// // //             .map(([k, v]) => `${k}: ${v}`)
// // //             .join("\n")
// // //         );
// // //         const text = texts.join("\n\n");
// // //         blob = new Blob([text], { type: "text/plain" });
// // //         filename = "export.txt";
// // //         break;
// // //       }
// // //       default:
// // //         throw new Error(`Unsupported format: ${format}`);
// // //     }

// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = filename;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center gap-2">
// // //       <button
// // //         onClick={handleExport}
// // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // //         title={`Export as ${format.toUpperCase()}`}>
// // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // //       </button>
// // //       <select
// // //         value={format}
// // //         onChange={(e) => setFormat(e.target.value as Format)}
// // //         className="px-1 py-0.5 border rounded bg-white"
// // //       >
// // //         {FORMATS.map((f) => (
// // //           <option key={f} value={f}>
// // //             {f.toUpperCase()}
// // //           </option>
// // //         ))}
// // //       </select>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import React, { useState } from "react";
// // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import { utils, write } from "xlsx";

// // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // type Format = typeof FORMATS[number];

// // interface ExportButtonProps {
// //   data: Record<string, any>[];
// // }

// // export function ExportButton({ data }: ExportButtonProps) {
// //   const [format, setFormat] = useState<Format>("csv");

// //   const handleExport = async () => {
// //     let blob: Blob;
// //     let filename = `export.${format}`;

// //     // Prepare flatData: nested objects get combined key plus subcolumns
// //     const flatData = data.map((row) => {
// //       const newRow: Record<string, any> = {};
// //       Object.entries(row).forEach(([key, value]) => {
// //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// //           // Combined column shows the field name
// //           newRow[key] = key;
// //           // Sub-columns
// //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// //             newRow[subKey] = subVal;
// //           });
// //         } else {
// //           newRow[key] = value;
// //         }
// //       });
// //       return newRow;
// //     });

// //     switch (format) {
// //       case "xlsx": {
// //         if (!flatData.length) {
// //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// //         } else {
// //           const ws = utils.json_to_sheet(flatData);
// //           const wb = utils.book_new();
// //           utils.book_append_sheet(wb, ws, "Sheet1");
// //           // Merge 'info' column across rows if present
// //           const headers = Object.keys(flatData[0]);
// //           const infoIndex = headers.indexOf("info");
// //           if (infoIndex >= 0) {
// //             const merges = [
// //               {
// //                 s: { r: 1, c: infoIndex },
// //                 e: { r: flatData.length, c: infoIndex },
// //               },
// //             ];
// //             ws["!merges"] = merges;
// //             // Clear subsequent 'info' cells to simulate merge
// //             for (let i = 2; i <= flatData.length; i++) {
// //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// //               ws[cellAddress] = { t: 's', v: '' };
// //             }
// //           }
// //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// //           blob = new Blob([arrayBuffer], {
// //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //           });
// //         }
// //         break;
// //       }
// //       case "pdf": {
// //         const doc = new jsPDF();
// //         if (flatData.length) {
// //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key, dataKey: key }));
// //           autoTable(doc, {
// //             showHead: 'firstPage',
// //             columns,
// //             body: flatData,
// //             styles: { fontSize: 8 },
// //             headStyles: { fillColor: [41, 128, 185] },
// //             didParseCell: (data) => {
// //               if (data.section === "body" && data.column.dataKey === "info") {
// //                 if (data.row.index === 0) {
// //                   data.cell.rowSpan = flatData.length;
// //                 } else {
// //                   data.cell.rowSpan = 0;
// //                 }
// //               }
// //             },
// //           });

// //         }
// //         blob = doc.output("blob");
// //         filename = "export.pdf";
// //         break;
// //       }
// //       case "csv": {
// //         if (!flatData.length) {
// //           blob = new Blob([""], { type: "text/csv" });
// //         } else {
// //           const headers = Object.keys(flatData[0]);
// //           const rows = flatData.map((r) =>
// //             headers.map((h) => String(r[h] ?? "")).join(",")
// //           );
// //           const csv = [headers.join(","), ...rows].join("\n");
// //           blob = new Blob([csv], { type: "text/csv" });
// //         }
// //         break;
// //       }
// //       case "json": {
// //         blob = new Blob([JSON.stringify(data, null, 2)], {
// //           type: "application/json",
// //         });
// //         break;
// //       }
// //       case "txt": {
// //         const texts = flatData.map((r) =>
// //           Object.entries(r)
// //             .map(([k, v]) => `${k}: ${v}`)
// //             .join("\n")
// //         );
// //         const text = texts.join("\n\n");
// //         blob = new Blob([text], { type: "text/plain" });
// //         filename = "export.txt";
// //         break;
// //       }
// //       default:
// //         throw new Error(`Unsupported format: ${format}`);
// //     }

// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = filename;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   return (
// //     <div className="inline-flex items-center gap-2">
// //       <button
// //         onClick={handleExport}
// //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// //         title={`Export as ${format.toUpperCase()}`}>
// //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// //       </button>
// //       <select
// //         value={format}
// //         onChange={(e) => setFormat(e.target.value as Format)}
// //         className="px-1 py-0.5 border rounded bg-white"
// //       >
// //         {FORMATS.map((f) => (
// //           <option key={f} value={f}>
// //             {f.toUpperCase()}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }

// // "use client";
// // import React, { useState } from "react";
// // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import { utils, write } from "xlsx";

// // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // type Format = typeof FORMATS[number];

// // interface ExportButtonProps {
// //   data: Record<string, any>[];
// // }

// // export function ExportButton({ data }: ExportButtonProps) {
// //   const [format, setFormat] = useState<Format>("csv");

// //   const handleExport = async () => {
// //     let blob: Blob;
// //     let filename = `export.${format}`;

// //     // Prepare flatData: nested objects get combined key plus subcolumns
// //     const flatData = data.map((row) => {
// //       const newRow: Record<string, any> = {};
// //       Object.entries(row).forEach(([key, value]) => {
// //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// //           // Combined column shows the field name
// //           newRow[key] = key;
// //           // Sub-columns
// //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// //             newRow[subKey] = subVal;
// //           });
// //         } else {
// //           newRow[key] = value;
// //         }
// //       });
// //       return newRow;
// //     });

// //     switch (format) {
// //       case "xlsx": {
// //         if (!flatData.length) {
// //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// //         } else {
// //           const ws = utils.json_to_sheet(flatData);
// //           const wb = utils.book_new();
// //           utils.book_append_sheet(wb, ws, "Sheet1");
// //           // Merge 'info' column across rows if present
// //           const headers = Object.keys(flatData[0]);
// //           const infoIndex = headers.indexOf("info");
// //           if (infoIndex >= 0) {
// //             const merges = [
// //               {
// //                 s: { r: 1, c: infoIndex },
// //                 e: { r: flatData.length, c: infoIndex },
// //               },
// //             ];
// //             ws["!merges"] = merges;
// //             // Clear subsequent 'info' cells to simulate merge
// //             for (let i = 2; i <= flatData.length; i++) {
// //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// //               ws[cellAddress] = { t: 's', v: '' };
// //             }
// //           }
// //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         if (flatData.length) {
// // //           // Build columns, blank header for combined nested field
// // //           const columns = Object.keys(flatData[0]).map((key) => ({
// // //             header: key === 'info' ? '' : key,
// // //             dataKey: key,
// // //           }));
// // //           autoTable(doc, {
// // //             startY: 10,
// // //             pageBreak: 'avoid',
// // //             showHead: 'firstPage',
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (data) => {
// // //               if (data.section === "body" && data.column.dataKey === "info") {
// // //                 if (data.row.index === 0) {
// // //                   data.cell.rowSpan = flatData.length;
// // //                 } else {
// // //                   data.cell.rowSpan = 0;
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // //           const rows = flatData.map((r) =>
// // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // //           );
// // //           const csv = [headers.join(","), ...rows].join("\n");
// // //           blob = new Blob([csv], { type: "text/csv" });
// // //         }
// // //         break;
// // //       }
// // //       case "json": {
// // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // //           type: "application/json",
// // //         });
// // //         break;
// // //       }
// // //       case "txt": {
// // //         const texts = flatData.map((r) =>
// // //           Object.entries(r)
// // //             .map(([k, v]) => `${k}: ${v}`)
// // //             .join("\n")
// // //         );
// // //         const text = texts.join("\n\n");
// // //         blob = new Blob([text], { type: "text/plain" });
// // //         filename = "export.txt";
// // //         break;
// // //       }
// // //       default:
// // //         throw new Error(`Unsupported format: ${format}`);
// // //     }

// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = filename;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center gap-2">
// // //       <button
// // //         onClick={handleExport}
// // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // //         title={`Export as ${format.toUpperCase()}`}>
// // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // //       </button>
// // //       <select
// // //         value={format}
// // //         onChange={(e) => setFormat(e.target.value as Format)}
// // //         className="px-1 py-0.5 border rounded bg-white"
// // //       >
// // //         {FORMATS.map((f) => (
// // //           <option key={f} value={f}>
// // //             {f.toUpperCase()}
// // //           </option>
// // //         ))}
// // //       </select>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import React, { useState } from "react";
// // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import { utils, write } from "xlsx";

// // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // type Format = typeof FORMATS[number];

// // interface ExportButtonProps {
// //   data: Record<string, any>[];
// // }

// // export function ExportButton({ data }: ExportButtonProps) {
// //   const [format, setFormat] = useState<Format>("csv");

// //   const handleExport = async () => {
// //     let blob: Blob;
// //     let filename = `export.${format}`;

// //     // Prepare flatData: nested objects get combined key plus subcolumns
// //     const flatData = data.map((row) => {
// //       const newRow: Record<string, any> = {};
// //       Object.entries(row).forEach(([key, value]) => {
// //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// //           // Combined column shows the field name
// //           newRow[key] = key;
// //           // Sub-columns
// //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// //             newRow[subKey] = subVal;
// //           });
// //         } else {
// //           newRow[key] = value;
// //         }
// //       });
// //       return newRow;
// //     });

// //     switch (format) {
// // //       case "xlsx": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// // //         } else {
// // //           const ws = utils.json_to_sheet(flatData);
// // //           const wb = utils.book_new();
// // //           utils.book_append_sheet(wb, ws, "Sheet1");
// // //           // Merge 'info' column across rows if present
// // //           const headers = Object.keys(flatData[0]);
// // //           const infoIndex = headers.indexOf("info");
// // //           if (infoIndex >= 0) {
// // //             const merges = [
// // //               {
// // //                 s: { r: 1, c: infoIndex },
// // //                 e: { r: flatData.length, c: infoIndex },
// // //               },
// // //             ];
// // //             ws["!merges"] = merges;
// // //             // Clear subsequent 'info' cells to simulate merge
// // //             for (let i = 2; i <= flatData.length; i++) {
// // //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// // //               ws[cellAddress] = { t: 's', v: '' };
// // //             }
// // //           }
// // //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         if (flatData.length) {
// // //           // Build columns, blank header for combined nested field
// // //           const columns = Object.keys(flatData[0]).map((key) => ({
// // //             header: key === 'info' ? '' : key,
// // //             dataKey: key,
// // //           }));
// // //           autoTable(doc, {
// // //             startY: 10,
// // //             pageBreak: 'avoid',
// // //             showHead: 'firstPage',
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (data) => {
// // //               if (data.section === "body" && data.column.dataKey === "info") {
// // //                 // Only show 'info' in the first row; clear text in others
// // //                 if (data.row.index > 0) {
// // //                   data.cell.text = [];
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // //           const rows = flatData.map((r) =>
// // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // //           );
// // //           const csv = [headers.join(","), ...rows].join("\n");
// // //           blob = new Blob([csv], { type: "text/csv" });
// // //         }
// // //         break;
// // //       }
// // //       case "json": {
// // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // //           type: "application/json",
// // //         });
// // //         break;
// // //       }
// // //       case "txt": {
// // //         const texts = flatData.map((r) =>
// // //           Object.entries(r)
// // //             .map(([k, v]) => `${k}: ${v}`)
// // //             .join("\n")
// // //         );
// // //         const text = texts.join("\n\n");
// // //         blob = new Blob([text], { type: "text/plain" });
// // //         filename = "export.txt";
// // //         break;
// // //       }
// // //       default:
// // //         throw new Error(`Unsupported format: ${format}`);
// // //     }

// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = filename;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center gap-2">
// // //       <button
// // //         onClick={handleExport}
// // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // //         title={`Export as ${format.toUpperCase()}`}>
// // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // //       </button>
// // //       <select
// // //         value={format}
// // //         onChange={(e) => setFormat(e.target.value as Format)}
// // //         className="px-1 py-0.5 border rounded bg-white"
// // //       >
// // //         {FORMATS.map((f) => (
// // //           <option key={f} value={f}>
// // //             {f.toUpperCase()}
// // //           </option>
// // //         ))}
// // //       </select>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import React, { useState } from "react";
// // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import { utils, write } from "xlsx";

// // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // type Format = typeof FORMATS[number];

// // interface ExportButtonProps {
// //   data: Record<string, any>[];
// // }

// // export function ExportButton({ data }: ExportButtonProps) {
// //   const [format, setFormat] = useState<Format>("csv");

// //   const handleExport = async () => {
// //     let blob: Blob;
// //     let filename = `export.${format}`;

// //     // Prepare flatData: nested objects get combined key plus subcolumns
// //     const flatData = data.map((row) => {
// //       const newRow: Record<string, any> = {};
// //       Object.entries(row).forEach(([key, value]) => {
// //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// //           // Combined column shows the field name
// //           newRow[key] = key;
// //           // Sub-columns
// //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// //             newRow[subKey] = subVal;
// //           });
// //         } else {
// //           newRow[key] = value;
// //         }
// //       });
// //       return newRow;
// //     });

// //     switch (format) {
// //       case "xlsx": {
// //         if (!flatData.length) {
// //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// //         } else {
// //           const ws = utils.json_to_sheet(flatData);
// //           const wb = utils.book_new();
// //           utils.book_append_sheet(wb, ws, "Sheet1");
// //           // Merge 'info' column across rows if present
// //           const headers = Object.keys(flatData[0]);
// //           const infoIndex = headers.indexOf("info");
// //           if (infoIndex >= 0) {
// //             const merges = [
// // //               {
// // //                 s: { r: 1, c: infoIndex },
// // //                 e: { r: flatData.length, c: infoIndex },
// // //               },
// // //             ];
// // //             ws["!merges"] = merges;
// // //             // Clear subsequent 'info' cells to simulate merge
// // //             for (let i = 2; i <= flatData.length; i++) {
// // //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// // //               ws[cellAddress] = { t: 's', v: '' };
// // //             }
// // //           }
// // //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         // If data rows have 'content', render as flowing text document
// // //         if (data[0]?.content && typeof data[0].content === "string") {
// // //           let y = 10;
// // //           data.forEach((row) => {
// // //             const lines = doc.splitTextToSize(row.content, 180);
// // //             doc.text(lines, 10, y);
// // //             y += lines.length * 8 + 10;
// // //             if (y > 280) {
// // //               doc.addPage();
// // //               y = 10;
// // //             }
// // //           });
// // //         } else if (flatData.length) {
// // //           // Table layout for non-lexical data
// // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key === 'info' ? '' : key, dataKey: key }));
// // //           autoTable(doc, {
// // //             startY: 10,
// // //             pageBreak: 'avoid',
// // //             showHead: 'firstPage',
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (d) => {
// // //               if (d.section === "body" && d.column.dataKey === "info") {
// // //                 if (d.row.index > 0) {
// // //                   d.cell.text = [];
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // //           const rows = flatData.map((r) =>
// // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // //           );
// // //           const csv = [headers.join(","), ...rows].join("\n");
// // //           blob = new Blob([csv], { type: "text/csv" });
// // //         }
// // //         break;
// // //       }
// // //       case "json": {
// // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // //           type: "application/json",
// // //         });
// // //         break;
// // //       }
// // //       case "txt": {
// // //         const texts = flatData.map((r) =>
// // //           Object.entries(r)
// // //             .map(([k, v]) => `${k}: ${v}`)
// // //             .join("\n")
// // //         );
// // //         const text = texts.join("\n\n");
// // //         blob = new Blob([text], { type: "text/plain" });
// // //         filename = "export.txt";
// // //         break;
// // //       }
// // //       default:
// // //         throw new Error(`Unsupported format: ${format}`);
// // //     }

// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = filename;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center gap-2">
// // //       <button
// // //         onClick={handleExport}
// // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // //         title={`Export as ${format.toUpperCase()}`}>
// // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // //       </button>
// // //       <select
// // //         value={format}
// // //         onChange={(e) => setFormat(e.target.value as Format)}
// // //         className="px-1 py-0.5 border rounded bg-white"
// // //       >
// // //         {FORMATS.map((f) => (
// // //           <option key={f} value={f}>
// // //             {f.toUpperCase()}
// // //           </option>
// // //         ))}
// // //       </select>
// // //     </div>
// // //   );
// // // }
// // // "use client";
// // // import React, { useState } from "react";
// // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // import { jsPDF } from "jspdf";
// // // import autoTable from "jspdf-autotable";
// // // import { utils, write } from "xlsx";

// // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // type Format = typeof FORMATS[number];

// // // interface ExportButtonProps {
// // //   data: Record<string, any>[];
// // // }

// // // export function ExportButton({ data }: ExportButtonProps) {
// // //   const [format, setFormat] = useState<Format>("csv");

// // //   const handleExport = async () => {
// // //     let blob: Blob;
// // //     let filename = `export.${format}`;

// // //     // Prepare flatData: nested objects get combined key plus subcolumns, handle Lexical arrays
// // //     const flatData = data.map((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         // Handle Lexical children arrays by flattening text
// // //         if (Array.isArray(value) && value.every((v) => v && typeof v === 'object' && 'text' in v)) {
// // //           newRow[key] = value.map((v: any) => v.text).join('');
// // //           return;
// // //         }
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     }); ((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });

// // //     switch (format) {
// // //       case "xlsx": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// // //         } else {
// // //           const ws = utils.json_to_sheet(flatData);
// // //           const wb = utils.book_new();
// // //           utils.book_append_sheet(wb, ws, "Sheet1");
// // //           // Merge 'info' column across rows if present
// // //           const headers = Object.keys(flatData[0]);
// // //           const infoIndex = headers.indexOf("info");
// // //           if (infoIndex >= 0) {
// // //             const merges = [
// // //               {
// // //                 s: { r: 1, c: infoIndex },
// // //                 e: { r: flatData.length, c: infoIndex },
// // //               },
// // //             ];
// // //             ws["!merges"] = merges;
// // //             // Clear subsequent 'info' cells to simulate merge
// // //             for (let i = 2; i <= flatData.length; i++) {
// // //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// // //               ws[cellAddress] = { t: 's', v: '' };
// // //             }
// // //           }
// // //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         // If data rows have 'content', render as flowing text document
// // //         if (data[0]?.content && typeof data[0].content === "string") {
// // //           let y = 10;
// // //           data.forEach((row) => {
// // //             const lines = doc.splitTextToSize(row.content, 180);
// // //             doc.text(lines, 10, y);
// // //             y += lines.length * 8 + 10;
// // //             if (y > 280) {
// // //               doc.addPage();
// // //               y = 10;
// // //             }
// // //           });
// // //         } else if (flatData.length) {
// // //           // Table layout for non-lexical data
// // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key === 'info' ? '' : key, dataKey: key }));
// // //           autoTable(doc, {
// // //             startY: 10,
// // //             pageBreak: 'avoid',
// // //             showHead: 'firstPage',
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (d) => {
// // //               if (d.section === "body" && d.column.dataKey === "info") {
// // //                 if (d.row.index > 0) {
// // //                   d.cell.text = [];
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // //           const rows = flatData.map((r) =>
// // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // //           );
// // //           const csv = [headers.join(","), ...rows].join("\n");
// // //           blob = new Blob([csv], { type: "text/csv" });
// // //         }
// // //         break;
// // //       }
// // //       case "json": {
// // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // //           type: "application/json",
// // //         });
// // //         break;
// // //       }
// // //       case "txt": {
// // //         const texts = flatData.map((r) =>
// // //           Object.entries(r)
// // //             .map(([k, v]) => `${k}: ${v}`)
// // //             .join("\n")
// // //         );
// // //         const text = texts.join("\n\n");
// // //         blob = new Blob([text], { type: "text/plain" });
// // //         filename = "export.txt";
// // //         break;
// // //       }
// // //       default:
// // //         throw new Error(`Unsupported format: ${format}`);
// // //     }

// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = filename;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center gap-2">
// // //       <button
// // //         onClick={handleExport}
// // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // //         title={`Export as ${format.toUpperCase()}`}>
// // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // //       </button>
// // //       <select
// // //         value={format}
// // //         onChange={(e) => setFormat(e.target.value as Format)}
// // //         className="px-1 py-0.5 border rounded bg-white"
// // //       >
// // //         {FORMATS.map((f) => (
// // //           <option key={f} value={f}>
// // //             {f.toUpperCase()}
// // //           </option>
// // //         ))}
// // //       </select>
// // //     </div>
// // // //   );
// // // // }
// // // "use client";
// // // import React, { useState } from "react";
// // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // import { jsPDF } from "jspdf";
// // // import autoTable from "jspdf-autotable";
// // // import { utils, write } from "xlsx";

// // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // type Format = typeof FORMATS[number];

// // // interface ExportButtonProps {
// // //   data: Record<string, any>[];
// // // }

// // // export function ExportButton({ data }: ExportButtonProps) {
// // //   const [format, setFormat] = useState<Format>("csv");

// // //   const handleExport = async () => {
// // //     let blob: Blob;
// // //     let filename = `export.${format}`;

// // //     // Prepare flatData: nested objects get combined key plus subcolumns, handle Lexical arrays
// // //     const flatData = data.map((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         // Handle Lexical children arrays by flattening text
// // //         if (Array.isArray(value) && value.every((v) => v && typeof v === 'object' && 'text' in v)) {
// // //           newRow[key] = value.map((v: any) => v.text).join('');
// // //           return;
// // //         }
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });

// // //     switch (format) {
// // //       case "xlsx": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// // //         } else {
// // //           const ws = utils.json_to_sheet(flatData);
// // //           const wb = utils.book_new();
// // //           utils.book_append_sheet(wb, ws, "Sheet1");
// // //           // Merge 'info' column across rows if present
// // //           const headers = Object.keys(flatData[0]);
// // //           const infoIndex = headers.indexOf("info");
// // //           if (infoIndex >= 0) {
// // //             const merges = [
// // //               {
// // //                 s: { r: 1, c: infoIndex },
// // //                 e: { r: flatData.length, c: infoIndex },
// // //               },
// // //             ];
// // //             ws["!merges"] = merges;
// // //             // Clear subsequent 'info' cells to simulate merge
// // //             for (let i = 2; i <= flatData.length; i++) {
// // //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// // //               ws[cellAddress] = { t: 's', v: '' };
// // //             }
// // //           }
// // //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         // If data rows have 'content', render as flowing text document
// // //         if (data[0]?.content && typeof data[0].content === "string") {
// // //           let y = 10;
// // //           data.forEach((row) => {
// // //             const lines = doc.splitTextToSize(row.content, 180);
// // //             doc.text(lines, 10, y);
// // //             y += lines.length * 8 + 10;
// // //             if (y > 280) {
// // //               doc.addPage();
// // //               y = 10;
// // //             }
// // //           });
// // //         } else if (flatData.length) {
// // //           // Table layout for non-lexical data
// // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key === 'info' ? '' : key, dataKey: key }));
// // //           autoTable(doc, {
// // //             startY: 10,
// // //             pageBreak: 'avoid',
// // //             showHead: 'firstPage',
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (d) => {
// // //               if (d.section === "body" && d.column.dataKey === "info") {
// // //                 if (d.row.index > 0) {
// // //                   d.cell.text = [];
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // // //           const rows = flatData.map((r) =>
// // // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // // //           );
// // // //           const csv = [headers.join(","), ...rows].join("\n");
// // // //           blob = new Blob([csv], { type: "text/csv" });
// // // //         }
// // // //         break;
// // // //       }
// // // //       case "json": {
// // // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // // //           type: "application/json",
// // // //         });
// // // //         break;
// // // //       }
// // // //       case "txt": {
// // // //         const texts = flatData.map((r) =>
// // // //           Object.entries(r)
// // // //             .map(([k, v]) => `${k}: ${v}`)
// // // //             .join("\n")
// // // //         );
// // // //         const text = texts.join("\n\n");
// // // //         blob = new Blob([text], { type: "text/plain" });
// // // //         filename = "export.txt";
// // // //         break;
// // // //       }
// // // //       default:
// // // //         throw new Error(`Unsupported format: ${format}`);
// // // //     }

// // // //     const url = URL.createObjectURL(blob);
// // // //     const a = document.createElement("a");
// // // //     a.href = url;
// // // //     a.download = filename;
// // // //     a.click();
// // // //     URL.revokeObjectURL(url);
// // // //   };

// // // //   return (
// // // //     <div className="inline-flex items-center gap-2">
// // // //       <button
// // // //         onClick={handleExport}
// // // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // // //         title={`Export as ${format.toUpperCase()}`}>
// // // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // // //       </button>
// // // //       <select
// // // //         value={format}
// // // //         onChange={(e) => setFormat(e.target.value as Format)}
// // // //         className="px-1 py-0.5 border rounded bg-white"
// // // //       >
// // // //         {FORMATS.map((f) => (
// // // //           <option key={f} value={f}>
// // // //             {f.toUpperCase()}
// // // //           </option>
// // // //         ))}
// // // //       </select>
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";
// // // import React, { useState } from "react";
// // // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // // import { jsPDF } from "jspdf";
// // // import autoTable from "jspdf-autotable";
// // // import { utils, write } from "xlsx";

// // // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // // type Format = typeof FORMATS[number];

// // // interface ExportButtonProps {
// // //   data: Record<string, any>[];
// // // }

// // // export function ExportButton({ data }: ExportButtonProps) {
// // //   const [format, setFormat] = useState<Format>("csv");

// // //   const handleExport = async () => {
// // //     let blob: Blob;
// // //     let filename = `export.${format}`;

// // //     // Prepare flatData: nested objects get combined key plus subcolumns, handle Lexical arrays
// // //     const flatData = data.map((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         // Handle Lexical children arrays by flattening text
// // //         if (Array.isArray(value) && value.every((v) => v && typeof v === 'object' && 'text' in v)) {
// // //           newRow[key] = value.map((v: any) => v.text).join('');
// // //           return;
// // //         }
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });((row) => {
// // //       const newRow: Record<string, any> = {};
// // //       Object.entries(row).forEach(([key, value]) => {
// // //         if (value !== null && typeof value === "object" && !Array.isArray(value)) {
// // //           // Combined column shows the field name
// // //           newRow[key] = key;
// // //           // Sub-columns
// // //           Object.entries(value as Record<string, any>).forEach(([subKey, subVal]) => {
// // //             newRow[subKey] = subVal;
// // //           });
// // //         } else {
// // //           newRow[key] = value;
// // //         }
// // //       });
// // //       return newRow;
// // //     });

// // //     switch (format) {
// // //       case "xlsx": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// // //         } else {
// // //           const ws = utils.json_to_sheet(flatData);
// // //           const wb = utils.book_new();
// // //           utils.book_append_sheet(wb, ws, "Sheet1");
// // //           // Merge 'info' column across rows if present
// // //           const headers = Object.keys(flatData[0]);
// // //           const infoIndex = headers.indexOf("info");
// // //           if (infoIndex >= 0) {
// // //             const merges = [
// // //               {
// // //                 s: { r: 1, c: infoIndex },
// // //                 e: { r: flatData.length, c: infoIndex },
// // //               },
// // //             ];
// // //             ws["!merges"] = merges;
// // //             // Clear subsequent 'info' cells to simulate merge
// // //             for (let i = 2; i <= flatData.length; i++) {
// // //               const cellAddress = utils.encode_cell({ r: i, c: infoIndex });
// // //               ws[cellAddress] = { t: 's', v: '' };
// // //             }
// // //           }
// // //           const arrayBuffer = write(wb, { bookType: "xlsx", type: "array" });
// // //           blob = new Blob([arrayBuffer], {
// // //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //           });
// // //         }
// // //         break;
// // //       }
// // //       case "pdf": {
// // //         const doc = new jsPDF();
// // //         // If data rows have 'content', render as flowing text document
// // //         if (data[0]?.content && typeof data[0].content === "string") {
// // //           let y = 10;
// // //           data.forEach((row) => {
// // //             const lines = doc.splitTextToSize(row.content, 180);
// // //             doc.text(lines, 10, y);
// // //             y += lines.length * 8 + 10;
// // //             if (y > 280) {
// // //               doc.addPage();
// // //               y = 10;
// // //             }
// // //           });
// // //         } else if (flatData.length) {
// // //           // Table layout for non-lexical data
// // //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key === 'info' ? '' : key, dataKey: key }));
// // //           autoTable(doc, {
// // //             startY: 10,
// // //             pageBreak: 'avoid',
// // //             showHead: 'firstPage',
// // //             columns,
// // //             body: flatData,
// // //             styles: { fontSize: 8 },
// // //             headStyles: { fillColor: [41, 128, 185] },
// // //             didParseCell: (d) => {
// // //               if (d.section === "body" && d.column.dataKey === "info") {
// // //                 if (d.row.index > 0) {
// // //                   d.cell.text = [];
// // //                 }
// // //               }
// // //             },
// // //           });
// // //         }
// // //         blob = doc.output("blob");
// // //         filename = "export.pdf";
// // //         break;
// // //       }
// // //       case "csv": {
// // //         if (!flatData.length) {
// // //           blob = new Blob([""], { type: "text/csv" });
// // //         } else {
// // //           const headers = Object.keys(flatData[0]);
// // //           const rows = flatData.map((r) =>
// // //             headers.map((h) => String(r[h] ?? "")).join(",")
// // //           );
// // //           const csv = [headers.join(","), ...rows].join("\n");
// // //           blob = new Blob([csv], { type: "text/csv" });
// // //         }
// // //         break;
// // //       }
// // //       case "json": {
// // //         blob = new Blob([JSON.stringify(data, null, 2)], {
// // //           type: "application/json",
// // //         });
// // //         break;
// // //       }
// // //       case "txt": {
// // //         const texts = flatData.map((r) =>
// // //           Object.entries(r)
// // //             .map(([k, v]) => `${k}: ${v}`)
// // //             .join("\n")
// // //         );
// // //         const text = texts.join("\n\n");
// // //         blob = new Blob([text], { type: "text/plain" });
// // //         filename = "export.txt";
// // //         break;
// // //       }
// // //       default:
// // //         throw new Error(`Unsupported format: ${format}`);
// // //     }

// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = filename;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center gap-2">
// // //       <button
// // //         onClick={handleExport}
// // //         className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// // //         title={`Export as ${format.toUpperCase()}`}>
// // //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// // //       </button>
// // //       <select
// // //         value={format}
// // //         onChange={(e) => setFormat(e.target.value as Format)}
// // //         className="px-1 py-0.5 border rounded bg-white"
// // //       >
// // //         {FORMATS.map((f) => (
// // //           <option key={f} value={f}>
// // //             {f.toUpperCase()}
// // //           </option>
// // //         ))}
// // //       </select>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import React, { useState } from "react";
// // import { DownloadIcon, ChevronDownIcon } from "lucide-react";
// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";
// // import { utils, write } from "xlsx";

// // const FORMATS = ["csv", "json", "xlsx", "pdf", "txt"] as const;
// // type Format = typeof FORMATS[number];

// // interface ExportButtonProps {
// //   data: Record<string, any>[];
// // }

// // function flattenRow(row: Record<string, any>) {
// //   const newRow: Record<string, any> = {};
// //   Object.entries(row).forEach(([key, value]) => {
// //     // Lexical content: array of text nodes
// //     if (Array.isArray(value) && value.every((v) => v && typeof v === "object" && "text" in v)) {
// //       newRow[key] = value.map((v: any) => v.text).join("");
// //       return;
// //     }
// //     // Nested object: add combined and sub-columns
// //     if (value && typeof value === "object" && !Array.isArray(value)) {
// //       newRow[key] = key;
// //       Object.entries(value).forEach(([subKey, subVal]) => {
// //         newRow[subKey] = subVal;
// //       });
// //     } else {
// //       newRow[key] = value;
// //     }
// //   });
// //   return newRow;
// // }

// // export function ExportButton({ data }: ExportButtonProps) {
// //   const [format, setFormat] = useState<Format>("csv");

// //   const handleExport = async () => {
// //     let blob: Blob;
// //     let filename = `export.${format}`;
// //     const flatData = data.map(flattenRow);

// //     switch (format) {
// //       case "csv": {
// //         const headers = flatData.length ? Object.keys(flatData[0]) : [];
// //         const rows = flatData.map((r) => headers.map((h) => r[h] ?? "").join(","));
// //         const csv = [headers.join(","), ...rows].join("\n");
// //         blob = new Blob([csv], { type: "text/csv" });
// //         break;
// //       }
// //       case "json": {
// //         blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
// //         break;
// //       }
// //       case "xlsx": {
// //         const ws = utils.json_to_sheet(flatData);
// //         const wb = utils.book_new();
// //         utils.book_append_sheet(wb, ws, "Sheet1");
// //         const buffer = write(wb, { bookType: "xlsx", type: "array" });
// //         blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// //         break;
// //       }
// //       case "pdf": {
// //         const doc = new jsPDF();
// //         if (data[0]?.content && typeof data[0].content === "string") {
// //           let y = 10;
// //           data.forEach((row) => {
// //             const text = String((row as any).content);
// //             const lines = doc.splitTextToSize(text, 180);
// //             doc.text(lines, 10, y);
// //             y += lines.length * 8 + 10;
// //             if (y > 280) { doc.addPage(); y = 10; }
// //           });
// //         } else if (flatData.length) {
// //           const columns = Object.keys(flatData[0]).map((key) => ({ header: key === 'info' ? '' : key, dataKey: key }));
// //           autoTable(doc, {
// //             startY: 10,
// //             pageBreak: 'avoid',
// //             showHead: 'firstPage',
// //             columns,
// //             body: flatData,
// //             styles: { fontSize: 8 },
// //             headStyles: { fillColor: [41, 128, 185] },
// //             didParseCell: (d) => {
// //               if (d.section === 'body' && d.column.dataKey === 'info' && d.row.index > 0) {
// //                 d.cell.text = [];
// //               }
// //             },
// //           });
// //         }
// //         blob = doc.output("blob");
// //         filename = "export.pdf";
// //         break;
// //       }
// //       case "txt": {
// //         const texts = data.map((row) => {
// //           if ((row as any).content) return String((row as any).content);
// //           return JSON.stringify(row, null, 2);
// //         });
// //         blob = new Blob([texts.join("\n\n")], { type: "text/plain" });
// //         filename = "export.txt";
// //         break;
// //       }
// //       default:
// //         throw new Error(`Unsupported format: ${format}`);
// //     }

// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = filename;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   return (
// //     <div className="inline-flex items-center gap-2">
// //       <button onClick={handleExport} className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted" title={`Export as ${format.toUpperCase()}`}>
// //         <DownloadIcon className="w-4 h-4" /> Export <ChevronDownIcon className="w-3 h-3" />
// //       </button>
// //       <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="px-1 py-0.5 border rounded bg-white">
// //         {FORMATS.map((f) => <option key={f} value={f}>{f.toUpperCase()}</option>)}
// //       </select>
// //     </div>
// //   );
// // }
// // "use client"

// // import React, { useState } from 'react';
// // import { DownloadIcon, Loader } from 'lucide-react';
// // import { FormatSelect } from './FormatSelect';
// // import {
// //   exportCsv,
// //   exportJson,
// //   exportXlsx,
// //   exportPdf,
// //   exportTxt,
// //   Format,
// // } from './exportUtils';
// // import { getProcessedData } from './dataUtils';
// // import { showToast } from '@/lib/toast';
// // import { IconButton } from '@/components/atoms';

// // export interface ExportButtonProps {
// //   data: Record<string, any>[];
// //   exportAs?: 'table' | 'document';
// //   dataType?: 'default' | 'nested' | 'flattened' | 'lexical';
// //   exportFormats?: Format[] | undefined;
// //   mergeNested?: boolean;
// // }


// // export function ExportButton({ data, mergeNested = false, exportAs = "table", dataType = "default", exportFormats }: ExportButtonProps) {
// //   const [format, setFormat] = useState<Format>(exportFormats ? exportFormats[0] : "csv");
// //   const [loading, setLoading] = useState(false);

// //   const handleExport = async () => {
// //     setLoading(true);
// //     const rows = getProcessedData(data, dataType)

// //     try {
// //       await new Promise(r => setTimeout(r, 3000));
// //       if (exportAs === "document") {
// //         if (format === "pdf") exportPdf(rows)
// //         else exportTxt(rows)
// //       } else {
// //         switch (format) {
// //           case 'csv': exportCsv(rows, mergeNested); break;
// //           case 'json': exportJson(rows); break;
// //           case 'xlsx': exportXlsx(rows, mergeNested); break;
// //           case 'pdf': exportPdf(rows); break;
// //           case 'txt': exportTxt(rows); break;
// //         }
// //       }
// //       showToast.success(`Export complete`)
// //     } catch (err) {
// //       showToast.error(`Export failed: ${err}`)
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="inline-flex items-center gap-2">
// //       {exportFormats?.length === 1 ? (
// //         <IconButton
// //           disabled={loading}
// //           icon={loading ? "loader2" : "export"}
// //           onClick={handleExport}
// //           tooltip={`Export as ${format}`}
// //         />
// //       ) : (
// //         <>
// //           <button
// //             onClick={handleExport}
// //             disabled={loading}
// //             className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-background hover:bg-muted"
// //             title={`Export as ${format.toUpperCase()}`}
// //           >
// //             {loading ? <Loader className="animate-spin" /> : <DownloadIcon className="w-4 h-4" />}{loading ? "Preparing..." : "Export"}
// //           </button>
// //           <FormatSelect value={format} onChange={setFormat} formats={exportFormats} />
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import { DownloadIcon, Loader } from 'lucide-react';
// import { FormatPicker } from './FormatPicker';
// import {
//   exportCsv,
//   exportJson,
//   exportXlsx,
//   exportPdf,
//   exportTxt,
//   Format,
// } from './exportUtils';
// import { getProcessedData } from './dataUtils';
// import { showToast } from '@/lib/toast';
// import { Button, IconButton } from '@/components/atoms';
// import { DynamicForm } from '@/components/forms/components';
// import { z } from 'zod';
// import { FieldDefinitionMap } from '@/types/form';
// import { useModalStore } from '@/stores';
// import { ModalRenderer } from '@/components/modals';

// export interface ExportButtonProps {
//   data: Record<string, any>[];
//   exportAs?: 'table' | 'document';
//   dataType?: 'default' | 'nested' | 'flattened' | 'lexical';
//   exportFormats?: Format[];
//   mergeNested?: boolean;
// }

// const fileSchema = z.object({
//   fileName: z.string().min(1, "File name is required").default(""),
// })

// type FileFormValues = z.infer<typeof fileSchema>;

// export function ExportButton({
//   data,
//   exportAs = 'table',
//   dataType = 'default',
//   exportFormats,
//   mergeNested = false,

// }: ExportButtonProps) {
//   const openModal = useModalStore(s => s.openModal)
//   const closeModal = useModalStore(s => s.closeModal)
//   const exportRef = useRef<HTMLButtonElement | null>(null)
//   const formats = exportFormats ?? ['csv', 'json', 'xlsx', 'pdf', 'txt'] as Format[];
//   const [format, setFormat] = useState<Format>(formats[0]);
//   const [loading, setLoading] = useState(false);

//   const onCancel = () => {
//     closeModal()
//   };

//   const onConfirm = (fileData: FileFormValues) => {
//     console.log("data", fileData)
//     const name = fileData.fileName.trim()
//     doExport(name);
//     closeModal()
//   };

//   // const onStartExport = () => {
//   //   openModal("confirm", {
//   //     title: `Export as ${format}`,
//   //     renderChildren: (props) => (
//   //       <DynamicForm
//   //         schema={fileSchema}
//   //         fieldMap={fileFieldMap}
//   //         onSubmit={onConfirm}
//   //         onCancel={onCancel}
//   //         submitLabel={`Download ${format}`}
//   //         {...props}
//   //       />
//   //     ),
//   //   }, "global", "tab-data")

//   // };
//   //   openModal("confirm", {
//   //     title: `Export as ${format}`,
//   //     schema: fileSchema,
//   //     fieldMap: fileFieldMap,
//   //     defaultValues: { fileName: "" },
//   //     confirmText: `Download ${format}`,
//   //     cancelText: "Cancel",
//   //     onConfirm: (fileData) => {
//   //       doExport(fileData.fileName.trim());
//   //     },
//   //     onCancel: () => {
//   //       closeModal();
//   //     },
//   //   }, "global", "export-confirm");
//   // };
//   const onStartExport = () => {
//     openModal("confirm", {
//       title: `Export as ${format}`,
//       schema: fileSchema,
//       fieldMap: fileFieldMap,
//       defaultValues: { fileName: "" },
//       confirmText: `Download ${format}`,
//       cancelText: "Cancel",
//       onConfirm: (fileData) => {
//         doExport(fileData.fileName.trim());
//       },
//       onCancel: () => {
//         closeModal();
//       },
//     }, "global", "export-confirm");
//   }



//   const doExport = (name: string) => {
//     setLoading(true);
//     const rows = getProcessedData(data, dataType);
//     try {
//       setTimeout(() => {
//         if (exportAs === 'document') {
//           if (format === "pdf") exportPdf(rows, name)
//           else exportTxt(rows, name)
//         } else {
//           switch (format) {
//             case 'csv': exportCsv(rows, mergeNested, name); break;
//             case 'json': exportJson(rows, name); break;
//             case 'xlsx': exportXlsx(rows, mergeNested, name); break;
//             case 'pdf': exportPdf(rows, name); break;
//             case 'txt': exportTxt(rows, name); break;
//           }
//         }
//         showToast.success('Export complete');
//       }, 0);
//     } catch (err: any) {
//       console.error('Export error:', err);
//       showToast.error(`Export failed: ${err.message || err}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ariaLabel = `Export as ${format.toUpperCase()}`;

//   const fileFieldMap: FieldDefinitionMap = {
//     fileName: {
//       name: "fileName",
//       label: "File Name",
//       type: "text",
//       meta: { required: true }
//     }
//   }

//   useEffect(() => {
//     if (!loading && exportRef.current) {
//       exportRef.current.focus();
//     }
//   }, [loading]); // Or trigger this when the modal closes


//   return (
//     <>
//       <div className="inline-flex items-center gap-2">
//         {formats.length === 1 ? (
//           <IconButton
//             ref={exportRef}
//             onClick={onStartExport}
//             disabled={loading}
//             icon={loading ? 'loader2' : 'export'}
//             aria-label={ariaLabel}
//             tooltip={ariaLabel}
//             aria-busy={loading}
//             variant="primary"
//           />
//         ) : (
//           <>
//             <Button
//               ref={exportRef}
//               onClick={onStartExport}
//               disabled={loading}
//               aria-label={ariaLabel}
//               aria-busy={loading}
//               className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-(--foreground) text-(--background) hover:bg-muted disabled:opacity-50"
//               title={ariaLabel}
//               variant="outline"
//             >
//               {loading
//                 ? <Loader className="animate-spin w-4 h-4" />
//                 : <DownloadIcon className="w-4 h-4" />}
//               <span>{loading ? `Preparin ${format.toUpperCase()}...` : `Export ${format.toUpperCase()}`}</span>
//             </Button>
//             <FormatPicker
//               value={format}
//               onChange={setFormat}
//               formats={formats}
//               disabled={loading}
//             />
//           </>
//         )}
//       </div>
//       <ModalRenderer scope="global" instanceId="export-confirm" fieldMap={fileFieldMap} schema={fileSchema} />
//     </>
//   );
// }


