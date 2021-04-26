import { AnchorHTMLAttributes, ReactElement, VFC, forwardRef } from "react"
import { ThemeColors, withTheme } from "../../styles"
import Color from "color"
import { css } from "@emotion/react"

export type LinkProps = {
  /**
   * Content of the link.
   */
  children: ReactElement | string
  /**
   * The color of the link.
   * @default primary
   */
  color?: "inherit" | ThemeColors | string
  /**
   * URL of the link.
   */
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">

export const Link: VFC<LinkProps> = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, color = "primary", href, ...props }, ref) => {
    const linkStyles = withTheme((theme, sh) => {
      let styles = []

      try {
        if (color === "inherit") {
          styles.push({
            "&:focus, &:hover": {
              textDecoration: "underline",
            },
            color: "inherit",
          })
        } else {
          const linkColor = !!theme.color[color]
            ? Color(theme.color[color])
            : Color(color)
          const isDark = Color(linkColor).isDark()
          const hoverColor = isDark
            ? linkColor.darken(0.2)
            : linkColor.lighten(0.2)
          const focusColor = isDark
            ? linkColor.darken(0.4)
            : linkColor.lighten(0.4)

          styles.push({
            "&:focus": {
              color: focusColor.hex(),
            },
            "&:hover": {
              color: hoverColor.hex(),
            },
            color: linkColor.hex(),
          })
        }
      } catch (e) {
        console.error(e)
      }

      styles.unshift(
        sh({
          textDecoration: "none",
        })
      )

      return css(styles)
    })

    return (
      <a css={linkStyles} href={href} {...props} ref={ref}>
        {children}
      </a>
    )
  }
)
