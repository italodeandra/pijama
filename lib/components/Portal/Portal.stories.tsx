import { Meta, Story } from "@storybook/react"
import { Portal } from "./Portal"

export default {
  component: Portal,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        type: "code",
      },
    },
  },
  title: "Components/Portal",
} as Meta

const Template: Story = () => (
  <div>
    <Portal>This will be rendered outside of the div</Portal>
  </div>
)

export const PortalStory = Template.bind({})
PortalStory.storyName = "Portal"
