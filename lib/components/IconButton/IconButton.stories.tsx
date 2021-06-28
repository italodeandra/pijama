import {
  IconButton as IconButtonComponent,
  IconButtonProps,
} from "./IconButton"
import { Meta, Story } from "@storybook/react"
import { Icon } from "../Icon/Icon"
import menuAlt2 from "@iconify/icons-heroicons-outline/menu-alt-2"

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    children: hideControl,
    classes: hideControl,
    sx: hideControl,
  },
  component: IconButtonComponent,
  title: "Components/IconButton",
} as Meta

const Template: Story<IconButtonProps> = (args) => (
  <IconButtonComponent {...args} />
)

export const IconButton = Template.bind({})
IconButton.storyName = "IconButton"
IconButton.args = {
  children: <Icon icon={menuAlt2} />,
}
