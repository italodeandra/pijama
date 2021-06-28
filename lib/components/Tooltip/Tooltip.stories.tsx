import { Meta, Story } from "@storybook/react"
import { Tooltip as TooltipComponent, TooltipProps } from "./Tooltip"

const disableControl = {
  control: false,
}

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    children: disableControl,
    ref: hideControl,
  },
  component: TooltipComponent,
  title: "Components/Tooltip",
} as Meta

// noinspection RequiredAttributes
const Template: Story<TooltipProps> = (args) => <TooltipComponent {...args} />

export const Tooltip = Template.bind({})
Tooltip.args = {
  children: <span>Hover to show tooltip</span>,
  title: "This is the tooltip",
}
