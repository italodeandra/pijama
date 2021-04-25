import { render, screen } from "@testing-library/react"
import { LinearProgress } from "./LinearProgress"

describe("LinearProgress", () => {
  test("should show a progress with 30%", () => {
    render(<LinearProgress value={30} />)

    const bar = screen.getByTestId("bar")

    expect(bar).toHaveStyle("width: 30%")
  })

  test("should show a progress with 0% when passing empty string", () => {
    render(<LinearProgress value={("" as unknown) as number} />)

    const bar = screen.getByTestId("bar")

    expect(bar).toHaveStyle("width: 0%")
  })

  test("should show a progress with 100% when passing more than 100", () => {
    render(<LinearProgress value={101} />)

    const bar = screen.getByTestId("bar")

    expect(bar).toHaveStyle("width: 100%")
  })
})
