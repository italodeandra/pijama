// noinspection JSUnusedGlobalSymbols

import { Icon as IconComponent, IconProps } from "./Icon"
import { Meta, Story } from "@storybook/react"
import menuIcon from "@iconify/icons-heroicons-outline/menu"

const hideControl = {
  table: {
    disable: true,
  },
}

export default {
  argTypes: {
    classes: hideControl,
    ref: hideControl,
    sx: hideControl,
  },
  component: IconComponent,
  title: "Components/Icon",
} as Meta

const Template: Story<IconProps> = (args) => <IconComponent {...args} />

export const Icon = Template.bind({})
Icon.args = {
  color: "inherit",
  icon: menuIcon,
  viewBox: "0 0 24 24",
}
