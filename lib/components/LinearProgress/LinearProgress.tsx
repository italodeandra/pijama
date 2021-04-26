import { Box, BoxProps } from "../Box/Box"
import Color from "color"
import { VFC } from "react"
import { css } from "@emotion/react"
import { withTheme } from "../../styles"

export type LinearProgressProps = {
  /**
   * Current value of the progress (in %).
   * @default 0
   */
  value: number
} & Omit<BoxProps, "children">

const linearProgressStyles = withTheme((theme, sh) => {
  const primaryColor = Color(theme.color.primary)

  return css(
    sh({
      "& > div": {
        bgColor: primaryColor.hex(),
        height: "inherit",
        transition: "width",
      },
      bgColor: primaryColor.lighten(1).hex(),
      height: 0.5,
      width: "100%",
    })
  )
})

export const LinearProgress: VFC<LinearProgressProps> = ({
  value,
  ...props
}) => {
  value = value || 0 /* necessary for handling empty string values */
  value = value > 100 ? 100 : value /* max value */

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
