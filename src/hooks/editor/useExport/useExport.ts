"use client";

import { useRef, useState, useEffect } from "react";
import { useModalStore } from "@/stores/ui/modalStore";
import { Format } from "@/types/export";
import {
  exportCsv,
  exportJson,
  exportXlsx,
  exportPdf,
  exportTxt,
} from "@/utils/export-utils/export-utils";
import { getProcessedData } from "@/utils/data-utils";
import { showToast } from "@/lib/toast";

interface UseExportParams {
  data: Record<string, unknown>[];
  /** 'table' allows all formats; 'document' only pdf/txt */
  exportAs?: "table" | "document";
  dataType?: "default" | "nested" | "flattened" | "lexical";
  mergeNested?: boolean;
  exportFormats?: Format[];
}

export function useExport({
  data,
  exportAs = "table",
  dataType = "default",
  mergeNested = false,
  exportFormats,
}: UseExportParams) {
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  // All formats, or user-provided list
  const allFormats: Format[] = exportFormats ?? ["csv", "json", "xlsx", "pdf", "txt"];

  // If in document mode, restrict to pdf/txt only
  const availableFormats: Format[] =
    exportAs === "document" ? allFormats.filter((f) => f === "pdf" || f === "txt") : allFormats;

  // Current selection
  const [format, setFormat] = useState<Format>(availableFormats[0]);

  // Loading state
  const [loading, setLoading] = useState(false);
  // Ref for focus management
  const triggerRef = useRef<HTMLButtonElement>(null);

  // If exportAs or exportFormats change, ensure `format` is valid
  useEffect(() => {
    if (!availableFormats.includes(format)) {
      setFormat(availableFormats[0]);
    }
  }, [availableFormats, exportAs, format]);

  // Called when the filename form is submitted
  const onSubmit = (values: { fileName: string }) => {
    const fileName = values.fileName.trim() || "export";
    doExport(fileName);
    closeModal();
  };

  const onStartExport = () => {
    openModal("confirm", "global", "export-confirm", {
      title: `Export as ${format.toUpperCase()}`,
      defaultValues: { fileName: "" },
      submitText: `Download ${format.toUpperCase()}`,
      cancelText: "Cancel",
      onSubmit,
      onCancel: () => closeModal(),
    });
  };

  // Does the actual export work
  const doExport = (fileName: string) => {
    setLoading(true);
    const rows = getProcessedData(data, dataType, mergeNested);

    setTimeout(() => {
      try {
        if (exportAs === "document") {
          if (format === "pdf") exportPdf(rows, fileName);
          else exportTxt(rows, fileName);
        } else {
          // Table mode: all formats
          switch (format) {
            case "csv":
              exportCsv(rows, mergeNested, fileName);
              break;
            case "json":
              exportJson(data, fileName);
              break;
            case "xlsx":
              exportXlsx(rows, fileName);
              break;
            case "pdf":
              exportPdf(rows, fileName);
              break;
            case "txt":
              exportTxt(rows, fileName);
              break;
          }
        }
        showToast.success("Export complete");
      } catch (err) {
        console.error("Export error:", err);
        const message = err instanceof Error ? err.message : String(err);
        showToast.error(`Export failed: ${message}`);
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  // Return focus to the trigger button when loading finishes
  useEffect(() => {
    if (!loading && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [loading]);

  return {
    format,
    setFormat,
    loading,
    formats: availableFormats,
    triggerRef,
    onStartExport,
  };
}
