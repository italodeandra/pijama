import { forwardRef, VFC } from "react";
import {
  default as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@material-ui/core/IconButton";
import { alpha } from "@material-ui/system/colorManipulator";
import { buttonClasses } from "@material-ui/core/Button";
import Gray from "../../styles/colors/Gray";
import { styled } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";

export interface IconButtonProps extends MuiIconButtonProps {
  /***
   * If the button is a link, this will be it's target.
   */
  target?: string;
  /**
   * If the button should show a loading state (indeterminate progress bar in the bottom).
   */
  loading?: boolean;
}

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
const IconButton = styled<VFC<IconButtonProps>>(
  forwardRef(
    (
      {
        centerRipple = false,
        focusRipple = false,
        children,
        loading,
        ...props
      },
      ref
    ) => (
      <MuiIconButton
        centerRipple={centerRipple}
        focusRipple={focusRipple}
        ref={ref}
        {...props}
      >
        {children}
        <Fade in={loading} mountOnEnter unmountOnExit>
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
      </MuiIconButton>
    )
  )
)(({ theme, color = "primary" }) => {
  const mainColor = theme.palette[color]?.main;
  const ringColor = alpha(mainColor || Gray.N500, 0.3);
  return {
    [`&.${buttonClasses.focusVisible}`]: {
      "&::after": {
        boxShadow: `0 0 0 3px ${ringColor}`,
      },
    },
    [`&.${buttonClasses.outlined}`]: {
      boxShadow: theme.shadows[1],
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
  };
});

export default IconButton;
