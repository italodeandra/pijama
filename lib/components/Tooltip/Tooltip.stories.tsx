import { Meta, Story } from "@storybook/react"
import { Box } from "../Box/Box"
import { Tooltip } from "./Tooltip"

export default {
  component: Tooltip,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        type: "code",
      },
    },
  },
  title: "Components/Tooltip",
} as Meta

const Template: Story = () => (
  <Box sh={{ display: "flex", height: "calc(100vh - 40px)" }}>
    <Tooltip title={"This is the tooltip"}>
      <Box sh={{ mb: "auto" }}>Hover me</Box>
    </Tooltip>
    <Tooltip title={"This is the tooltip"}>
      <Box sh={{ ml: "auto", mt: "auto" }}>Hover me</Box>
    </Tooltip>
  </Box>
)

export const TooltipStory = Template.bind({})
TooltipStory.storyName = "Tooltip"
