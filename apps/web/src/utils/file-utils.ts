/**
 * Lowercases, trims, replaces spaces with hyphens,
 * and strips any characters not allowed in filenames.
 *
 * E.g. "My Report 2025" → "my-report-2025"
 */
export function sanitizeFileName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      // Replace spaces and consecutive hyphens with a single hyphen
      .replace(/\s+/g, "-")
      // Remove any character that isn't alphanumeric, hyphen, underscore, or dot
      .replace(/[^a-z0-9\-_.]/g, "")
      // Collapse multiple hyphens
      .replace(/-+/g, "-")
  );
}
