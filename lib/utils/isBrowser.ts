export const isBrowser = typeof window !== "undefined"
export const isServer = !isBrowser
export const isTouchDevice =
  isBrowser &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0)
