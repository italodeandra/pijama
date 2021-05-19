import { render, screen } from "@testing-library/react"
import { Portal } from "./Portal"

describe("Portal", () => {
  test("should render content outside of parent", () => {
    render(
      <div data-testid="parent">
        <Portal>
          <span data-testid="children" />
        </Portal>
      </div>
    )

    const children = screen.getByTestId("children")

    expect(children.closest("div")).toBeNull()
  })
})
