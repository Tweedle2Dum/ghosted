import * as React from "react";

/** Default viewport width breakpoint in pixels for mobile detection (matches md: in Tailwind CSS) */
const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook to detect whether the current viewport width is within the mobile breakpoint (< 768px).
 *
 * Automatically tracks window resizing and media query changes.
 * Returns `false` on the server / initial SSR pass to ensure hydration stability.
 *
 * @returns `true` if the viewport width is strictly less than 768px; otherwise `false`.
 *
 * @example
 * ```tsx
 * function ResponsiveSidebar() {
 *   const isMobile = useIsMobile();
 *   return isMobile ? <Drawer /> : <Sidebar />;
 * }
 * ```
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
