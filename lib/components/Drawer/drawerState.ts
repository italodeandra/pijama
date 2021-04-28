import { createRef, Ref } from "react"
import { proxy, ref } from "valtio"

export const drawerState = proxy({
  currentPosition: 0,
  isOpen: false,
  isRendering: false,
  ref: ref(createRef()) as Ref<HTMLDivElement> & ReturnType<typeof ref>,
  startPosition: 0,
  width: 0,
})

export const toggleDrawer = (state?: boolean) => {
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
}
