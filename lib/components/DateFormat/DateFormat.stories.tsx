import { default as DateFormatComponent, DateFormatProps } from "./DateFormat"
import type { Meta, Story } from "@storybook/react"

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    alignContent: hideControl,
    alignItems: hideControl,
    alignSelf: hideControl,
    borderBottom: hideControl,
    borderColor: hideControl,
    borderLeft: hideControl,
    borderRadius: hideControl,
    borderRight: hideControl,
    borderTop: hideControl,
    bottom: hideControl,
    boxSizing: hideControl,
    color: hideControl,
    columnGap: hideControl,
    date: {
      control: { type: "date" },
    },
    display: hideControl,
    flex: hideControl,
    flexBasis: hideControl,
    flexDirection: hideControl,
    flexGrow: hideControl,
    flexShrink: hideControl,
    flexWrap: hideControl,
    fontFamily: hideControl,
    fontSize: hideControl,
    fontStyle: hideControl,
    gap: hideControl,
    gridArea: hideControl,
    gridAutoColumns: hideControl,
    gridAutoFlow: hideControl,
    gridAutoRows: hideControl,
    gridColumn: hideControl,
    gridRow: hideControl,
    gridTemplateAreas: hideControl,
    gridTemplateColumns: hideControl,
    gridTemplateRows: hideControl,
    height: hideControl,
    justifyContent: hideControl,
    justifyItems: hideControl,
    justifySelf: hideControl,
    left: hideControl,
    letterSpacing: hideControl,
    lineHeight: hideControl,
    margin: hideControl,
    marginBottom: hideControl,
    marginLeft: hideControl,
    marginRight: hideControl,
    marginTop: hideControl,
    maxHeight: hideControl,
    maxWidth: hideControl,
    minHeight: hideControl,
    minWidth: hideControl,
    order: hideControl,
    overflow: hideControl,
    padding: hideControl,
    paddingBottom: hideControl,
    paddingLeft: hideControl,
    paddingRight: hideControl,
    paddingTop: hideControl,
    position: hideControl,
    ref: hideControl,
    right: hideControl,
    rowGap: hideControl,
    sx: hideControl,
    textAlign: hideControl,
    textOverflow: hideControl,
    top: hideControl,
    visibility: hideControl,
    whiteSpace: hideControl,
    width: hideControl,
  },
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
  format: "Pp",
}
