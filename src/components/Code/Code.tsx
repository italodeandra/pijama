import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula"
import { FC } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export const Code: FC = ({ children }) => (
  <SyntaxHighlighter language="jsx" style={darcula}>
    {children}
  </SyntaxHighlighter>
)
