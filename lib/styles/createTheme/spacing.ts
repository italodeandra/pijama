import { Theme } from "../Theme"

export const spacing = (theme: Theme, ...spacings) =>
  spacings
    .map((s) => (typeof s === "number" ? `${s * theme.spacingSize}px` : s))
    .join(" ")
