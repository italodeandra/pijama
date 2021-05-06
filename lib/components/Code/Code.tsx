import { Gray, Theme } from "../../styles"
import { ReactNode, VFC } from "react"
import { Box } from "../Box/Box"
import { CSSInterpolation } from "@emotion/serialize"

export const Code: VFC<{
  /**
   * If the code is a block.
   */
  block?: boolean
  /**
   * The content of the code.
   */
  children?: ReactNode
  /**
   * Styles shorthand.
   */
  sh?: CSSInterpolation | ((theme: Theme) => CSSInterpolation)
}> = ({ block, children, sh }) => (
  <Box
    as={block ? "pre" : "code"}
    sh={(theme) => ({
      bgColor: Gray.N100,
      br: 0.5,
      color: Gray.N600,
      display: block ? "block" : "inline-block",
      m: 0,
      mt: block ? 0 : "-2px",
      p: block ? 2 : [0.25, 0.5],
      ...(typeof sh === "function"
        ? sh(theme)
        : typeof sh === "object"
        ? (sh as {})
        : {}),
    })}
  >
    {children}
  </Box>
)
