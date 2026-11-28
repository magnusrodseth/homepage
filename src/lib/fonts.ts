import localFont from "next/font/local";

/**
 * Static Geist SemiBold for the outlined year numerals.
 *
 * The variable Geist that `geist/font/sans` ships draws 5 and 6 as two
 * overlapping contours. A filled glyph hides the overlap, but
 * `-webkit-text-stroke` outlines both contours and leaves a stray hook inside
 * the bowl. The static instance has its overlaps removed.
 */
export const outlineNumeralsFont = localFont({
  src: "../fonts/geist-semibold.woff2",
  weight: "600",
  display: "swap",
  fallback: ["GeistSans", "system-ui", "sans-serif"],
});
