import {
  AllHTMLAttributes,
  ComponentProps,
  ElementType,
  FC,
  ReactNode,
  VFC,
  forwardRef,
} from "react"
import { Theme, withTheme } from "../../styles"
import { CSSInterpolation } from "@emotion/serialize"
import { css } from "@emotion/react"

export type BoxProps<T = ElementType> = {
  /**
   * Change which HTML element or React component should be.
   * @default div
   */
  as?: T
  /**
   * Content of the box.
   */
  children?: ReactNode
  /**
   * Styles shorthand.
   */
  sh?: CSSInterpolation | ((theme: Theme) => CSSInterpolation)
} & (T extends VFC ? ComponentProps<T> : AllHTMLAttributes<HTMLElement>)

export const Box: FC<BoxProps> = forwardRef<HTMLElement, BoxProps>(
  ({ children, sh, as: Component = "div", ...props }, ref) => {
    const boxStyles =
      sh &&
      withTheme((theme, shorthand) =>
        css(typeof sh === "function" ? shorthand(sh(theme)) : shorthand(sh))
      )
    return (
      <Component css={boxStyles} ref={ref} {...props}>
        {children}
      </Component>
    )
  }
)
