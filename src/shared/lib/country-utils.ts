import { type Country, getCountries } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

/**
 * Re-export of the `Country` type from `react-phone-number-input` representing ISO 3166-1 alpha-2 codes.
 *
 * @example
 * ```ts
 * const country: CountryCode = "US";
 * ```
 */
export type CountryCode = Country;

/**
 * Resolves an ISO 3166-1 alpha-2 country code from a human-readable country name.
 * Performs a case-insensitive search across the localized English country dictionary in `react-phone-number-input`.
 *
 * @param name - The full country name to search (e.g., "United States", "India", "Japan").
 * @returns The matching two-letter `Country` code if found; otherwise `undefined`.
 *
 * @example
 * ```ts
 * getCountryCode("United States"); // => "US"
 * getCountryCode("india");         // => "IN"
 * getCountryCode("Atlantis");      // => undefined
 * ```
 */
export const getCountryCode = (name: string): Country | undefined => {
  const entry = Object.entries(en).find(
    ([, label]) => label.toLowerCase() === name.toLowerCase(),
  );
  return entry ? (entry[0] as Country) : undefined;
};

/**
 * Resolves the localized display name for a given ISO 3166-1 alpha-2 country code.
 *
 * @param code - Two-letter country code (e.g., "US", "GB").
 * @returns The English country name, or `undefined` if invalid.
 *
 * @example
 * ```ts
 * getCountryName("US"); // => "United States"
 * ```
 */
export const getCountryName = (code: Country): string | undefined => {
  return (en as Record<string, string>)[code];
};

/**
 * Returns a complete sorted list of all supported countries with ISO code and display name.
 *
 * @returns Array of objects with `code` and `name`, sorted alphabetically by English name.
 *
 * @example
 * ```ts
 * const allCountries = getAllCountries();
 * console.log(allCountries[0]); // { code: "AF", name: "Afghanistan" }
 * ```
 */
export const getAllCountries = (): Array<{ code: Country; name: string }> => {
  return getCountries()
    .map((code) => ({
      code,
      name: (en as Record<string, string>)[code] || code,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
