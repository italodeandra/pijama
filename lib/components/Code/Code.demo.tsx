import { Code } from "./Code"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const CodeDemo = () => {
  const { children, icon, ...props } = useDocumentation(
    {
      block: {
        description: "If the code is a block.",
        options: [true, false],
        value: false,
      },
      children: {
        description: "The content of the code.",
        value: "<Code>The content of the code</Code>",
      },
    },
    ({ children, block }) => `<Code${block ? ` block` : ""}>
  {\`${children}\`}
</Code>`
  )

  return (
    <>
      Example of <Code {...props}>{children}</Code>
    </>
  )
}
