import { Box } from "../Box/Box"
import { Collapse } from "./Collapse"
import { Gray } from "../../styles"
import { useDocumentation } from "../../hooks"

export const CollapseDemo = () => {
  const { in: inProp, ...props } = useDocumentation(
    {
      in: {
        description: "If the content should be collapsed.",
        options: [true, false],
        value: true,
      },
    },
    () => `<Collapse in={true}>
  <Box sh={{ bgColor: Gray.N100 }}>
    This is a text. Change the property "in" for it to be collapsed/un-collapsed.
  </Box>
</Collapse>`
  )

  return (
    <Collapse {...props} in={inProp}>
      <Box sh={{ bgColor: Gray.N100 }}>
        This is a text. Change the property "in" for it to be
        collapsed/un-collapsed.
      </Box>
    </Collapse>
  )
}
