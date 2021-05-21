import { shadows, shorthandValue } from "./shorthand"
import { createTheme } from "../createTheme/createTheme"

const theme = createTheme()

describe("shorthand", () => {
  test(`should automatically add "content" to ::before and ::after`, () => {
    const css = shorthandValue(theme, {
      "div::after": {},
      "div::before": {},
    })
    expect(css).toStrictEqual({
      "div::after": {
        content: '""',
      },
      "div::before": {
        content: '""',
      },
    })
  })

  describe("should automatically use transition util", () => {
    test("for one property", () => {
      const css = shorthandValue(theme, {
        transition: "top",
      })
      expect(css).toStrictEqual({
        transition: `top ${theme.transition.duration}ms ease`,
      })
    })

    test("for two or more properties", () => {
      const css = shorthandValue(theme, {
        transition: ["top", "left"],
      })
      expect(css).toStrictEqual({
        transition: `top ${theme.transition.duration}ms ease, left ${theme.transition.duration}ms ease`,
      })
    })
  })

  test("should automatically use color from the theme", () => {
    const css = shorthandValue(theme, {
      color: "primary",
    })
    expect(css).toStrictEqual({
      color: theme.color.primary,
    })
  })

  test("should automatically convert to valid boxShadow values", () => {
    const css = shorthandValue(theme, {
      boxShadow: "sm",
    })
    expect(css).toStrictEqual({
      boxShadow: shadows["sm"],
    })
  })

  test("should automatically convert fontSize px to rem", () => {
    const css = shorthandValue(theme, {
      fontSize: 16,
    })
    expect(css).toStrictEqual({
      fontSize: "1rem",
    })
  })

  describe("should automatically use spacing utility", () => {
    test("for one value", () => {
      const css = shorthandValue(theme, {
        borderRadius: 2,
        height: 2,
        margin: 2,
        marginTop: 2,
        maxWidth: 2,
        padding: 2,
        paddingTop: 2,
        width: 2,
      })
      expect(css).toStrictEqual({
        borderRadius: `${2 * theme.spacingSize}px`,
        height: `${2 * theme.spacingSize}px`,
        margin: `${2 * theme.spacingSize}px`,
        marginTop: `${2 * theme.spacingSize}px`,
        maxWidth: `${2 * theme.spacingSize}px`,
        padding: `${2 * theme.spacingSize}px`,
        paddingTop: `${2 * theme.spacingSize}px`,
        width: `${2 * theme.spacingSize}px`,
      })
    })

    test("for multiple values", () => {
      const css = shorthandValue(theme, {
        borderRadius: [2, 2],
        margin: [2, 2],
        padding: [2, 2],
      })
      expect(css).toStrictEqual({
        borderRadius: `${2 * theme.spacingSize}px ${2 * theme.spacingSize}px`,
        margin: `${2 * theme.spacingSize}px ${2 * theme.spacingSize}px`,
        padding: `${2 * theme.spacingSize}px ${2 * theme.spacingSize}px`,
      })
    })
  })

  describe('should automatically convert "pos" to position css', () => {
    test("with one value", () => {
      const css = shorthandValue(theme, {
        pos: 2,
      })
      expect(css).toStrictEqual({
        bottom: `${2 * theme.spacingSize}px`,
        left: `${2 * theme.spacingSize}px`,
        position: "absolute",
        right: `${2 * theme.spacingSize}px`,
        top: `${2 * theme.spacingSize}px`,
      })
    })

    test("with x and y values", () => {
      const css = shorthandValue(theme, {
        pos: [2, 3],
      })
      expect(css).toStrictEqual({
        bottom: `${2 * theme.spacingSize}px`,
        left: `${3 * theme.spacingSize}px`,
        position: "absolute",
        right: `${3 * theme.spacingSize}px`,
        top: `${2 * theme.spacingSize}px`,
      })
    })

    test("with each value", () => {
      const css = shorthandValue(theme, {
        pos: [2, 3, 4, 5],
      })
      expect(css).toStrictEqual({
        bottom: `${4 * theme.spacingSize}px`,
        left: `${5 * theme.spacingSize}px`,
        position: "absolute",
        right: `${3 * theme.spacingSize}px`,
        top: `${2 * theme.spacingSize}px`,
      })
    })
  })

  test("should return same value if shorthand doesn't exists for specified property", () => {
    const css = shorthandValue(theme, {
      boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
      color: "#FFF",
      div: {},
      fontWeight: 500,
    })
    expect(css).toStrictEqual({
      boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
      color: "#FFF",
      div: {},
      fontWeight: 500,
    })
  })
})
