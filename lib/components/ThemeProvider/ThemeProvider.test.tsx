import { createTheme, defaultTheme, Red } from "../../styles"
import { render, screen } from "@testing-library/react"
import { Button } from "../Button/Button"
import { ThemeProvider } from "./ThemeProvider"

describe("ThemeProvider", () => {
  test("should use color passed on theme", () => {
    const color = Red.N500
    const theme = createTheme({
      color: {
        primary: color,
      },
    })
    render(
      <ThemeProvider theme={theme}>
        <Button>Button</Button>
      </ThemeProvider>
    )
    const button = screen.getByText("Button")
    expect(button).toHaveStyle(`background-color: ${color}`)
  })

  test("should use color from default theme", () => {
    render(
      <ThemeProvider>
        <Button>Button</Button>
      </ThemeProvider>
    )
    const button = screen.getByText("Button")
    expect(button).toHaveStyle(
      `background-color: ${defaultTheme.color.primary}`
    )
  })
})
