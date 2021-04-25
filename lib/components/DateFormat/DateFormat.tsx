import { VFC, memo } from "react"
import { format as formatDate } from "date-fns"

export type DateFormatProps = {
  /**
   * The date to be formatted.
   */
  date: string | number | Date | undefined
  /**
   * The format to be formatted.
   * Pp = 03/22/1997, 7:50 PM
   * Reference: https://date-fns.org/v2.21.1/docs/format
   * @default Pp
   */
  format?: string
}

export const DateFormat: VFC<DateFormatProps> = memo(
  ({ date, format = "Pp" }) => {
    if (typeof date === "string") {
      date = new Date(date)
    }
    if (!date) {
      return null
    }
    if (isNaN(new Date(date).getTime())) {
      return <>Invalid date</>
    }
    return <>{formatDate(date, format)}</>
  }
)
