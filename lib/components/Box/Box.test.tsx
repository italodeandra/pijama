import { render, screen } from "@testing-library/react"
import { Box } from "./Box"
import { defaultTheme } from "../../styles"

describe("Box", () => {
  test("should render a div", () => {
    render(<Box data-testid="box" />)

    expect(screen.getByTestId("box")).toBeInTheDocument()
  })

  test("should have width of 8px", () => {
    render(<Box data-testid="box" sh={{ width: 1 }} />)

    const box = screen.getByTestId("box")

    expect(box).toHaveStyle("width: 8px")
  })

  test("should have background with primary color", () => {
    render(
      <Box
        data-testid="box"
        sh={(theme) => ({ bgColor: theme.color.primary })}
      />
    )

    const box = screen.getByTestId("box")

    expect(box).toHaveStyle(`background-color: ${defaultTheme.color.primary}`)
  })
})
