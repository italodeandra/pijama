import { Theme } from "./Theme"
import { createTheme } from "./createTheme/createTheme"
import { useTheme as useEmotionTheme } from "@emotion/react"
import { useMemo } from "react"

export const useTheme = () => {
  const theme = useEmotionTheme()
  return useMemo(() => createTheme(theme as Theme), [theme])
}
