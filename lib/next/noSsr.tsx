import type { ComponentType } from "react"
import dynamic from "next/dynamic"

export default function noSsr(Component: ComponentType) {
  return dynamic(Promise.resolve(Component), { ssr: false })
}
