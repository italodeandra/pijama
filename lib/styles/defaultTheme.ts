import { codeBlock } from "../components/Typography/codeBlock"
import { createTheme } from "@material-ui/core/styles"
import Gray from "./colors/Gray"
import LightBlue from "./colors/LightBlue"
import MuiTableOverride from "../components/Table/MuiTableOverride"
import MuiToolbarOverride from "../components/Toolbar/MuiToolbarOverride"
import MuiTooltipOverride from "../components/Tooltip/MuiTooltipOverride"
import Pink from "./colors/Pink"
import Red from "./colors/Red"
import shadows from "./shadows"

const theme = createTheme()

const defaultTheme = createTheme({
  components: {
    MuiTable: MuiTableOverride,
    MuiToolbar: MuiToolbarOverride,
    MuiTooltip: MuiTooltipOverride,
  },
  palette: {
    error: {
      main: Red.N500,
    },
    primary: {
      contrastText: "#fff",
      main: LightBlue.N500,
    },
    secondary: {
      main: Pink.N400,
    },
    text: {
      primary: Gray.N600,
    },
  },
  shadows,
  typography: {
    codeBlock: codeBlock(theme),
    fontFamily: `"InterVariable", ${theme.typography.fontFamily}`,
  },
})

export default defaultTheme
