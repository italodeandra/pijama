import { ComponentShorthandProps, Gray } from "../../styles"
import { ReactNode, VFC } from "react"
import { Box } from "../Box/Box"

export type CodeProps = {
  /**
   * If the code is a block.
   */
  block?: boolean
  /**
   * The content of the code.
   */
  children?: ReactNode
} & ComponentShorthandProps

export const Code: VFC<CodeProps> = ({ block, children, sh, ...props }) => (
  <Box
    as={block ? "pre" : "code"}
    sh={(theme) => ({
      "& pre": {
        backgroundColor: "transparent !important",
        m: "0px !important",
        p: "0px !important",
      },
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
    {...props}
  >
    {children}
  </Box>
)
