import { useEffect, useState } from "react";

/**
 * Custom hook that debounces changes to a value by a specified time delay in milliseconds.
 *
 * Commonly used for throttling rapid user inputs such as search fields before triggering
 * expensive network requests or state recalibration.
 *
 * @template T - The type of value being debounced.
 * @param value - The changing value to debounce.
 * @param delay - The delay in milliseconds before the debounced value updates.
 * @returns The debounced value.
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearch = useDebounce(searchTerm, 300);
 *
 * // Only triggers API query 300ms after user finishes typing
 * const { data } = useQuery({
 *   queryKey: ["search", debouncedSearch],
 *   queryFn: () => api.get(`/items?q=${debouncedSearch}`),
 * });
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
