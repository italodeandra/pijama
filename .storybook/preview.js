import "@fontsource/inter/variable-full.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import { defaultTheme } from "../lib"
import { ThemeProvider } from "@material-ui/core"

// noinspection NpmUsedModulesInstalled
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      date: /Date$/,
    },
    expanded: true,
    sort: "alpha",
  },
  backgrounds: {
    gridSize: 8,
  },
  options: {
    storySort: {
      order: ["Introduction", "Components", "Styles", "Examples"],
    },
  },
}

const withThemeProvider = (Story, context) => (
  <EmotionThemeProvider theme={defaultTheme}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Story {...context} />
    </ThemeProvider>
  </EmotionThemeProvider>
)

export const decorators = [withThemeProvider]
