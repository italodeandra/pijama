import CssBaseline from "@material-ui/core/CssBaseline"
import { defaultTheme } from "../../lib"
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import { ThemeProvider } from "@material-ui/core"

export const MdxThemeProvider = ({ children }) => (
  <EmotionThemeProvider theme={defaultTheme}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </EmotionThemeProvider>
)
