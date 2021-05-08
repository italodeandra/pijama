import { DateDistanceNow } from "./DateDistanceNow"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const DateDistanceNowDemo = () => {
  const { date, ...props } = useDocumentation(
    {
      addSuffix: {
        description: "If should show the suffix.",
        options: [true, false],
        value: false,
      },
      date: {
        description: "The date to be formatted.",
        value: new Date().toISOString(),
      },
      includeSeconds: {
        description: "If should show the suffix.",
        options: [true, false],
        value: false,
      },
    },
    ({ addSuffix, date, includeSeconds }) => `<DateDistanceNow
  date="${date}"${
      addSuffix
        ? `
  addSuffix`
        : ""
    }${
      includeSeconds
        ? `
  includeSeconds`
        : ""
    }
/>`
  )

  return <DateDistanceNow {...props} date={date} />
}
