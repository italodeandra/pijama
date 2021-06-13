import { Gray, LightBlue, Pink, Red } from "./colors"
import { componentsOverride } from "./componentsOverride"
import { createTheme } from "@material-ui/core"
import { CSSProperties } from "react"

const theme = createTheme()

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

export const defaultTheme = createTheme({
  components: componentsOverride,
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
  typography: {
    codeBlock: {
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
    },
    fontFamily: `InterVariable, ${theme.typography.fontFamily}`,
  },
})
