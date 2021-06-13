import {
  DateDistanceNow as DateDistanceNowComponent,
  DateDistanceNowProps,
} from "./DateDistanceNow"
import { Meta, Story } from "@storybook/react"

const disableControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    alignContent: disableControl,
    alignItems: disableControl,
    alignSelf: disableControl,
    borderBottom: disableControl,
    borderColor: disableControl,
    borderLeft: disableControl,
    borderRadius: disableControl,
    borderRight: disableControl,
    borderTop: disableControl,
    bottom: disableControl,
    boxSizing: disableControl,
    color: disableControl,
    columnGap: disableControl,
    date: {
      control: { type: "date" },
    },
    display: disableControl,
    flex: disableControl,
    flexBasis: disableControl,
    flexDirection: disableControl,
    flexGrow: disableControl,
    flexShrink: disableControl,
    flexWrap: disableControl,
    fontFamily: disableControl,
    fontSize: disableControl,
    fontStyle: disableControl,
    gap: disableControl,
    gridArea: disableControl,
    gridAutoColumns: disableControl,
    gridAutoFlow: disableControl,
    gridAutoRows: disableControl,
    gridColumn: disableControl,
    gridRow: disableControl,
    gridTemplateAreas: disableControl,
    gridTemplateColumns: disableControl,
    gridTemplateRows: disableControl,
    height: disableControl,
    justifyContent: disableControl,
    justifyItems: disableControl,
    justifySelf: disableControl,
    left: disableControl,
    letterSpacing: disableControl,
    lineHeight: disableControl,
    margin: disableControl,
    marginBottom: disableControl,
    marginLeft: disableControl,
    marginRight: disableControl,
    marginTop: disableControl,
    maxHeight: disableControl,
    maxWidth: disableControl,
    minHeight: disableControl,
    minWidth: disableControl,
    order: disableControl,
    overflow: disableControl,
    padding: disableControl,
    paddingBottom: disableControl,
    paddingLeft: disableControl,
    paddingRight: disableControl,
    paddingTop: disableControl,
    position: disableControl,
    ref: disableControl,
    right: disableControl,
    rowGap: disableControl,
    sx: disableControl,
    textAlign: disableControl,
    textOverflow: disableControl,
    top: disableControl,
    visibility: disableControl,
    whiteSpace: disableControl,
    width: disableControl,
  },
  component: DateDistanceNowComponent,
  title: "Components/DateDistanceNow",
} as Meta

const Template: Story<DateDistanceNowProps> = (args) => (
  <DateDistanceNowComponent {...args} />
)

export const DateDistanceNow = Template.bind({})
DateDistanceNow.storyName = "DateDistanceNow"
DateDistanceNow.args = {
  date: new Date(),
}
