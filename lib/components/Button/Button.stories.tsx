import { Button as ButtonComponent, ButtonProps } from "./Button"
import { Meta, Story } from "@storybook/react"

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    TouchRippleProps: hideControl,
    action: hideControl,
    as: hideControl,
    classes: hideControl,
    endIcon: hideControl,
    focusVisibleClassName: hideControl,
    ref: hideControl,
    startIcon: hideControl,
    sx: hideControl,
    theme: hideControl,
  },
  component: ButtonComponent,
  title: "Components/Button",
} as Meta

const Template: Story<ButtonProps> = (args) => <ButtonComponent {...args} />

export const Button = Template.bind({})
Button.args = {
  children: "Text",
  color: "primary",
  size: "medium",
  variant: "contained",
}
