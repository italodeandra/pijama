import { createTheme, Theme, withTheme } from "../../styles"
import {
  css,
  Global as EmotionGlobal,
  ThemeProvider as EmotionThemeProvider,
} from "@emotion/react"
import { ReactNode, VFC } from "react"
import { NProgress } from "../NProgress"
import { Snackbar } from "../Snackbar"

const globalStyles = withTheme((theme, sh) =>
  css(
    sh({
      "*": {
        boxSizing: "border-box",
      },
      body: {
        color: theme.color.textPrimary,
        fontFamily: theme.typography.fontFamily,
        m: 0,
      },
    })
  )
)

export type ThemeProviderProps = {
  /**
   * The element hierarchy that will consume the theme from this provider.
   */
  children: ReactNode
  /**
   * Disable the automatic usage of NProgress so you can use your own or none.
   */
  disableNProgress?: boolean
  /**
   * Disable the automatic usage of Snackbar so you can use your own or none.
   */
  disableSnackbar?: boolean
  /**
   * The theme object created using `createTheme()`.
   */
  theme?: Theme
}

/**
 * The theme provider.
 *
 * [Demo](https://pijama.majapi.com.br/components/ThemeProvider)
 */
export const ThemeProvider: VFC<ThemeProviderProps> = ({
  children,
  disableNProgress,
  disableSnackbar,
  theme = createTheme(),
}) => (
  <EmotionThemeProvider theme={theme}>
    <EmotionGlobal styles={globalStyles(theme)} />
    {!disableNProgress && <NProgress />}
    {!disableSnackbar && <Snackbar />}
    {children}
  </EmotionThemeProvider>
)
