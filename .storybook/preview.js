import "@fontsource/inter/variable-full.css"
import { addDecorator } from "@storybook/react"
import { createTheme, ThemeProvider } from "../lib"

const theme = createTheme()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /(date|Date$)/,
    },
  },
  backgrounds: {
    grid: {
      cellSize: theme.spacingSize,
    },
  },
}

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
