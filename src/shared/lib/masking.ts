/**
 * Masks an email address for privacy by partially obscuring the username and domain name with asterisks.
 *
 * - The local username part keeps up to 3 leading characters (or 1 character if short) followed by `***`.
 * - The primary domain label is completely replaced with asterisks of identical length, preserving the TLD extension.
 * - If the input is empty, returns `""`. If the email is malformed (no `@` or missing domain), returns the original input.
 *
 * @param email - The email address to mask.
 * @returns The masked email string.
 *
 * @example
 * ```ts
 * maskEmail("alice@example.com"); // => "ali***@*******.com"
 * maskEmail("bob@mail.co.uk");     // => "bob***@****.co.uk"
 * maskEmail("al@domain.com");      // => "a***@******.com"
 * ```
 */
export const maskEmail = (email: string): string => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  const nameMask =
    name.length > 3 ? `${name.slice(0, 3)}***` : `${name.slice(0, 1)}***`;

  const domainParts = domain.split(".");
  const mainDomain = domainParts[0];
  const tld = domainParts.slice(1).join(".");

  const domainMask = "*".repeat(mainDomain.length);

  return `${nameMask}@${domainMask}.${tld}`;
};

/**
 * Masks a string by replacing middle characters with asterisks while keeping a specified number
 * of characters visible at the beginning and end.
 *
 * If the string's length is less than or equal to `keepStart + keepEnd`, the original string is returned unaltered.
 *
 * @param str - The source string to mask.
 * @param keepStart - Number of characters to preserve at the beginning (default: 0).
 * @param keepEnd - Number of characters to preserve at the end (default: 0).
 * @returns The masked string with middle asterisks, or original string if too short.
 *
 * @example
 * ```ts
 * maskString("1234567890", 2, 2); // => "12******90"
 * maskString("secret", 1, 1);     // => "s****t"
 * maskString("abc", 2, 2);        // => "abc" (length <= keepStart + keepEnd)
 * ```
 */
export const maskString = (str: string, keepStart = 0, keepEnd = 0): string => {
  if (!str) return "";
  if (str.length <= keepStart + keepEnd) return str;

  const start = str.slice(0, keepStart);
  const end = str.slice(str.length - keepEnd);
  const middle = "*".repeat(Math.max(0, str.length - keepStart - keepEnd));

  return `${start}${middle}${end}`;
};

/**
 * Formats and masks a sensitive identifier, API key, or hash for UI display using stylized bullet dividers.
 *
 * When `visible` is false, displays the first 4 characters and last 4 characters separated by
 * bullet dots (`•• · •••••••• · ••`). If `visible` is true, or if the identifier has fewer than 10 characters,
 * the identifier is displayed in plain text without masking.
 *
 * @param id - The identifier to format and mask (or undefined).
 * @param visible - Whether the unmasked identifier should be shown.
 * @returns The masked or original identifier string.
 *
 * @example
 * ```ts
 * formatMaskedIdentifier("usr_1234567890abcdef", false); // => "usr_•• · •••••••• · ••cdef"
 * formatMaskedIdentifier("usr_1234567890abcdef", true);  // => "usr_1234567890abcdef"
 * ```
 */
export function formatMaskedIdentifier(
  id: string | undefined,
  visible: boolean,
): string {
  if (visible || !id || id.length < 10) return id || "";
  const start = id.slice(0, 4);
  const end = id.slice(-4);
  return `${start}•• · •••••••• · ••${end}`;
}

/**
 * Formats and masks an email address using styled bullet characters for high-aesthetic privacy display.
 *
 * When `visible` is false, conceals the middle of the username and the domain name with bullets,
 * preserving the first 3 characters and (if length > 5) the last 2 characters of the local part,
 * as well as the top-level domain extension. When `visible` is true, the raw email is returned.
 *
 * @param email - The email address to mask.
 * @param visible - Whether the unmasked email should be shown.
 * @returns The formatted and masked email string.
 *
 * @example
 * ```ts
 * formatEmailAddress("developer@company.com", false); // => "dev••••••••••••er@••••••••.com"
 * formatEmailAddress("developer@company.com", true);  // => "developer@company.com"
 * ```
 */
export function formatEmailAddress(email: string, visible: boolean): string {
  if (visible || !email || !email.includes("@")) return email || "";
  const [local, domain] = email.split("@");
  if (local.length <= 3) return email;
  const start = local.slice(0, 3);
  const end = local.length > 5 ? local.slice(-2) : "";
  const domainParts = domain.split(".");
  const ext = domainParts.pop() || "com";
  return `${start}••••••••••••${end}@••••••••.${ext}`;
}
