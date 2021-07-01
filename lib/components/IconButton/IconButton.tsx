import {
  alpha,
  buttonClasses,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  styled,
} from "@material-ui/core"
import { forwardRef, VFC } from "react"
import { Gray } from "../../styles"

export interface IconButtonProps extends MuiIconButtonProps {}

// noinspection RequiredAttributes
/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 * This one is to be specifically used with icons.
 *
 * [Demo](https://pijama.majapi.com/?path=/story/components-iconbutton--icon-button)
 *
 * ** Material UI**
 *
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [IconButton API](https://material-ui.com/api/icon-button/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
export const IconButton = styled<VFC<IconButtonProps>>(
  forwardRef(({ centerRipple = false, focusRipple = false, ...props }, ref) => (
    <MuiIconButton
      centerRipple={centerRipple}
      focusRipple={focusRipple}
      ref={ref}
      {...props}
    />
  ))
)(({ theme, color = "primary" }) => {
  const mainColor = theme.palette[color]?.main
  const ringColor = alpha(mainColor || Gray.N500, 0.3)
  return {
    [`&.${buttonClasses.focusVisible}`]: {
      "&::after": {
        boxShadow: `0 0 0 3px ${ringColor}`,
      },
    },
    [`&.${buttonClasses.outlined}`]: {
      boxShadow: (theme) => theme.shadows[1],
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
    borderRadius: 4,
    fontWeight: 400,
  }
})
