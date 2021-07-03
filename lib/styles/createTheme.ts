import defaultTheme from "./defaultTheme"
import { default as muiCreateTheme } from "@material-ui/core/styles/createTheme"

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(defaultTheme, theme)

export default createTheme
