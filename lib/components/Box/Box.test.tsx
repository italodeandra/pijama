import { render, screen } from "@testing-library/react"
import { Box } from "./Box"

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
})
