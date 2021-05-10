import { Fragment, memo, VFC } from "react"
import { Box } from "../Box/Box"
import { ComponentShorthandProps } from "../../styles"
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
} & ComponentShorthandProps

/**
 * Format the date.
 *
 * [Demo](https://pijama.majapi.com.br/components/DateFormat)
 *
 * @example <DateFormat date="2021-05-10T14:47:10.954Z" />
 */
export const DateFormat: VFC<DateFormatProps> = memo(
  ({ date, format = "Pp", ...props }) => {
    const Component = props.as ? Box : Fragment
    if (!props.as) {
      delete props.as
      delete props.sh
    }
    if (typeof date === "string") {
      date = new Date(date)
    }
    if (!date) {
      return null
    }
    const isInvalid = isNaN(new Date(date).getTime())
    return (
      <Component {...props}>
        {isInvalid ? "Invalid date" : formatDate(date, format)}
      </Component>
    )
  }
)
