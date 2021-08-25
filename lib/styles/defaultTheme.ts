import { codeBlock } from "../components/Typography/codeBlock";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Gray from "./colors/Gray";
import LightBlue from "./colors/LightBlue";
import MuiTableOverride from "../components/Table/MuiTableOverride";
import MuiToolbarOverride from "../components/Toolbar/MuiToolbarOverride";
import MuiTooltipOverride from "../components/Tooltip/MuiTooltipOverride";
import Pink from "./colors/Pink";
import Red from "./colors/Red";
import shadows from "./shadows";
import MuiCardOverride from "../components/Card/MuiCardOverride";
import MuiMenuOverride from "../components/Menu/MuiMenuOverride";

const theme = createTheme();

export const defaultThemeOptions = {
  components: {
    MuiTable: MuiTableOverride,
    MuiToolbar: MuiToolbarOverride,
    MuiTooltip: MuiTooltipOverride,
    MuiCard: MuiCardOverride,
    MuiMenu: MuiMenuOverride,
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
};

let defaultTheme = createTheme(defaultThemeOptions);

defaultTheme = responsiveFontSizes(defaultTheme);

export default defaultTheme;
