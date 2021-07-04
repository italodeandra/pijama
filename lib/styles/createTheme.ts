import defaultTheme from "./defaultTheme"
import { createTheme as muiCreateTheme } from "@material-ui/core/styles"

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(defaultTheme, theme)

export default createTheme
