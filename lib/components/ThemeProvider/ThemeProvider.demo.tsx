import { createTheme } from "../../styles"
import { ThemeProvider } from "./ThemeProvider"
import { useDocumentation } from "../../hooks"

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
