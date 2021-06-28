import { ComponentType } from "react"
import dynamic from "next/dynamic"

export const noSsr = (Component: ComponentType) =>
  dynamic(Promise.resolve(Component), { ssr: false })
