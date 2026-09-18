/**
 * Converts a string to its ASCII hex codes, space-separated, uppercase.
 * Used for the left side margin, a small visual pun: the plain name on
 * the right margin, its "source code" on the left.
 */
export function toHexAscii(source: string): string {
  return [...source]
    .map((ch) => ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}