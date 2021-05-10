import { Theme } from "../Theme"

/**
 * Transform spread numbers into pixels while using the theme "spacingSize".
 */
export const spacing = (theme: Theme, ...spacings) =>
  spacings
    .map((s) => (typeof s === "number" ? `${s * theme.spacingSize}px` : s))
    .join(" ")
