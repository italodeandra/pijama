import { ComponentShorthandProps, Gray, withTheme } from "../../styles"
import { ReactNode, VFC } from "react"
import { Box } from "../Box/Box"
import Color from "color"
import { css } from "@emotion/react"

export type MenuItemProps = {
  /**
   * Content of the menu item.
   */
  children?: ReactNode
} & ComponentShorthandProps

const menuItemHoverColor = Color(Gray.N100)

const menuItemStyles = withTheme((theme, sh) =>
  css(
    sh({
      /* eslint-disable sort-keys */
      "&:hover": {
        bgColor: menuItemHoverColor.hex(),
      },
      "&:focus": {
        bgColor: menuItemHoverColor.darken(0.05).hex(),
      },
      border: "none",
      cursor: "default",
      display: "block",
      fontFamily: theme.typography.fontFamily,
      outline: "none",
      p: [1, 2],
      position: "relative",
      textDecoration: "none",
    })
  )
)

export const MenuItem: VFC<MenuItemProps> = ({ children, ...props }) => (
  <Box css={menuItemStyles} tabIndex={1} {...props}>
    {children}
  </Box>
)
