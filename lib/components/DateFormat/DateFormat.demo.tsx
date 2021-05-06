import { DateFormat } from "./DateFormat"
import { useDocumentation } from "../../hooks"

// noinspection JSUnusedGlobalSymbols
export const DateFormatDemo = () => {
  const { date, ...props } = useDocumentation(
    {
      date: {
        description: "The date to be formatted.",
        value: new Date().toISOString(),
      },
      format: {
        description:
          "The format to be formatted. Pp = 03/22/1997, 7:50 PM. Reference: https://date-fns.org/v2.21.1/docs/format",
        value: "Pp",
      },
    },
    ({ date, format }) => `<DateFormat
  date="${date}"${
      format !== "Pp"
        ? `
  format="${format}"`
        : ""
    }
/>`
  )

  return <DateFormat {...props} date={date} />
}
