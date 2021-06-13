import { Button as ButtonComponent, ButtonProps } from "./Button"
import { Meta, Story } from "@storybook/react"

const disableControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    TouchRippleProps: disableControl,
    action: disableControl,
    as: disableControl,
    classes: disableControl,
    endIcon: disableControl,
    focusVisibleClassName: disableControl,
    ref: disableControl,
    startIcon: disableControl,
    sx: disableControl,
    theme: disableControl,
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
