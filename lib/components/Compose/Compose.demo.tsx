import { Box } from "../Box/Box"
import { Button } from "../Button/Button"
import { Code } from "../Code/Code"
import { Compose } from "./Compose"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { useDocumentation } from "../../hooks"

const example = `<Compose components={[Box, Button]}>
  Content of the compose
</Compose>`

// noinspection JSUnusedGlobalSymbols
export const ComposeDemo = () => {
  useDocumentation(
    {},
    () => example,
    "Compose the components. Useful for avoid the wrapper hell with more than a few providers."
  )

  return (
    <>
      <Compose components={[Box, Button]}>Content of the compose</Compose>
      <Code block sh={{ mt: 2 }}>
        <SyntaxHighlighter language="jsx">{example}</SyntaxHighlighter>
      </Code>
    </>
  )
}
