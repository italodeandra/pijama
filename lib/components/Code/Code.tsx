import { Box } from "../Box/Box"
import { ReactNode, VFC } from "react"
import { Gray } from "../../styles"

export const Code: VFC<{
  /**
   * If the code is a block.
   */
  block?: boolean
  /**
   * The content of the code.
   */
  children?: ReactNode
}> = ({ block, children }) => (
  <Box
    as={block ? "pre" : "code"}
    sh={{
      bgColor: Gray.N100,
      br: 0.5,
      color: Gray.N600,
      display: block ? "block" : "inline-block",
      m: 0,
      mt: block ? 0 : "-2px",
      p: block ? 2 : [0.25, 0.5],
    }}
  >
    {children}
  </Box>
)
