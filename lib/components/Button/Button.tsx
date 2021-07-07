/* istanbul ignore file */

import {
  buttonClasses,
  ButtonPropsVariantOverrides,
  default as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";
import { forwardRef, VFC } from "react";
import type { OverridableStringUnion } from "@material-ui/types";
import { styled } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";

export interface ButtonProps extends MuiButtonProps {
  /**
   * If `true`, no elevation is used.
   * @default true
   */
  disableElevation?: boolean;
  /**
   * The variant to use.
   * @default contained
   */
  variant?: OverridableStringUnion<
    "text" | "outlined" | "contained",
    ButtonPropsVariantOverrides
  >;
  /**
   * If the button should show a loading state (indeterminate progress bar in the bottom).
   */
  loading?: boolean;
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
const Button = styled<VFC<ButtonProps>>(
  forwardRef(
    (
      {
        disableElevation = true,
        focusRipple = false,
        variant = "contained",
        loading,
        children,
        ...props
      },
      ref
    ) => (
      <MuiButton
        disableElevation={disableElevation}
        focusRipple={focusRipple}
        ref={ref}
        variant={variant}
        {...props}
      >
        {children}
        <Fade in={loading}>
          <LinearProgress
            variant={"indeterminate"}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: (theme) =>
                `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
              height: 4,
            }}
          />
        </Fade>
      </MuiButton>
    )
  )
)(({ theme, color = "primary" }) => {
  const ringColor = theme.palette[color]?.main || "currentColor";
  const ringShadow = (size: number) => `0 0 0 ${size}px ${ringColor}`;
  return {
    [`&:focus`]: {
      "&::after": {
        boxShadow: ringShadow(3),
      },
      [`&.${buttonClasses.outlined}`]: {
        "&::after": {
          boxShadow: ringShadow(4),
        },
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
      opacity: 0.3,
      color: "inherit",
      transition: theme.transitions.create(["box-shadow"]),
    },
    fontWeight: 500,
    padding: [0.5, 1.25],
    textTransform: "inherit",
  };
});

export default Button;
