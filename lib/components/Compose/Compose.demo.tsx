import { Box } from "../Box/Box"
import { Button } from "../Button/Button"
import { Code } from "../../../src/components"
import { Compose } from "./Compose"
import { useDocumentation } from "../../hooks"

const example = `<Compose components={[Box, Button]}>
  Content of the compose
</Compose>`

export const ComposeDemo = () => {
  useDocumentation(
    {},
    () => example,
    "Compose the components. Useful for avoid the wrapper hell with more than a few providers."
  )

  return (
    <>
      <Compose components={[Box, Button]}>Content of the compose</Compose>
      <Code>{example}</Code>
    </>
  )
}
