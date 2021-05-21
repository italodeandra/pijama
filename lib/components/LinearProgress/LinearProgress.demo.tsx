import { Box } from "../Box/Box"
import { LinearProgress } from "./LinearProgress"
import { useDocumentation } from "../../hooks"

export const LinearProgressDemo = () => {
  const { value, ...props } = useDocumentation(
    {
      /* eslint-disable sort-keys */
      value: {
        description: "Current value of the progress (in %).",
        value: 30,
      },
      transitionDuration: {
        description:
          "Custom duration of the progress animation in milliseconds.",
        value: undefined,
      },
    },
    ({ transitionDuration, value }) => `<LinearProgress
  value={${value}}${
      transitionDuration
        ? `
  transitionDuration={${transitionDuration}}`
        : ""
    }
/>`
  )

  return (
    <Box sh={(theme) => ({ width: `calc(100% - ${theme.spacing(32)})` })}>
      <LinearProgress value={value} {...props} />
    </Box>
  )
}
