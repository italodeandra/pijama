import { Tooltip } from "./Tooltip"
import { useDocumentation } from "../../hooks"
import { Box } from "../Box/Box"

// noinspection JSUnusedGlobalSymbols
export const TooltipDemo = () => {
  useDocumentation(
    {},
    () => `<Tooltip title="This is the tooltip">
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
      <Tooltip title={"This is the tooltip"}>
        <Box sh={{ mb: "auto" }}>Hover me</Box>
      </Tooltip>
      <Tooltip title={"This is the tooltip"}>
        <Box sh={{ ml: "auto", mt: "auto" }}>Hover me</Box>
      </Tooltip>
    </Box>
  )
}
