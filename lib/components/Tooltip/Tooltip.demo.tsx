import { Box } from "../Box/Box"
import { Tooltip } from "./Tooltip"
import { useDocumentation } from "../../hooks"

export const TooltipDemo = () => {
  const props = useDocumentation(
    {
      placement: {
        description: "Placement of the tooltip.",
        options: ["bottom", "top"],
        value: "bottom",
      },
      title: {
        description: "Content of the tooltip.",
        value: "This is the tooltip",
      },
    },
    ({ placement, title }) => `<Tooltip${
      placement !== "bottom" ? ` placement="${placement}"` : ""
    } title="${title}">
  <span>Hover me</span>
</Tooltip>`
  )

  return (
    <Box
      sh={(theme) => ({
        display: "flex",
        height: `calc(100vh - ${theme.spacing(12)})`,
      })}
    >
      <Tooltip {...props}>
        <Box sh={{ mb: "auto" }}>Hover me</Box>
      </Tooltip>
      <Tooltip {...props}>
        <Box sh={{ ml: "auto", mt: "auto" }}>Hover me</Box>
      </Tooltip>
    </Box>
  )
}
