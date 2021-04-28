import { ComponentShorthandProps, withTheme } from "../../styles"
import { Box } from "../Box/Box"
import Color from "color"
import { css } from "@emotion/react"
import { VFC } from "react"

export type LinearProgressProps = {
  /**
   * Current value of the progress (in %).
   * @default 0
   */
  value: number
  /**
   * Custom duration of the progress animation in milliseconds.
   */
  transitionDuration?: number
} & ComponentShorthandProps

export const LinearProgress: VFC<LinearProgressProps> = ({
  value,
  transitionDuration,
  ...props
}) => {
  value = value || 0 /* necessary for handling empty string values */
  value = value > 100 ? 100 : value /* max value */

  const linearProgressStyles = withTheme((theme, sh) => {
    const primaryColor = Color(theme.color.primary)

    return css(
      sh({
        "& > div": {
          bgColor: primaryColor.hex(),
          height: "inherit",
          transition: "width",
          transitionDuration:
            transitionDuration !== undefined ? `${transitionDuration}ms` : "",
        },
        bgColor: primaryColor.lighten(1).hex(),
        height: 0.5,
        width: "100%",
      })
    )
  })

  return (
    <Box css={linearProgressStyles} {...props}>
      <div
        data-testid="bar"
        style={{
          width: `${value}%`,
        }}
      />
    </Box>
  )
}
