import { Meta, Story } from "@storybook/react"
import { TextField as TextFieldComponent, TextFieldProps } from "../TextField"

export default {
  component: TextFieldComponent,
  title: "Components/TextField",
} as Meta

const Template: Story<TextFieldProps> = (args) => (
  <TextFieldComponent {...args} />
)

export const TextField = Template.bind({})
TextField.storyName = "TextField"
TextField.args = {
  helperText: "Helper text",
  label: "Label",
}
