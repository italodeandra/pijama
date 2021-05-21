import { createTheme } from "./createTheme"
import { Gray } from "../colors"

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

  describe("theme.transition.create", () => {
    test("should return a string of the transition ready for css", () => {
      const theme = createTheme()
      const transition = theme.transition.create("top")
      expect(transition).toBe(`top ${theme.transition.duration}ms ease`)
    })

    test("should return the same string passed to it if it's a transition already", () => {
      const theme = createTheme()
      const transition = theme.transition.create(
        `top ${theme.transition.duration}ms ease` as any
      )
      expect(transition).toBe(`top ${theme.transition.duration}ms ease`)
    })
  })

  describe("theme.rem", () => {
    test("should convert pixel to rem", () => {
      const theme = createTheme()
      const rem = theme.rem(16)
      expect(rem).toBe("1rem")
    })
  })
})
