/* istanbul ignore file */

import { forwardRef, VFC } from "react";
import type { AppBarPropsColorOverrides } from "@material-ui/core/AppBar";
import {
  default as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@material-ui/core/AppBar";
import type { OverridableStringUnion } from "@material-ui/types";
import type { PropTypes } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export interface AppBarProps extends MuiAppBarProps {
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 0
   */
  elevation?: number;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default default
   */
  color?: OverridableStringUnion<
    PropTypes.Color | "transparent",
    AppBarPropsColorOverrides
  >;
  /**
   * If `true`, rounded corners are disabled.
   * @default true
   */
  square?: boolean;
}

/**
 * The top App Bar provides content and actions related to the current screen. It’s used for branding, screen titles, navigation, and actions.
 *
 * It can transform into a contextual action bar or be used as a navbar.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-appbar--app-bar)
 *
 * **Material UI:**
 *
 * Demos:
 *
 * - [App Bar](https://material-ui.com/components/app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://material-ui.com/api/app-bar/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
const AppBar = styled<VFC<AppBarProps>>(
  forwardRef(
    ({ elevation = 0, color = "default", square = true, ...props }, ref) => (
      <MuiAppBar
        color={color}
        elevation={elevation}
        ref={ref}
        square={square}
        {...props}
      />
    )
  )
)(({ theme, color = "default" }) => ({
  backdropFilter: color === "default" ? "saturate(180%) blur(5px)" : undefined,
  backgroundColor: color === "default" ? "rgba(255, 255, 255, 0.5)" : undefined,
  color: theme.palette.text.primary,
  display: "flex",
}));

export default AppBar;
