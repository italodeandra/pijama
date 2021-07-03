// noinspection JSUnusedGlobalSymbols

import type { Meta, Story } from "@storybook/react"
import { default as TextFieldComponent, TextFieldProps } from "./TextField"

const disableControl = {
  table: {
    disable: true,
  },
}

export default {
  argTypes: {
    as: disableControl,
    ref: disableControl,
    theme: disableControl,
  },
  component: TextFieldComponent,
  title: "Components/TextField",
} as Meta

const Template: Story<TextFieldProps> = (args) => (
  <TextFieldComponent {...args} />
)

export const TextField = Template.bind({})
TextField.storyName = "TextField"
TextField.args = {
  label: "Text field",
  margin: "none",
}
