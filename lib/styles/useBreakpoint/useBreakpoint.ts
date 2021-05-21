import { Theme } from "../Theme"
import { useMedia } from "react-use"
import { useTheme } from "../useTheme"

/**
 * Hook that checks the media query based on predefined breakpoints.
 */
export const useBreakpoint = (breakpoint: keyof Theme["breakpoints"]) => {
  const theme = useTheme()
  return useMedia(`(min-width: ${theme.breakpoints[breakpoint]})`)
}
