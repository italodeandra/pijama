import { ComponentShorthandProps, withTheme } from "../../styles"
import React, { ElementType, forwardRef, ReactNode, useMemo, VFC } from "react"
import { css } from "@emotion/react"

export type BoxProps = {
  /**
   * Content of the box.
   */
  children?: ReactNode
} & ComponentShorthandProps

/**
 * Creates an element using the shorthand. It is a "div" by default.
 * Useful for making layout elements and add styles with the availability of the
 * shorthand.
 *
 * [Demo](https://pijama.majapi.com.br/components/Box)
 *
 * @example
 * <Box sh={{ mt: 1 }}>Box content</Box>
 */
export const Box: VFC<BoxProps> = forwardRef(
  ({ children, sh, as, ...props }, ref) => {
    const Component: ElementType = as || "div"
    const boxStyles = useMemo(
      () =>
        sh &&
        withTheme((theme, shorthand) =>
          css(typeof sh === "function" ? shorthand(sh(theme)) : shorthand(sh))
        ),
      [sh]
    )
    return (
      <Component css={boxStyles} {...props} ref={ref}>
        {children}
      </Component>
    )
  }
)
