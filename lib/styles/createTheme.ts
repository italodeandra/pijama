import { defaultTheme } from "./defaultTheme"
import { createTheme as muiCreateTheme } from "@material-ui/core"

export const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(defaultTheme, theme)
