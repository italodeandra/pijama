import { defaultThemeOptions } from "./defaultTheme";
import { createTheme as muiCreateTheme } from "@material-ui/core/styles";
import merge from "lodash/merge";

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(merge(defaultThemeOptions, theme));

export default createTheme;

declare module "@material-ui/core/Button/Button" {
  // noinspection JSUnusedGlobalSymbols
  interface ButtonPropsColorOverrides {
    lightGray: true;
    gray: true;
  }
}

declare module "@material-ui/core/styles/createPalette" {
  // noinspection JSUnusedGlobalSymbols
  interface Palette {
    lightGray: Palette["primary"];
    gray: Palette["primary"];
  }

  // noinspection JSUnusedGlobalSymbols
  interface PaletteOptions {
    lightGray?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}
