import { Gray, LightBlue, createTheme } from "../../styles"
import { render, screen } from "@testing-library/react"
import { Button } from "./Button"
import Color from "color"
import user from "@testing-library/user-event"

describe("Button", () => {
  test('should show a contained button with label "Contained" and light blue background', () => {
    render(<Button>Contained</Button>)

    const button = screen.getByText("Contained")

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`background-color: ${LightBlue.N500}`)
  })

  test('should show a outlined button with label "Outlined" and light blue text color', () => {
    render(<Button variant="outlined">Outlined</Button>)

    const button = screen.getByText("Outlined")

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`color: ${LightBlue.N500}`)
  })

  test('should show a text button with label "Text" and light blue text color', () => {
    render(<Button variant="text">Text</Button>)

    const button = screen.getByText("Text")

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`color: ${LightBlue.N500}`)
  })

  test("should use gray color instead when using invalid color", () => {
    render(<Button color="invalid">Contained</Button>)

    const button = screen.getByText("Contained")

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`background-color: ${Gray.N300}`)
  })

  test("should use contrast color black on contained button", () => {
    render(<Button color="white">Contained</Button>)

    const button = screen.getByText("Contained")

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`color: #000`)
  })

  test("should show lighter color when hovering on outlined button", () => {
    const color = Color(LightBlue.N400)
    const darkerColor = color.lighten(0.2)

    render(
      <Button color={color.hex()} variant="outlined">
        Outlined
      </Button>
    )

    const button = screen.getByText("Outlined")

    expect(button).toBeInTheDocument()

    user.hover(button)

    expect(button).toHaveStyleRule("color", darkerColor.hex(), {
      target: ":hover",
    })
  })

  test("should show lighter color when hovering on text button", async () => {
    const color = Color(LightBlue.N400)
    const darkerColor = color.lighten(0.2)

    render(
      <Button color={color.hex()} variant="text">
        Text
      </Button>
    )

    const button = screen.getByText("Text")

    expect(button).toBeInTheDocument()

    user.hover(button)

    expect(button).toHaveStyleRule("color", darkerColor.hex(), {
      target: ":hover",
    })
  })

  test("should be square and show an icon", async () => {
    const icon = <svg />
    const theme = createTheme()

    render(
      <Button data-testid={"button"} icon variant="text">
        {icon}
      </Button>
    )

    const button = screen.getByTestId("button")
    const svg = button.querySelector("svg")

    expect(button).toHaveStyleRule("min-height", theme.spacing(6))
    expect(button).toHaveStyleRule("min-width", theme.spacing(6))
    expect(svg).toBeInTheDocument()
  })
})
