import { Link as LinkComponent, LinkProps } from "./Link"
import { Meta, Story } from "@storybook/react"

export default {
  component: LinkComponent,
  title: "Components/Link",
} as Meta

const Template: Story<LinkProps> = ({ children, ...args }) => (
  <LinkComponent {...args}>{children}</LinkComponent>
)

export const Link = Template.bind({})
Link.args = {
  children: "Link",
  href: "https://italodeandra.de",
}
