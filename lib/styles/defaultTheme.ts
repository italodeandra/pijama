import { LightBlue, Pink, Red } from "./colors"
import { DeepPartial } from "../utils"
import { Theme } from "./Theme"

export const defaultTheme: DeepPartial<Theme> = {
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
