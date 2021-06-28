/* istanbul ignore file */

import {
  alpha,
  buttonClasses,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from "@material-ui/core"
import { ButtonPropsVariantOverrides } from "@material-ui/core/Button/Button"
import { OverridableStringUnion } from "@material-ui/types"
import { VFC } from "react"

export interface ButtonProps extends MuiButtonProps {
  /**
   * If `true`, no elevation is used.
   * @default true
   */
  disableElevation?: boolean
  /**
   * The variant to use.
   * @default contained
   */
  variant?: OverridableStringUnion<
    "text" | "outlined" | "contained",
    ButtonPropsVariantOverrides
  >
}

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-button--button)
 *
 * ** Material UI**
 *
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [Button API](https://material-ui.com/api/button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
export const Button = styled<VFC<ButtonProps>>(
  ({
    disableElevation = true,
    focusRipple = false,
    variant = "contained",
    ...props
  }) => (
    <MuiButton
      disableElevation={disableElevation}
      focusRipple={focusRipple}
      variant={variant}
      {...props}
    />
  )
)(({ theme, color = "primary" }) => {
  const ringColor = alpha(theme.palette[color].main, 0.3)
  return {
    [`&.${buttonClasses.focusVisible}`]: {
      "&::after": {
        boxShadow: `0 0 0 3px ${ringColor}`,
      },
    },
    [`&.${buttonClasses.outlined}`]: {
      boxShadow:
        "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
    },
    "&::after": {
      borderRadius: "inherit",
      bottom: 0,
      content: '""',
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      transition: theme.transitions.create(["box-shadow"]),
    },
    fontWeight: 400,
    padding: "4px 10px",
    textTransform: "inherit",
  }
})
