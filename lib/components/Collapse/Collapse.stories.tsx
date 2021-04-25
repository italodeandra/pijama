import { Collapse as CollapseComponent, CollapseProps } from "./Collapse"
import { Meta, Story } from "@storybook/react"
import { Gray } from "../../styles"
import { css } from "@emotion/react"

export default {
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  component: CollapseComponent,
  title: "Components/Collapse",
} as Meta

const Template: Story<CollapseProps> = ({ children, ...args }) => (
  <CollapseComponent {...args}>{children}</CollapseComponent>
)

const Example = () => (
  <div css={css({ backgroundColor: Gray.N100 })}>
    This is a text. Change the property "in" for it to be
    collapsed/un-collapsed.
  </div>
)

export const Collapse = Template.bind({})
Collapse.args = {
  children: <Example />,
  in: true,
}
