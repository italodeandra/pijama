import { AllHTMLAttributes, ElementType, Ref, RefObject } from "react"
import { CSSInterpolation } from "@emotion/serialize"
import { Theme } from "./index"

type HTMLElementFrom<K extends keyof JSX.IntrinsicElements> = NonNullable<
  Extract<JSX.IntrinsicElements[K]["ref"], RefObject<any>>["current"]
>

export type ComponentShorthandProps<
  T extends ElementType = ElementType,
  E = HTMLElement
> = {
  /**
   * Change which HTML element or React component should be.
   * @default div
   */
  as?: T
  /**
   * Styles shorthand.
   */
  sh?: CSSInterpolation | ((theme: Theme) => CSSInterpolation)
  /**
   * Element ref.
   */
  ref?: Ref<T extends keyof JSX.IntrinsicElements ? HTMLElementFrom<T> : E>
} & Omit<AllHTMLAttributes<E>, "as">
