import { useDocumentation } from "../../hooks"
import { ThemeProvider } from "./ThemeProvider"
import { createTheme } from "../../styles"

// noinspection JSUnusedGlobalSymbols
export const ThemeProviderDemo = () => {
  useDocumentation(
    {},
    () => `<ThemeProvider theme={createTheme()}>
  This text will have the font family from theme by default.
</ThemeProvider>`
  )

  return (
    <ThemeProvider theme={createTheme()}>
      This text will have the font family from theme by default.
    </ThemeProvider>
  )
}
