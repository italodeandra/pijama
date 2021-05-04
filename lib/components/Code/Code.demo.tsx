import { Code } from "./Code"
import { useDocumentation } from "../../hooks"

export const CodeDemo = () => {
  const { children, icon, ...props } = useDocumentation(
    {
      children: {
        description: "The content of the code.",
        value: "<Code>The content of the code</Code>",
      },
      block: {
        description: "If the code is a block.",
        options: [true, false],
        value: false,
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
