import { ComponentShorthandProps, withTheme } from "../../styles"
import { css, keyframes } from "@emotion/react"
import { Box } from "../Box/Box"
import { VFC } from "react"

export type SkeletonProps = {
  /**
   * The skeleton height.
   *
   * @default 1.2em
   */
  height?: number | string
  /**
   * If the skeleton should be for a text.
   */
  text?: boolean
  /**
   * The skeleton width.
   */
  width?: number | string
} & ComponentShorthandProps

const pulse = keyframes({
  /* eslint-disable sort-keys */
  "0%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.4,
  },
  "100%": {
    opacity: 1,
  },
})

/**
 * Renders a skeleton for a component that is still loading.
 *
 * [Demo](https://pijama.majapi.com.br/components/Skeleton)
 *
 * @example
 * <Skeleton text />
 */
export const Skeleton: VFC<SkeletonProps> = ({
  as,
  height,
  text,
  width,
  ...props
}) => {
  const skeletonStyles = withTheme((theme, sh) => {
    let styles = []

    try {
      if (text) {
        const textStyles = css(
          sh({
            height: "auto",
            mb: 0,
            mt: 0,
            transform: "scale(1, 0.60)",
            transformOrigin: "0 60%",
            "&:empty:before": {
              content: "'\\00a0'",
            },
          })
        )
        styles.push(textStyles)
      }
    } catch (e) {}

    styles.unshift(
      sh({
        animation: `${pulse} 1.5s ease-in-out 0.5s infinite`,
        bgColor: theme.color.darkMode
          ? "rgba(255, 255, 255, 0.13)"
          : "rgba(0, 0, 0, 0.13)",
        br: 0.5,
        display: "block",
        height: height || "1.2em",
        width,
      })
    )
    return css(styles)
  })

  return <Box as={as || "span"} css={skeletonStyles} {...props} />
}
