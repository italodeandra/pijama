import { LightBlue, Pink, Red } from "./colors"
import { DeepPartial } from "../utils"
import { Theme } from "./Theme"

export const defaultTheme: DeepPartial<Theme> = {
  breakpoints: {
    /* eslint-disable sort-keys */
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
  color: {
    darkMode: false,
    error: Red.N500,
    primary: LightBlue.N500,
    secondary: Pink.N600,
  },
  spacingSize: 8,
  transition: {
    duration: 200,
  },
  typography: {
    fontFamily:
      "InterVariable, apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
}
