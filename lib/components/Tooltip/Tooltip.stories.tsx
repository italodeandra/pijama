import { Meta, Story } from "@storybook/react"
import { Tooltip as TooltipComponent, TooltipProps } from "./Tooltip"

export default {
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  component: TooltipComponent,
  title: "Components/Tooltip",
} as Meta

const Template: Story<TooltipProps> = ({ children, ...args }) => (
  <TooltipComponent {...args}>{children}</TooltipComponent>
)

export const Tooltip = Template.bind({})
Tooltip.args = {
  children: <span>Hover me</span>,
  title: "This is a tooltip",
}
