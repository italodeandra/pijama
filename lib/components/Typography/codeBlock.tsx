import type { CSSProperties } from "react"
import Gray from "../../styles/colors/Gray"
import type { Theme } from "@material-ui/core/styles/createTheme"
import type { TypographyStyle } from "@material-ui/core/styles/createTypography"

declare module "@material-ui/core/styles" {
  interface TypographyVariants {
    codeBlock: CSSProperties
  }

  // allow configuration using `createTheme`
  // noinspection JSUnusedGlobalSymbols
  interface TypographyVariantsOptions {
    codeBlock?: CSSProperties
  }
}

// Update the Typography's variant prop options
declare module "@material-ui/core/Typography" {
  interface TypographyPropsVariantOverrides {
    codeBlock: true
  }
}

export const codeBlock = (theme: Theme): TypographyStyle => ({
  backgroundColor: Gray.N100,
  borderRadius: theme.spacing(0.5),
  color: Gray.N600,
  display: "block",
  fontFamily:
    'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  fontSize: theme.typography.pxToRem(12),
  overflow: "auto",
  padding: theme.spacing(0.75, 1),
  whiteSpace: "pre",
  width: "100%",
})
