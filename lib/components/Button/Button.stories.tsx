import { Button as ButtonComponent, ButtonProps } from "./Button"
import { Meta, Story } from "@storybook/react"
import { Icon as IconComponent } from "@iconify/react"
import menuIcon from "@iconify/icons-heroicons-outline/menu"

export default {
  component: ButtonComponent,
  title: "Components/Button",
} as Meta

const Template: Story<ButtonProps> = ({ children, ...args }) => (
  <ButtonComponent {...args}>{children}</ButtonComponent>
)

export const Button = Template.bind({})
Button.args = {
  children: "Button",
}

export const Icon = Template.bind({})
Icon.args = {
  children: <IconComponent icon={menuIcon} />,
  icon: true,
  variant: "text",
}
Icon.argTypes = {
  children: {
    control: {
      type: null,
    },
  },
}
