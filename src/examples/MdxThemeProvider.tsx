import CssBaseline from "@material-ui/core/CssBaseline"
import defaultTheme from "../../lib/styles/defaultTheme"
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import ThemeProvider from "@material-ui/core/styles/ThemeProvider"

const MdxThemeProvider = ({ children }) => (
  <EmotionThemeProvider theme={defaultTheme}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </EmotionThemeProvider>
)

export default MdxThemeProvider
