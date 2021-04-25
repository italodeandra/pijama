import { CSSInterpolation, SerializedStyles } from "@emotion/serialize"
import { Theme } from "./Theme"
import { createTheme } from "./createTheme/createTheme"
import { shorthandValue } from "./shorthand"

export const withTheme = (
  styles: (
    theme: Theme,
    shorthand: (css: CSSInterpolation) => CSSInterpolation
  ) => SerializedStyles
) => (theme) => {
  theme = createTheme(theme)
  return styles(theme, shorthandValue.bind(null, theme))
}
