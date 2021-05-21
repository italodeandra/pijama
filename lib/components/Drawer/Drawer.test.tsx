// eslint-disable-next-line no-restricted-imports
import * as reactUse from "react-use"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Button } from "../Button/Button"
import { createDrawerState } from "./drawerState"
import { Drawer } from "./Drawer"
import { UseMeasureRect } from "react-use/lib/useMeasure"
import user from "@testing-library/user-event"

jest.mock("../../styles/useBreakpoint/useBreakpoint")
jest
  .spyOn(reactUse, "useMeasure")
  .mockImplementation(() => [() => {}, { width: 40 } as UseMeasureRect])

describe("Drawer", () => {
  test("should show the drawer content when toggling it to open", async () => {
    const drawerState = createDrawerState()

    render(
      <>
        <Drawer state={drawerState}>Drawer content</Drawer>
        <Button onClick={() => drawerState.toggleDrawer()}>Open drawer</Button>
      </>
    )

    await waitFor(() =>
      expect(screen.queryByText("Drawer content")).not.toBeInTheDocument()
    )

    const openDrawerButton = screen.getByText("Open drawer")
    user.click(openDrawerButton)

    await waitFor(() =>
      expect(screen.getByText("Drawer content")).toBeInTheDocument()
    )
    await waitFor(() => expect(drawerState.isOpen).toBe(true))
  })

  test("should close the drawer when clicking on the dark overlay", async () => {
    const drawerState = createDrawerState()

    render(
      <>
        <Drawer placement="left" state={drawerState}>
          Drawer content
        </Drawer>
        <Button onClick={() => drawerState.toggleDrawer()}>Open drawer</Button>
      </>
    )

    const openDrawerButton = screen.getByText("Open drawer")
    user.click(openDrawerButton)

    const darkOverlay = await screen.findByTestId("dark-overlay")
    user.click(darkOverlay)

    await waitFor(() => expect(drawerState.isOpen).toBe(false))
    await waitFor(() =>
      expect(screen.queryByText("Drawer content")).not.toBeInTheDocument()
    )
  })

  describe("when placement on the left", () => {
    test("should open drawer when touching from the left to right", async () => {
      const drawerState = createDrawerState()
      render(
        <Drawer placement="left" state={drawerState}>
          Drawer content
        </Drawer>
      )

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: 1 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 10 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 30 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.getByText("Drawer content")).toBeInTheDocument()
      )
      await waitFor(() => expect(drawerState.isOpen).toBe(true))
    })

    test("should close drawer when touching from the right to left", async () => {
      jest
        .spyOn(reactUse, "useMeasure")
        .mockImplementation(() => [() => {}, { width: 40 } as UseMeasureRect])

      const drawerState = createDrawerState()

      render(
        <>
          <Drawer placement="left" state={drawerState}>
            Drawer content
          </Drawer>
          <Button onClick={() => drawerState.toggleDrawer()}>
            Open drawer
          </Button>
        </>
      )

      const openDrawerButton = screen.getByText("Open drawer")
      user.click(openDrawerButton)

      await waitFor(() =>
        expect(screen.getByText("Drawer content")).toBeInTheDocument()
      )
      await waitFor(() => expect(drawerState.isOpen).toBe(true))

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: 40 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 30 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 10 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.queryByText("Drawer content")).not.toBeInTheDocument()
      )
      await waitFor(() => expect(drawerState.isOpen).toBe(false))
    })
  })

  describe("when placement on the right", () => {
    test("should open drawer when touching from the right to left", async () => {
      render(<Drawer placement="right">Drawer content</Drawer>)

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: window.innerWidth - 10 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: window.innerWidth - 30 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: window.innerWidth - 40 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.getByText("Drawer content")).toBeInTheDocument()
      )
    })

    test("should close drawer when touching from the left to right", async () => {
      const drawerState = createDrawerState()

      render(
        <>
          <Drawer placement="right" state={drawerState}>
            Drawer content
          </Drawer>
          <Button onClick={() => drawerState.toggleDrawer()}>
            Open drawer
          </Button>
        </>
      )

      const openDrawerButton = screen.getByText("Open drawer")
      user.click(openDrawerButton)

      await waitFor(() =>
        expect(screen.getByText("Drawer content")).toBeInTheDocument()
      )
      await waitFor(() => expect(drawerState.isOpen).toBe(true))

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: window.innerWidth - 40 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: window.innerWidth - 30 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: window.innerWidth - 10 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.queryByText("Drawer content")).not.toBeInTheDocument()
      )
      await waitFor(() => expect(drawerState.isOpen).toBe(false))
    })
  })

  describe("when touching to the opposite opposite side", () => {
    test("when placement left and closed, touch from right to right should do nothing", async () => {
      render(<Drawer placement="left">Drawer content</Drawer>)

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: 50 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 60 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.queryByText("Drawer content")).not.toBeInTheDocument()
      )
    })

    test("when placement left and open, touch from left to right should do nothing", async () => {
      const drawerState = createDrawerState()
      drawerState.isOpen = true
      drawerState.isRendering = true

      render(
        <Drawer placement="right" state={drawerState}>
          Drawer content
        </Drawer>
      )

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: window.innerWidth - 50 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: window.innerWidth - 60 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.queryByText("Drawer content")).toBeInTheDocument()
      )
    })

    test("when placement right and open, touch from right to left should do nothing", async () => {
      const drawerState = createDrawerState()
      drawerState.isOpen = true
      drawerState.isRendering = true

      render(
        <Drawer placement="left" state={drawerState}>
          Drawer content
        </Drawer>
      )

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: 50 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 60 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.queryByText("Drawer content")).toBeInTheDocument()
      )
    })

    /*test("when open from left to right should do nothing", async () => {
      const drawerState = createDrawerState()

      render(
        <>
          <Drawer placement="left" state={drawerState}>
            Drawer content
          </Drawer>
          <Button onClick={() => drawerState.toggleDrawer()}>
            Open drawer
          </Button>
        </>
      )

      const openDrawerButton = screen.getByText("Open drawer")
      user.click(openDrawerButton)

      await waitFor(() =>
        expect(screen.getByText("Drawer content")).toBeInTheDocument()
      )
      await waitFor(() => expect(drawerState.isOpen).toBe(true))

      await act(async () => {
        fireEvent.touchStart(window, {
          targetTouches: [{ clientX: 39 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 50 }],
        })
      })
      await act(async () => {
        fireEvent.touchMove(window, {
          targetTouches: [{ clientX: 60 }],
        })
      })
      await act(async () => {
        fireEvent.touchEnd(window)
      })

      await waitFor(() =>
        expect(screen.queryByText("Drawer content")).toBeInTheDocument()
      )
    })*/
  })
})
