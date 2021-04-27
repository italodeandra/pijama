import { ComponentShorthandProps, withTheme } from "../../styles"
import React, { ElementType, forwardRef, ReactNode, VFC } from "react"
import { css } from "@emotion/react"

export type BoxProps = {
  /**
   * Content of the box.
   */
  children?: ReactNode
} & ComponentShorthandProps

export const Box: VFC<BoxProps> = forwardRef(
  ({ children, sh, as, ...props }, ref) => {
    const Component: ElementType = as || "div"
    const boxStyles =
      sh &&
      withTheme((theme, shorthand) =>
        css(typeof sh === "function" ? shorthand(sh(theme)) : shorthand(sh))
      )
    return (
      <Component css={boxStyles} {...props} ref={ref}>
        {children}
      </Component>
    )
  }
)
