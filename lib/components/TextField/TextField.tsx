/* istanbul ignore file */

import { forwardRef, ReactNode, VFC } from "react";
import {
  default as MuiTextField,
  OutlinedTextFieldProps,
  TextFieldPropsSizeOverrides,
} from "@material-ui/core/TextField";
import { alpha } from "@material-ui/system/colorManipulator";
import { formHelperTextClasses } from "@material-ui/core/FormHelperText";
import { inputBaseClasses } from "@material-ui/core/InputBase";
import { inputLabelClasses } from "@material-ui/core/InputLabel";
import { outlinedInputClasses } from "@material-ui/core/OutlinedInput";
import type { OverridableStringUnion } from "@material-ui/types";
import { styled, Theme, CSSObject } from "@material-ui/core/styles";
import {
  default as MuiFormLabel,
  FormLabelProps,
} from "@material-ui/core/FormLabel";
import { inputAdornmentClasses } from "@material-ui/core/InputAdornment";

const inputLabelStyles = (theme: Theme): CSSObject => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  maxWidth: "100%",
  padding: 0,
  position: "relative",
  transform: "none",
});

export interface TextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant" | "hiddenLabel"> {
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: ReactNode;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<
    "small" | "medium",
    TextFieldPropsSizeOverrides
  >;
}

/**
 * Let users enter and edit text.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-textfield--text-field)
 *
 * ** Material UI**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [TextField API](https://material-ui.com/api/text-field/)
 * - inherits [FormControl API](https://material-ui.com/api/form-control/)
 */
const TextField = styled<VFC<TextFieldProps>>(
  forwardRef(({ fullWidth = true, ...props }, ref) => (
    <MuiTextField fullWidth={fullWidth} inputRef={ref} {...props} />
  ))
)(({ error, theme, color = "primary" }) => {
  const ringColor = alpha(theme.palette[error ? "error" : color].main, 0.3);
  return {
    [`& .${inputLabelClasses.outlined}`]: inputLabelStyles(theme),
    [`& .${inputLabelClasses.sizeSmall}`]: {
      fontSize: theme.typography.pxToRem(12),
    },
    [`& .${outlinedInputClasses.root}`]: {
      [`&.${outlinedInputClasses.focused}`]: {
        "&::after": {
          boxShadow: `0 0 0 3px ${ringColor}`,
        },
      },
      "&::after": {
        borderRadius: "inherit",
        bottom: 0,
        content: '""',
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        right: 0,
        top: 0,
        transition: theme.transitions.create(["box-shadow"]),
      },
      boxShadow:
        "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
      padding: 0,
    },
    [`& .${outlinedInputClasses.notchedOutline} legend`]: {
      maxWidth: "0.01px",
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      transition: theme.transitions.create(["border"]),
    },
    [`& .${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderWidth: "1px !important",
      },
    [`& .${formHelperTextClasses.root}`]: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: theme.spacing(0.5),
    },
    [`& .${outlinedInputClasses.input}`]: {
      "&::placeholder": {
        opacity: 0,
      },
      "&:focus::placeholder": {
        opacity: 0.5,
      },
      fontSize: theme.typography.pxToRem(14),
      padding: "10px 12px",
    },
    [`& .${inputBaseClasses.inputSizeSmall}`]: {
      padding: "6px 8px",
    },
    [`& .${inputAdornmentClasses.positionEnd}`]: {
      marginRight: "6px",
    },
  };
});

export default TextField;

export type { FormLabelProps };

export const FormLabel = styled<VFC<FormLabelProps>>(MuiFormLabel)(
  ({ theme }) => inputLabelStyles(theme)
);
