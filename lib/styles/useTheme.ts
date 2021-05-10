import { createTheme } from "./createTheme/createTheme"
import { Theme } from "./Theme"
import { useTheme as useEmotionTheme } from "@emotion/react"
import { useMemo } from "react"

/**
 * Hook to return the current theme.
 */
export const useTheme = () => {
  const theme = useEmotionTheme()
  return useMemo(() => createTheme(theme as Theme), [theme])
}
