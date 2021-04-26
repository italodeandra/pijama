import { Box as BoxComponent, BoxProps } from "./Box"
import { Meta, Story } from "@storybook/react"

export default {
  component: BoxComponent,
  title: "Components/Box",
} as Meta

const Template: Story<BoxProps> = ({ children, ...args }) => (
  <BoxComponent {...args}>{children}</BoxComponent>
)

export const Box = Template.bind({})
Box.args = {
  children: "Box content",
}
