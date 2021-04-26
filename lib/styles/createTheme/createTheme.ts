import { DeepPartial, camelCaseToDash } from "../../utils"
import { Gray } from "../colors"
import { Theme } from "../Theme"
import { defaultTheme } from "../defaultTheme"
import { merge } from "lodash"
import { shorthandValue } from "../shorthand/shorthand"

export const createTheme = (theme?: DeepPartial<Theme>) => {
  theme = merge({}, defaultTheme, theme)
  theme.color.textPrimary =
    theme.color.textPrimary || (theme.color.darkMode ? Gray.N100 : Gray.N600)
  theme.color.textSecondary =
    theme.color.textSecondary || (theme.color.darkMode ? Gray.N300 : Gray.N400)

  theme.spacing =
    theme.spacing ||
    ((...spacings) =>
      spacings
        .map((s) => (typeof s === "number" ? `${s * theme.spacingSize}px` : s))
        .join(" "))

  theme.transition.create =
    theme.transition.create ||
    ((...properties) =>
      properties
        .map((p) => `${camelCaseToDash(p)} ${theme.transition.duration}ms ease`)
        .join(", "))

  theme.rem = theme.rem || ((px) => `${px / 16}rem`)

  theme.shorthand = shorthandValue.bind(null, theme)

  return theme as Theme
}
