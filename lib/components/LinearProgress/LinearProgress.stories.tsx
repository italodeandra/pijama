import {
  LinearProgress as LinearProgressComponent,
  LinearProgressProps,
} from "./LinearProgress"
import { Meta, Story } from "@storybook/react"

export default {
  argTypes: {
    value: {
      control: { max: 100, min: 0, step: 1, type: "range" },
    },
  },
  component: LinearProgressComponent,
  title: "Components/LinearProgress",
} as Meta

const Template: Story<LinearProgressProps> = (args) => (
  <LinearProgressComponent {...args} />
)

export const LinearProgress = Template.bind({})
LinearProgress.storyName = "LinearProgress"
LinearProgress.args = {
  value: 30,
}
