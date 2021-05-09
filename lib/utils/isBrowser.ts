export const isBrowser = typeof window !== "undefined"
// noinspection JSUnusedGlobalSymbols
export const isServer = !isBrowser
// noinspection JSUnusedGlobalSymbols
export const isTouchDevice =
  isBrowser &&
  (!!(
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      // @ts-ignore
      (window.DocumentTouch &&
        typeof document !== "undefined" &&
        // @ts-ignore
        document instanceof window.DocumentTouch))
  ) ||
    !!(
      typeof navigator !== "undefined" &&
      (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
    ))
