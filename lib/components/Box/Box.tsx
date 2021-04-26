import {
  AllHTMLAttributes,
  ElementType,
  FC,
  ReactNode,
  forwardRef,
} from "react"
import { Theme, withTheme } from "../../styles"
import { CSSInterpolation } from "@emotion/serialize"
import { css } from "@emotion/react"

export type BoxProps = {
  /**
   * Change which HTML element or React component should be used instead of a div.
   * @default div
   */
  as?: ElementType
  /**
   * Content of the box.
   */
  children?: ReactNode
  /**
   * Styles shorthand.
   */
  sh?: CSSInterpolation | ((theme: Theme) => CSSInterpolation)
} & AllHTMLAttributes<HTMLElement>

export const Box: FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(
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
