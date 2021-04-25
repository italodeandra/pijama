import { useEffect, useLayoutEffect } from "react"

export const useSsrEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect
