import { Box } from "../Box/Box"
import { Fade } from "./Fade"
import { Gray } from "../../styles"
import { useDocumentation } from "../../hooks"

export const FadeDemo = () => {
  const { in: inProp, ...props } = useDocumentation(
    {
      /* eslint-disable sort-keys */
      in: {
        description: "If the content should be un-faded.",
        options: [true, false],
        value: true,
      },
      onEnter: {
        description: "Enter event handler.",
        readOnly: true,
        value: "EnterHandler<HTMLDivElement>",
      },
      onEntering: {
        description: "Entering event handler.",
        readOnly: true,
        value: "EnterHandler<HTMLDivElement>",
      },
      onEntered: {
        description: "Entered event handler.",
        readOnly: true,
        value: "EnterHandler<HTMLDivElement>",
      },
      onExit: {
        description: "Exit event handler.",
        readOnly: true,
        value: "ExitHandler<HTMLDivElement>",
      },
      onExiting: {
        description: "Exiting event handler.",
        readOnly: true,
        value: "ExitHandler<HTMLDivElement>",
      },
      onExited: {
        description: "Exited event handler.",
        readOnly: true,
        value: "ExitHandler<HTMLDivElement>",
      },
    },
    ({ in: inProp }) => `<Fade in={${inProp ? "true" : "false"}}>
  <Box sh={{ bgColor: Gray.N100 }}>
    The content should be here
  </Box>
</Fade>`
  )

  return (
    <Fade {...props} in={inProp}>
      <Box sh={{ bgColor: Gray.N100 }}>
        This is a text. Change the property "in" for it to be faded/un-faded.
      </Box>
    </Fade>
  )
}
