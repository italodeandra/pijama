import { proxy, ref } from "valtio"
import { createRef } from "react"

/**
 * Creates a drawer state to use with the Drawer component.
 * You need to link it with the component by using the component property
 * `state`.
 */
export const createDrawerState = () => {
  const drawerState = proxy({
    currentPosition: 0,
    isOpen: false,
    isRendering: false,
    placement: "left" as "left" | "right",
    ref: ref(createRef<HTMLDivElement>()),
    startPosition: 0,
    toggleDrawer(state?: boolean) {
      const newState = state !== undefined ? state : !drawerState.isOpen
      if (newState) {
        drawerState.isRendering = newState
        setTimeout(() => {
          drawerState.isOpen = newState
        }, 100)
      } else {
        drawerState.isOpen = newState
        setTimeout(() => {
          drawerState.isRendering = newState
        }, 100)
      }
    },
    width: 0,
  })
  return drawerState
}
