import { Box, BoxProps } from "@material-ui/core"
import { Fragment, VFC } from "react"
import { useInterval, useUpdate } from "react-use"
import { formatDistance } from "date-fns"

export type DateDistanceNowProps = {
  /**
   * The date to be formatted.
   */
  date: string | number | Date | undefined
  /**
   * If should include the seconds.
   */
  includeSeconds?: boolean
  /**
   * If should show the suffix.
   */
  addSuffix?: boolean
} & BoxProps

/**
 * Shows how much time it passed since the passed date. Or how long it will
 * take from now. This is auto updated every minute.
 *
 * [Demo](https://pijama.majapi.com.br/components/DateDistanceNow)
 *
 * @example
 * <DateDistanceNow date="2021-05-10T14:47:10.954Z" />
 */
export const DateDistanceNow: VFC<DateDistanceNowProps> = ({
  date,
  includeSeconds,
  addSuffix,
  ...props
}) => {
  const Component = props.component ? Box : Fragment
  if (!props.component) {
    props = {}
  }
  if (typeof date === "string" && date !== "") {
    date = new Date(date)
  }
  const update = useUpdate()
  let intervalSeconds = date && (includeSeconds ? 4 : 59)
  useInterval(update, date ? intervalSeconds * 1000 : null)
  if (!date) {
    return null
  }
  const isInvalid = isNaN(new Date(date).getTime())
  return (
    <Component {...props}>
      {isInvalid
        ? "Invalid date"
        : formatDistance(date, new Date(), {
            addSuffix,
            includeSeconds,
          })}
    </Component>
  )
}
