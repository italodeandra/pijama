import { ComponentShorthandProps, withTheme } from "../../styles"
import { css, keyframes } from "@emotion/react"
import { Box } from "../Box/Box"
import { VFC } from "react"

export type SkeletonProps = {
  height?: number | string
  text?: boolean
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

export const Skeleton: VFC<SkeletonProps> = ({
  as,
  height,
  sh,
  text,
  width,
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

  return <Box as={as || "span"} css={skeletonStyles} sh={sh} />
}
