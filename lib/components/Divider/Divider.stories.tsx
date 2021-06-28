import { Divider as DividerComponent, DividerProps } from "./Divider"
import { Meta, Story } from "@storybook/react"

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    classes: hideControl,
    sx: hideControl,
  },
  component: DividerComponent,
  title: "Components/Divider",
} as Meta

// noinspection RequiredAttributes
const Template: Story<DividerProps> = (args) => <DividerComponent {...args} />

export const Divider = Template.bind({})
Divider.args = {}
