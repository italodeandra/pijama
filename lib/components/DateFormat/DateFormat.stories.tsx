import {
  DateFormat as DateFormatComponent,
  DateFormatProps,
} from "./DateFormat"
import { Meta, Story } from "@storybook/react"

export default {
  component: DateFormatComponent,
  title: "Components/DateFormat",
} as Meta

const Template: Story<DateFormatProps> = (args) => (
  <DateFormatComponent {...args} />
)

export const DateFormat = Template.bind({})
DateFormat.storyName = "DateFormat"
DateFormat.args = {
  date: new Date(),
}
