import { createTheme } from "./createTheme"
import { spacing } from "./spacing"

describe("spacing", () => {
  const theme = createTheme()
  test("should return only 1 spacing with value", () => {
    expect(spacing(theme, 1)).toBe(`${theme.spacingSize}px`)
  })
  test("should return 2 spacing with value", () => {
    expect(spacing(theme, 1, 2)).toBe(
      `${theme.spacingSize}px ${theme.spacingSize * 2}px`
    )
  })
  test("should return empty string without value", () => {
    expect(spacing(theme, "")).toBe("")
  })
})
