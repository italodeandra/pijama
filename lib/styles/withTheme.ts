import { CSSInterpolation, SerializedStyles } from "@emotion/serialize"
import { createTheme } from "./createTheme/createTheme"
import { shorthandValue } from "./shorthand/shorthand"
import { Theme } from "./Theme"

export const withTheme = (
  styles: (
    theme: Theme,
    shorthand: (css: CSSInterpolation) => CSSInterpolation
  ) => SerializedStyles
) => (theme) => {
  theme = createTheme(theme)
  return styles(theme, shorthandValue.bind(null, theme))
}
