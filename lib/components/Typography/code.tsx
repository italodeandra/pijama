import type { CSSProperties } from "react";
import Gray from "../../styles/colors/Gray";
import type { Theme, TypographyStyle } from "@material-ui/core/styles";
import { codeBlock } from "./codeBlock";

declare module "@material-ui/core/styles" {
  interface TypographyVariants {
    code: CSSProperties;
  }

  // allow configuration using `createTheme`
  // noinspection JSUnusedGlobalSymbols
  interface TypographyVariantsOptions {
    code?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

export const code = (theme: Theme): TypographyStyle => ({
  ...codeBlock(theme),
  display: "inline",
  padding: theme.spacing(0.5, 0.75),
  userSelect: "all",
});
