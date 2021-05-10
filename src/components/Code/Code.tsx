import { Box } from "../../../lib"
import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula"
import { FC } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export const Code: FC = ({ children }) => (
  <Box
    as={SyntaxHighlighter}
    language="jsx"
    sh={{
      br: 0.5,
    }}
    style={darcula}
  >
    {children}
  </Box>
)
