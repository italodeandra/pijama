import {
  ChangeEventHandler,
  FocusEventHandler,
  VFC,
  forwardRef,
  useState,
} from "react"
import Color from "color"
import { css } from "@emotion/react"
import { useUpdateEffect } from "react-use"
import { withTheme } from "../../styles"

export type TextFieldProps = {
  /**
   * The color of the highlight when focused.
   * @default primary
   */
  color?: "primary" | "secondary" | string
  /**
   * The default value of the input.
   */
  defaultValue?: unknown
  /**
   * If should show error color.
   */
  error?: boolean
  /**
   * Text to be shown above the input.
   */
  helperText?: string
  /**
   * ID of the input that will be used for linking with the label.
   * If empty it will be used the name or label text.
   */
  id?: string
  /**
   * Label on top of the field.
   */
  label?: string
  /**
   * Name on the input.
   */
  name?: string
  /**
   * Blur event handler.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>
  /**
   * Change event handler.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /**
   * Focus event handler.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>
  /**
   * Type of the input.
   * @default text
   */
  type?: "text" | "tel" | "email" | "password"
  /**
   * The value of the input.
   */
  value?: unknown
}

export const TextField: VFC<TextFieldProps> = forwardRef<
  HTMLInputElement,
  TextFieldProps
>(
  (
    {
      color,
      error,
      helperText,
      id,
      label,
      name,
      type,
      defaultValue = "",
      onBlur,
      onChange,
      onFocus,
      value = "",
      ...props
    },
    ref
  ) => {
    id = id || name || label

    const [isFocused, setFocused] = useState(false)
    const [innerValue, setInnerValue] = useState(value || defaultValue)

    const textFieldStyles = withTheme((theme, sh) => {
      let styles = []

      try {
        const labelColor = Color(theme.color.textPrimary)
        const focusColor = ["primary", "secondary"].includes(color)
          ? Color(theme.color[color])
          : Color(color)

        if (error) {
          const errorColor = Color(theme.color.error)
          const errorStyled = css({
            "& > input": {
              /* eslint-disable sort-keys */
              "&:hover": {
                borderColor: errorColor.darken(0.2).hex(),
              },
              "&:focus": {
                borderColor: errorColor.hex(),
                boxShadow: `0 0 0 calc(1px + 2px) ${errorColor
                  .alpha(0.3)
                  .rgb()}`,
              },
              borderColor: errorColor.hex(),
            },
            color: errorColor.hex(),
          })
          styles.push(errorStyled)
        } else if (isFocused) {
          const focusedStyled = css({
            "& > label": {
              color: focusColor.hex(),
            },
          })
          styles.push(focusedStyled)
        }

        styles.unshift({
          "& > input": {
            /* eslint-disable sort-keys */
            "&:hover": {
              borderColor: labelColor.lighten(1).hex(),
            },
            "&:focus": {
              borderColor: focusColor.hex(),
              boxShadow: `0 0 0 calc(1px + 2px) ${focusColor.alpha(0.3).rgb()}`,
            },
            borderColor: labelColor.lighten(1.6).hex(),
          },
          color: labelColor.hex(),
        })
      } catch (e) {
        console.error(e)
      }
      styles.unshift(
        sh({
          "& > input": {
            border: "1px solid",
            borderRadius: theme.spacing(0.5),
            boxShadow:
              "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
            boxSizing: "border-box",
            display: "block",
            fontFamily: theme.typography.fontFamily,
            fontSize: 13,
            outline: "none",
            padding: 1,
            transition: ["boxShadow", "borderColor"],
            width: "100%",
          },
          "& > label": {
            display: "block",
            fontFamily: theme.typography.fontFamily,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 0.5,
            transition: "color",
          },
          "& > span": {
            display: "block",
            fontFamily: theme.typography.fontFamily,
            fontSize: 12,
            marginTop: 0.5,
            transition: "color",
          },
          pt: "3px",
          width: 20,
        })
      )
      return css(styles)
    })

    useUpdateEffect(() => {
      setInnerValue(value)
    }, [value])

    return (
      <div css={textFieldStyles}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          name={name}
          onBlur={(e) => {
            onBlur && onBlur(e)
            setFocused(false)
          }}
          onChange={(e) => {
            onChange && onChange(e)
            setInnerValue(e.target.value)
          }}
          onFocus={(e) => {
            onFocus && onFocus(e)
            setFocused(true)
          }}
          ref={ref}
          type={type}
          value={innerValue.toString()}
          {...props}
        />
        {helperText && <span>{helperText}</span>}
      </div>
    )
  }
)
