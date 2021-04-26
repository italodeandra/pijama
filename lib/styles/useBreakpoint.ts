import { Theme } from "./Theme"
import { useMedia } from "react-use"
import { useTheme } from "./useTheme"

export const useBreakpoint = (breakpoint: keyof Theme["breakpoints"]) => {
  const theme = useTheme()
  return useMedia(`(min-width: ${theme.breakpoints[breakpoint]})`)
}
