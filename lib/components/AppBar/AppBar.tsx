/* istanbul ignore file */

import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  PropTypes,
  styled,
} from "@material-ui/core"
import { AppBarPropsColorOverrides } from "@material-ui/core/AppBar/AppBar"
import { OverridableStringUnion } from "@material-ui/types"
import { VFC } from "react"

export interface AppBarProps extends MuiAppBarProps {
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 0
   */
  elevation?: number
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default default
   */
  color?: OverridableStringUnion<
    PropTypes.Color | "transparent",
    AppBarPropsColorOverrides
  >
  /**
   * If `true`, rounded corners are disabled.
   * @default true
   */
  square?: boolean
}

export const AppBar = styled<VFC<AppBarProps>>(
  ({ elevation = 0, color = "default", square = true, ...props }) => (
    <MuiAppBar color={color} elevation={elevation} square={square} {...props} />
  )
)(({ theme, color }) => ({
  backdropFilter: color === "default" ? "saturate(180%) blur(5px)" : undefined,
  backgroundColor: color === "default" ? "rgba(255, 255, 255, 0.5)" : undefined,
  color: theme.palette.text.primary,
  display: "flex",
}))
