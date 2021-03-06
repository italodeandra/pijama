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
import MuiPopoverOverride from "../components/Popover/MuiPopoverOverride";
import { code } from "../components/Typography/code";

const theme = createTheme();

export const defaultThemeOptions = {
  components: {
    MuiTable: MuiTableOverride,
    MuiToolbar: MuiToolbarOverride,
    MuiTooltip: MuiTooltipOverride,
    MuiCard: MuiCardOverride,
    MuiPopover: MuiPopoverOverride,
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
    gray: {
      light: Gray.N400,
      main: Gray.N500,
      dark: Gray.N600,
    },
    lightGray: {
      light: Gray.N50,
      main: Gray.N100,
      dark: Gray.N200,
    },
  },
  shadows,
  typography: {
    codeBlock: codeBlock(theme),
    code: code(theme),
    fontFamily: `"InterVariable", ${theme.typography.fontFamily}`,
  },
};

let defaultTheme = createTheme(defaultThemeOptions);

defaultTheme = responsiveFontSizes(defaultTheme);

export default defaultTheme;
