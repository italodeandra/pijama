import { Collapse as CollapseComponent, CollapseProps } from "./Collapse"
import { Meta, Story } from "@storybook/react"
import { css } from "@emotion/react"
import { Gray } from "../../styles"

export default {
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  component: CollapseComponent,
  title: "Components/Transitions/Collapse",
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
