import { camelCaseToDash, DeepPartial } from "../../utils"
import { defaultTheme } from "../defaultTheme"
import { Gray } from "../colors"
import { merge } from "lodash"
import { shorthandValue } from "../shorthand/shorthand"
import { spacing } from "./spacing"
import { Theme } from "../Theme"

/**
 * Creates a theme.
 */
export const createTheme = (theme?: DeepPartial<Theme>) => {
  theme = merge({}, defaultTheme, theme)
  theme.color.textPrimary =
    theme.color.textPrimary || (theme.color.darkMode ? Gray.N100 : Gray.N600)
  theme.color.textSecondary =
    theme.color.textSecondary || (theme.color.darkMode ? Gray.N300 : Gray.N400)

  theme.spacing = theme.spacing || spacing.bind(null, theme)

  theme.transition.create =
    theme.transition.create ||
    ((...properties) =>
      properties
        .map((p) =>
          !p.includes(" ")
            ? `${camelCaseToDash(p)} ${theme.transition.duration}ms ease`
            : p
        )
        .join(", "))

  theme.rem = theme.rem || ((px) => `${px / 16}rem`)

  theme.shorthand = shorthandValue.bind(null, theme)

  return theme as Theme
}
