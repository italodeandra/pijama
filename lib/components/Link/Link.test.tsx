import { Blue, defaultTheme, Gray } from "../../styles"
import { render, screen } from "@testing-library/react"
import Color from "color"
import { Link } from "./Link"
import user from "@testing-library/user-event"

describe("Link", () => {
  test("should have the primary color", () => {
    const url = "https://pijama.majapi.com"

    render(
      <Link data-testid="link" href={url}>
        This is a link
      </Link>
    )

    const link = screen.getByTestId("link")

    expect(link).toHaveAttribute("href", url)
    expect(link).toHaveStyle(`color: ${defaultTheme.color.primary}`)
  })

  test("should inherit the color", () => {
    render(
      <Link color="inherit" data-testid="link" href="https://pijama.majapi.com">
        This is a link
      </Link>
    )

    const link = screen.getByTestId("link")

    expect(link).toHaveStyle("color: inherit")
  })

  test("should have the active color when on the same url as the href", () => {
    render(
      <Link data-testid="link" href="/">
        Home
      </Link>
    )

    const link = screen.getByTestId("link")

    expect(link).toHaveStyle(
      `color: ${Color(defaultTheme.color.primary).darken(0.7).hex()}`
    )
  })

  describe("should have the active color when on the same url as the href", () => {
    test("the active color should be a darker version of a dark color", () => {
      render(
        <Link data-testid="link" href="/">
          Home
        </Link>
      )

      const link = screen.getByTestId("link")

      expect(link).toHaveStyle(
        `color: ${Color(defaultTheme.color.primary).darken(0.7).hex()}`
      )
    })

    test("the active color should be a lighter version of a light color", () => {
      render(
        <Link color={Blue.N200} data-testid="link" href="/">
          Home
        </Link>
      )

      const link = screen.getByTestId("link")

      expect(link).toHaveStyle(`color: ${Color(Blue.N200).lighten(0.7).hex()}`)
    })
  })

  test("should use grey color when invalid color is passed", () => {
    render(
      <Link color="invalid-color" data-testid="link" href="/">
        Home
      </Link>
    )

    const link = screen.getByTestId("link")

    expect(link).toHaveStyle(`color: ${Color(Gray.N300).hex()}`)
  })

  test("should show darker color when hovered and the color is already dark", () => {
    render(
      <Link data-testid="link" href="https://pijama.majapi.com">
        Pijama
      </Link>
    )

    const link = screen.getByTestId("link")

    user.hover(link)

    expect(link).toHaveStyleRule(
      "color",
      Color(defaultTheme.color.primary).darken(0.2).hex(),
      { target: ":hover" }
    )
  })

  test("should show lighter color when hovered and the color is not dark", () => {
    render(
      <Link
        color={Blue.N200}
        data-testid="link"
        href="https://pijama.majapi.com"
      >
        Pijama
      </Link>
    )

    const link = screen.getByTestId("link")

    user.hover(link)

    expect(link).toHaveStyleRule("color", Color(Blue.N200).lighten(0.2).hex(), {
      target: ":hover",
    })
  })
})
