import { Gray } from "../colors"
import { createTheme } from "./createTheme"

describe("createTheme", () => {
  test("should reuse existing theme utility", () => {
    const originalTheme = createTheme()
    const spacingFn = originalTheme.spacing
    const cloneTheme = createTheme(originalTheme as unknown)
    expect(cloneTheme.spacing).toBe(spacingFn)
  })

  test("should create theme in dark mode", () => {
    const darkTheme = createTheme({
      color: {
        darkMode: true,
      },
    })
    expect(darkTheme.color.textPrimary).toBe(Gray.N100)
  })
})
