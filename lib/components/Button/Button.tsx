import { MouseEventHandler, ReactNode, VFC } from "react"
import Color from "color"
import { css } from "@emotion/react"
import { withTheme } from "../../styles"

export type ButtonProps = {
  /**
   * The label or content.
   */
  children: ReactNode
  /**
   * The color of the background when contained, color of the border when outlined, or color of the text.
   * @default primary
   */
  color?: "primary" | "secondary" | string
  /**
   * If should be shown with a square style for icons.
   */
  icon?: boolean
  /**
   * Click event handler.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>
  /**
   * Type of the button.
   * @default button
   */
  type?: "button" | "submit" | "reset"
  /**
   * The variant style.
   * @default contained
   */
  variant?: "contained" | "outlined" | "text"
}

export const Button: VFC<ButtonProps> = ({
  children,
  color = "primary",
  icon,
  type = "button",
  variant = "contained",
  ...props
}) => {
  const buttonStyles = withTheme((theme, sh) => {
    let styles = []

    try {
      const buttonColor = ["primary", "secondary"].includes(color)
        ? Color(theme.color[color])
        : Color(color)
      const isDark = Color(buttonColor).isDark()
      const contrastColor = isDark ? Color("white") : Color("black")

      if (variant === "contained") {
        const containedStyles = css(
          sh({
            "&:hover": {
              bgColor: (isDark
                ? buttonColor.lighten(0.1)
                : buttonColor.darken(0.1)
              ).hex(),
            },
            bgColor: buttonColor.hex(),
            color: contrastColor.hex(),
          })
        )
        styles.push(containedStyles)
      } else if (variant === "outlined") {
        const hoverColor = isDark
          ? buttonColor.darken(0.2)
          : buttonColor.lighten(0.2)
        const outlinedStyles = css(
          sh({
            "&::after": {
              border: "1px solid",
              borderColor: buttonColor.hex(),
            },
            "&:hover": {
              color: hoverColor.hex(),
            },
            "&:hover::after": {
              borderColor: hoverColor.hex(),
            },
            bgColor: "transparent",
            color: buttonColor.hex(),
          })
        )
        styles.push(outlinedStyles)
      } else {
        /* istanbul ignore next */
        if (variant === "text") {
          const hoverColor = isDark
            ? buttonColor.darken(0.2)
            : buttonColor.lighten(0.2)
          const textStyles = css(
            sh({
              "&:hover": {
                bgColor: buttonColor.alpha(0.1).rgb().toString(),
                color: hoverColor.hex(),
              },
              "&:hover::after": {
                borderColor: hoverColor.hex(),
              },
              bgColor: "transparent",
              color: buttonColor.hex(),
            })
          )
          styles.push(textStyles)
        }
      }

      if (icon) {
        const iconStyles = css(
          sh({
            fontSize: 24,
            lineHeight: 0,
            minH: 6,
            minW: 6,
            p: 0,
          })
        )
        styles.push(iconStyles)
      }

      styles.unshift({
        "&:focus::after": {
          boxShadow: `0 0 0 calc(1px + 2px) ${buttonColor.alpha(0.3).rgb()}`,
        },
      })
    } catch (e) {
      console.error(e)
    }

    styles.unshift(
      sh({
        "&::after": {
          br: "inherit",
          pos: 0,
          transition: "boxShadow",
        },
        border: "none",
        br: theme.spacing(0.5),
        fontFamily: theme.typography.fontFamily,
        fontSize: 13,
        fontWeight: 500,
        minH: 4,
        outline: "none",
        p: [1, 2],
        position: "relative",
        transition: "backgroundColor",
      })
    )
    return css(styles)
  })

  return (
    <button css={buttonStyles} type={type} {...props}>
      {children}
    </button>
  )
}
