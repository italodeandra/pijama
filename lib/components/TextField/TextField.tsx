/* istanbul ignore file */

import * as React from "react"
import {
  alpha,
  formHelperTextClasses,
  inputBaseClasses,
  inputLabelClasses,
  TextField as MuiTextField,
  outlinedInputClasses,
  OutlinedTextFieldProps,
  styled,
} from "@material-ui/core"
import { forwardRef, VFC } from "react"
import { OverridableStringUnion } from "@material-ui/types"
import { TextFieldPropsSizeOverrides } from "@material-ui/core/TextField/TextField"

export interface TextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant" | "hiddenLabel"> {
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode
  /**
   * If `true`, the input will take up the full width of its container.
   * @default true
   */
  fullWidth?: boolean
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>
}

export const TextField = styled<VFC<TextFieldProps>>(
  forwardRef(({ fullWidth = true, ...props }, ref) => (
    <MuiTextField fullWidth={fullWidth} ref={ref} {...props} />
  ))
)(({ error, theme, color = "primary" }) => {
  const ringColor = alpha(theme.palette[error ? "error" : color].main, 0.3)
  return {
    [`& .${inputLabelClasses.outlined}`]: {
      fontSize: theme.typography.pxToRem(14),
      fontWeight: 500,
      marginBottom: theme.spacing(0.5),
      maxWidth: "100%",
      padding: 0,
      position: "relative",
      transform: "none",
    },
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
    [`& .${outlinedInputClasses.multiline}`]: {
      // fontSize: theme.typography.pxToRem(14),
      // padding: "10px 12px",
    },
  }
})
