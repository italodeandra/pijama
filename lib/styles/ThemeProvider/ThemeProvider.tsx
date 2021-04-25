import {
  Global as EmotionGlobal,
  ThemeProvider as EmotionThemeProvider,
  css,
} from "@emotion/react"
import { ReactElement, VFC } from "react"
import { NProgress } from "../../components/NProgress"
import { Snackbar } from "../../components"
import { Theme } from "../Theme"
import { withTheme } from "../withTheme"

export type ThemeProviderProps = {
  /**
   * The element hierarchy that will consume the theme from this provider.
   */
  children: ReactElement | string
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
  theme: Theme
}

export const ThemeProvider: VFC<ThemeProviderProps> = ({
  children,
  disableNProgress,
  disableSnackbar,
  theme,
}) => {
  const globalStyles = withTheme((theme, sh) =>
    css(
      sh({
        body: {
          fontFamily: theme.typography.fontFamily,
          m: 0,
        },
      })
    )
  )

  return (
    <EmotionThemeProvider theme={theme}>
      <EmotionGlobal styles={globalStyles(theme)} />
      {!disableNProgress && <NProgress />}
      {!disableSnackbar && <Snackbar />}
      {children}
    </EmotionThemeProvider>
  )
}
