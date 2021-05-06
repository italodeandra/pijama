export const isBrowser = typeof window !== "undefined"
// noinspection JSUnusedGlobalSymbols
export const isServer = !isBrowser
// noinspection JSUnusedGlobalSymbols
export const isTouchDevice =
  isBrowser &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0)
