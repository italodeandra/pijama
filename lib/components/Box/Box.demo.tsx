import { Box } from "./Box"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const BoxDemo = () => {
  const { children } = useDocumentation(
    {
      children: {
        description: "Content of the box.",
        value: "Box content",
      },
    },
    ({ children }) => `<Box>${children}</Box>`
  )

  return <Box>{children}</Box>
}
