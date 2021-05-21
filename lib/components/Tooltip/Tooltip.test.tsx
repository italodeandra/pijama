import { render, screen } from "@testing-library/react"
import { Button } from "../Button/Button"
import { Tooltip } from "./Tooltip"
import user from "@testing-library/user-event"

describe("Tooltip", () => {
  test("should show a tooltip when hovering", async () => {
    render(
      <Tooltip title="This is the tooltip">
        <Button>Button</Button>
      </Tooltip>
    )

    const button = screen.getByText("Button")

    user.hover(button)

    const tooltip = await screen.findByText("This is the tooltip")

    expect(tooltip).toBeInTheDocument()
  })

  test("should show a tooltip when hovering on the top left", async () => {
    jest
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(
        () => ({ height: 10, left: -20, top: -20, width: 10 } as any)
      )

    render(
      <Tooltip placement="top" title="This is the tooltip">
        <Button>Button</Button>
      </Tooltip>
    )

    const button = screen.getByText("Button")

    user.hover(button)

    const tooltip = await screen.findByText("This is the tooltip")

    expect(tooltip).toBeInTheDocument()
  })

  test("should show a tooltip when hovering on the bottom right", async () => {
    jest.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      () =>
        ({
          height: 10,
          left: window.innerWidth,
          top: window.innerHeight,
          width: 10,
        } as any)
    )

    render(
      <Tooltip placement="bottom" title="This is the tooltip">
        <Button>Button</Button>
      </Tooltip>
    )

    const button = screen.getByText("Button")

    user.hover(button)

    const tooltip = await screen.findByText("This is the tooltip")

    expect(tooltip).toBeInTheDocument()
  })

  test("should show a tooltip when hovering on the top right", async () => {
    jest.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      () =>
        ({
          height: 10,
          left: window.innerWidth,
          top: window.innerHeight + 20,
          width: 10,
        } as any)
    )

    render(
      <Tooltip placement="top" title="This is the tooltip">
        <Button>Button</Button>
      </Tooltip>
    )

    const button = screen.getByText("Button")

    user.hover(button)

    const tooltip = await screen.findByText("This is the tooltip")

    expect(tooltip).toBeInTheDocument()
  })
})
