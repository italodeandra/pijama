import { defaultThemeOptions } from "./defaultTheme";
import { createTheme as muiCreateTheme } from "@material-ui/core/styles";
import merge from "lodash/merge";

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(merge(defaultThemeOptions, theme));

export default createTheme;
