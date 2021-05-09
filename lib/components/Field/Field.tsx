import {
  ChangeEvent,
  ElementType,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  useState,
  VFC,
} from "react"
import { Theme, ThemeColors, withTheme } from "../../styles"
import { Box } from "../Box/Box"
import chevronDown from "@iconify/icons-heroicons-outline/chevron-down"
import Color from "color"
import { css } from "@emotion/react"
import { CSSInterpolation } from "@emotion/serialize"
import Icon from "@iconify/react"
import { useUpdateEffect } from "react-use"

export type FieldProps<V = unknown, E = HTMLInputElement> = {
  /**
   * Change which HTML element or React component the field should be.
   * @default div
   */
  as?: ElementType
  /**
   * The color of the highlight when focused.
   * @default primary
   */
  color?: ThemeColors | string
  /**
   * The default value of the input.
   */
  defaultValue?: V
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
  label?: ReactNode
  /**
   * Name on the input.
   */
  name?: string
  /**
   * Change value event handler.
   */
  onChangeValue?: (value: V, event: ChangeEvent<E>) => void
  /**
   * Placeholder of the input.
   */
  placeholder?: string
  /**
   * Styles shorthand.
   */
  sh?: CSSInterpolation | ((theme: Theme) => CSSInterpolation)
  /**
   * Type of the input.
   * @default text
   */
  type?: "text" | "tel" | "email" | "password" | "select"
  /**
   * The value of the input.
   */
  value?: V
  /**
   * Element ref.
   */
  ref?: Ref<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

export const Field: VFC<FieldProps> = forwardRef(
  (
    {
      autoComplete = "new-password",
      as = "div",
      color = "primary",
      disabled,
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
      onChangeValue,
      readOnly,
      required,
      value = "",
      sh,
      ...props
    },
    ref
  ) => {
    id =
      id || name || (typeof label === "string" ? (label as string) : undefined)

    const [isFocused, setFocused] = useState(false)
    const [innerValue, setInnerValue] = useState(value || defaultValue)

    const fieldStyles = withTheme((theme, sh) => {
      let styles = []

      try {
        const labelColor = Color(theme.color.textPrimary)
        const focusColor = ["primary", "secondary"].includes(color)
          ? Color(theme.color[color])
          : Color(color)

        if (error) {
          const errorColor = Color(theme.color.error)
          const errorStyled = css({
            "& > div > input, & > div > select": {
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
          "& > div > input, & > div > select": {
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
          "& > div > input, & > div > select": {
            appearance: "none",
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
        })
      )
      return css(styles)
    })

    useUpdateEffect(() => {
      setInnerValue(value)
    }, [value])

    const InputComponent: any = type !== "select" ? "input" : "select"

    return (
      <Box as={as} css={fieldStyles} sh={sh}>
        {label && (
          <label htmlFor={id}>
            {label}
            {required ? " *" : ""}
          </label>
        )}
        <Box sh={{ position: "relative" }}>
          <InputComponent
            autoComplete={autoComplete}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={(e) => {
              onBlur && onBlur(e)
              setFocused(false)
            }}
            onChange={(e) => {
              onChange && onChange(e)
              onChangeValue && onChangeValue(e.target.value, e)
              setInnerValue(e.target.value)
            }}
            onFocus={(e) => {
              onFocus && onFocus(e)
              setFocused(true)
            }}
            readOnly={readOnly}
            required={required}
            type={type !== "select" ? type : undefined}
            value={innerValue.toString()}
            {...props}
            ref={ref}
          />
          {type === "select" ? (
            <Box
              as="span"
              sh={{ pos: ["9px", "9px", "", ""], pointerEvents: "none" }}
            >
              <Icon icon={chevronDown} />
            </Box>
          ) : null}
        </Box>
        {helperText && <span>{helperText}</span>}
      </Box>
    )
  }
)
