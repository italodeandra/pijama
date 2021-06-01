import { render, screen, waitFor } from "@testing-library/react"
import { Button } from "../Button/Button"
import { Menu } from "./Menu"
import { MenuItem } from "./MenuItem"
import { sleep } from "../../utils"
import user from "@testing-library/user-event"

describe("Menu", () => {
  test("should show a menu when clicking a button", () => {
    const spy = jest.fn()

    render(
      <Menu
        options={
          <>
            <MenuItem onClick={spy}>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </>
        }
      >
        <Button>Click to show a menu</Button>
      </Menu>
    )

    const button = screen.getByText("Click to show a menu")
    user.click(button)

    const menuItem = screen.getByText("Item 1")
    user.click(menuItem)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test("should focus the first item after pressing tab", async () => {
    render(
      <Menu
        options={
          <>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </>
        }
      >
        <Button>Click to show a menu</Button>
      </Menu>
    )

    const button = screen.getByText("Click to show a menu")
    user.click(button)

    const menuItem = screen.getByText("Item 1")

    await sleep(0)

    user.tab()

    await waitFor(() => expect(menuItem).toHaveFocus())
  })

  test("should trap focus inside the menu when open and keep pressing tab", async () => {
    render(
      <Menu
        options={
          <>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </>
        }
      >
        <Button>Click to show a menu</Button>
      </Menu>
    )

    const button = screen.getByText("Click to show a menu")
    user.click(button)

    const menuItem = screen.getByText("Item 1")

    await sleep(0)

    user.tab()
    user.tab()
    user.tab()

    await waitFor(() => expect(menuItem).toHaveFocus())
  })

  test("should show the menu where the user clicked", async () => {
    jest
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(
        () => ({ height: 10, left: 8, top: 8, width: 10 } as any)
      )

    render(
      <Menu
        options={
          <>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </>
        }
        placement="mouse"
      >
        <Button>Click to show a menu</Button>
      </Menu>
    )

    const button = screen.getByText("Click to show a menu")
    user.click(button, {
      clientX: 5,
      clientY: 6,
    })

    const menuItem = screen.getByText("Item 1")
    const menu = menuItem.parentElement

    expect(menu).toHaveStyle("left: 5px")
    expect(menu).toHaveStyle("top: 6px")
  })

  test("should show a menu when clicking on the top left", async () => {
    jest
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(
        () => ({ height: 10, left: -20, top: -20, width: 10 } as any)
      )

    render(
      <Menu options={<MenuItem>Item 1</MenuItem>}>
        <Button>Button</Button>
      </Menu>
    )

    const button = screen.getByText("Button")

    user.click(button)

    const menuItem = screen.getByText("Item 1")
    const menu = menuItem.parentElement

    expect(menu).toBeInTheDocument()
  })

  test("should show a menu when clicking on the bottom right", async () => {
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
      <Menu options={<MenuItem>Item 1</MenuItem>}>
        <Button>Button</Button>
      </Menu>
    )

    const button = screen.getByText("Button")

    user.click(button)

    const menuItem = screen.getByText("Item 1")
    const menu = menuItem.parentElement

    expect(menu).toBeInTheDocument()
  })

  test("should close menu after clicking again when it's already open", async () => {
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
      <Menu options={<MenuItem>Item 1</MenuItem>}>
        <Button>Button</Button>
      </Menu>
    )

    const button = screen.getByText("Button")

    user.click(button)

    const menuItem = screen.getByText("Item 1")

    await sleep(1)

    expect(menuItem).toBeInTheDocument()

    user.click(button)

    await waitFor(() => expect(menuItem).not.toBeInTheDocument())
  })

  test("should close the menu when clicking outside", async () => {
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
      <>
        <Menu options={<MenuItem>Item 1</MenuItem>}>
          <Button>Button</Button>
        </Menu>
        <button>Other button</button>
      </>
    )

    const button = screen.getByText("Button")
    user.click(button)

    const menuItem = screen.getByText("Item 1")

    await sleep(1)

    expect(menuItem).toBeInTheDocument()

    const otherButton = screen.getByText("Other button")
    user.click(otherButton)

    await waitFor(() => expect(menuItem).not.toBeInTheDocument())
  })
})
