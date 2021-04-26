import { Fade as FadeComponent, FadeProps } from "./Fade"
import { Meta, Story } from "@storybook/react"
import { Gray } from "../../styles"
import { css } from "@emotion/react"
import { forwardRef } from "react"

export default {
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  component: FadeComponent,
  title: "Components/Transitions/Fade",
} as Meta

const Template: Story<FadeProps> = ({ children, ...args }) => (
  <FadeComponent {...args}>{children}</FadeComponent>
)

const Example = forwardRef<HTMLDivElement>((props, ref) => (
  <div css={css({ backgroundColor: Gray.N100 })} ref={ref} {...props}>
    This is a text. Change the property "in" for it to be faded/un-faded.
  </div>
))

export const Fade = Template.bind({})
Fade.args = {
  children: <Example />,
  in: true,
}
