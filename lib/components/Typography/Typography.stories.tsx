import { Meta, Story } from "@storybook/react"
import {
  Typography as TypographyComponent,
  TypographyProps,
} from "./Typography"

const disableControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    classes: disableControl,
    component: disableControl,
    sx: disableControl,
    variantMapping: disableControl,
  },
  component: TypographyComponent,
  title: "Components/Typography",
} as Meta

const Template: Story<TypographyProps> = (args) => (
  <TypographyComponent {...args} />
)

export const Typography = Template.bind({})
Typography.args = {
  children: "This is a text",
  variant: "subtitle2",
}
