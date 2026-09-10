import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally joins CSS class names together and resolves Tailwind CSS class conflicts.
 * Combines `clsx` for flexible conditional syntax and `tailwind-merge` for deduplication.
 *
 * @param inputs - Variadic list of class names, conditionals, arrays, or class dictionary objects.
 * @returns A single string of deduplicated and merged class names.
 *
 * @example
 * ```ts
 * cn("px-2 py-1", isPrimary && "bg-blue-500", "px-4"); // => "py-1 bg-blue-500 px-4"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to a specified maximum length, appending an ellipsis (`...`) if truncated.
 * If the string length is less than or equal to `length`, it is returned unchanged.
 *
 * @param text - The string to truncate.
 * @param length - The maximum number of characters before truncating.
 * @returns The truncated string with ellipsis, or the original string if short enough.
 *
 * @example
 * ```ts
 * truncate("Hello, world!", 5); // => "Hello..."
 * truncate("Ghost", 10);        // => "Ghost"
 * ```
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/**
 * Truncates an identifier string (such as an ID or hash) from the beginning with a trailing ellipsis.
 * Defaults to 8 characters.
 *
 * @param id - The identifier string to truncate.
 * @param length - Maximum visible characters before the ellipsis (default: 8).
 * @returns The truncated identifier string.
 *
 * @example
 * ```ts
 * truncateId("usr_98f482e9b01c"); // => "usr_98f4..."
 * truncateId("short", 8);         // => "short"
 * ```
 */
export function truncateId(id: string, length: number = 8): string {
  return truncate(id, length);
}

/**
 * Formats a long identifier or hash by showing the first 4 and last 4 characters separated by an ellipsis.
 * Useful for addresses, transaction hashes, and UUIDs. If the ID length is 12 characters or fewer,
 * it is returned unchanged.
 *
 * @param id - The identifier to format.
 * @returns The formatted string with middle truncation (e.g. `0x12...abcd`), or original if <= 12 chars.
 *
 * @example
 * ```ts
 * formatId("0x1234567890abcdef1234"); // => "0x12...1234"
 * formatId("short-id");               // => "short-id"
 * ```
 */
export function formatId(id: string): string {
  if (id.length <= 12) return id;
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}

/**
 * Formats a numeric value into a human-readable metric string with compact suffixes ("M+", "K+").
 * Values >= 1,000,000 are formatted as millions (e.g. "1.5 M+").
 * Values >= 1,000 are formatted as thousands (e.g. "12.4 K+").
 * Values < 1,000 are formatted using locale string separators.
 *
 * @param val - The numeric value to format.
 * @returns The human-readable formatted string.
 *
 * @example
 * ```ts
 * formatValue(2500000); // => "2.5 M+"
 * formatValue(12400);   // => "12.4 K+"
 * formatValue(450);     // => "450"
 * ```
 */
export const formatValue = (val: number): string => {
  if (val >= 1000000) {
    const millions = val / 1000000;
    return `${parseFloat(millions.toFixed(2))} M+`;
  }
  if (val >= 1000) {
    const thousands = val / 1000;
    return `${parseFloat(thousands.toFixed(1))} K+`;
  }
  return `${val.toLocaleString()}`;
};

/**
 * Converts a key-value dictionary into a `URLSearchParams` instance.
 * Automatically skips keys whose values are `undefined`, while preserving non-undefined values (including empty strings, null, and 0).
 *
 * @param params - Plain object containing query parameters.
 * @returns A `URLSearchParams` instance populated with stringified entries.
 *
 * @example
 * ```ts
 * const query = toSearchParams({ page: 1, limit: 10, search: undefined });
 * query.toString(); // => "page=1&limit=10"
 * ```
 */
export function toSearchParams(
  params: Record<string, unknown>,
): URLSearchParams {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  }
  return query;
}

/**
 * Formats a number with comma separators using standard US locale formatting (`en-US`).
 *
 * @param value - The numeric value to format.
 * @returns The formatted number string (e.g., `"1,234,567"`).
 *
 * @example
 * ```ts
 * formatNumber(1234567.89); // => "1,234,567.89"
 * ```
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
