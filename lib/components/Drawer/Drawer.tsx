import { ReactNode, useEffect, useMemo, VFC } from "react"
import { useBreakpoint, withTheme } from "../../styles"
import { Box } from "../Box/Box"
import { createDrawerState } from "./drawerState"
import { css } from "@emotion/react"
import { Fade } from "../Fade/Fade"
import { Portal } from "../Portal/Portal"
import { useMeasure } from "react-use"
import { useSnapshot } from "valtio"

export type DrawerProps = {
  /**
   * Content of the drawer.
   */
  children: ReactNode
  /**
   * Placement of the drawer.
   * @default left
   */
  placement?: "left" | "right"
  /**
   * Use an external state instead of creating one internally.
   */
  state?: ReturnType<typeof createDrawerState>
}

export const Drawer: VFC<DrawerProps> = ({
  children,
  placement = "left",
  state,
}) => {
  const drawerState = useMemo(() => state || createDrawerState(), [state])
  const { isOpen, isRendering, toggleDrawer } = useSnapshot(drawerState)
  const isScreenSm = useBreakpoint("sm")

  const DarkOverlay = () => (
    <Box
      onClick={() => toggleDrawer(false)}
      sh={{ bgColor: "rgba(0,0,0,.4)", pos: 0 }}
    />
  )

  const [drawerContentRef, { width }] = useMeasure()
  useEffect(() => {
    drawerState.width = width
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  useDrawerTouchHandlers(drawerState, placement)

  const drawerStyles = withTheme((theme, sh) =>
    css(
      sh({
        bgColor: "white",
        display: "flex",
        pos: placement === "left" ? [0, "", 0, 0] : [0, 0, 0, ""],
        position: "fixed",
        shadow: "md",
        transform: `translateX(${
          (isOpen ? 0 : width) * (placement === "right" ? 1 : -1)
        }px)`,
        transition: ["transform"],
        zIndex: 2,
      })
    )
  )

  return (
    <Portal>
      <Fade in={isRendering}>
        <div>
          {!isScreenSm && <DarkOverlay />}
          <Box css={drawerStyles} ref={drawerState.ref}>
            <Box ref={drawerContentRef}>{children}</Box>
          </Box>
        </div>
      </Fade>
    </Portal>
  )
}

const useDrawerTouchHandlers = (
  drawerState: ReturnType<typeof createDrawerState>,
  placement: "left" | "right"
) => {
  const conditions = {
    left: {
      false: () => !drawerState.isOpen && drawerState.startPosition < 40,
      true: () =>
        drawerState.isOpen &&
        drawerState.startPosition < drawerState.width + 40,
    },
    right: {
      false: () =>
        !drawerState.isOpen &&
        drawerState.startPosition > window.innerWidth - 40,
      true: () =>
        drawerState.isOpen &&
        drawerState.startPosition > window.innerWidth - drawerState.width - 40,
    },
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { clientX } = e.targetTouches[0]
      drawerState.startPosition = clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      const { startPosition, width, isOpen, ref } = drawerState
      if (conditions[placement][isOpen.toString()]()) {
        drawerState.isRendering = true
        if (ref.current) {
          ref.current.style.transition = "none"
          const { clientX } = e.targetTouches[0]
          drawerState.currentPosition = clientX
          if (placement === "right") {
            let movement = clientX - startPosition + (isOpen ? -width : 0)
            movement = movement > 0 ? 0 : movement
            movement = movement < -width ? -width : movement
            ref.current.style.transform = `translateX(${width + movement}px)`
          } else {
            let movement = clientX - startPosition + (isOpen ? width : 0)
            movement = movement < 0 ? 0 : movement
            movement = movement > width ? width : movement
            ref.current.style.transform = `translateX(${movement - width}px)`
          }
        }
      }
    }

    const handleTouchEnd = () => {
      const { startPosition, currentPosition, width, isOpen, ref } = drawerState
      if (conditions[placement][isOpen.toString()]()) {
        ref.current.style.transition = ""
        ref.current.style.transform = ""
        let movement = currentPosition - startPosition
        if (placement === "right") {
          if (movement < -(width / 2)) {
            drawerState.isOpen = true
          } else if (movement > width / 2) {
            drawerState.isOpen = false
          }
        } else {
          if (movement > width / 2) {
            drawerState.isOpen = true
          } else if (movement < -(width / 2)) {
            drawerState.isOpen = false
          }
        }
      }
      drawerState.isRendering = drawerState.isOpen
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("touchcancel", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("touchcancel", handleTouchEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement])
}
