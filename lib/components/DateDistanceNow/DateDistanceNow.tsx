import { Fragment, VFC } from "react"
import { useInterval, useUpdate } from "react-use"
import { Box } from "../Box/Box"
import { ComponentShorthandProps } from "../../styles"
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
  /**
   * Which locale should be used.
   */
  locale?: Locale
} & ComponentShorthandProps

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
  locale,
  ...props
}) => {
  const Component = props.as ? Box : Fragment
  if (!props.as) {
    delete props.as
    delete props.sh
  }
  if (typeof date === "string") {
    date = new Date(date)
  }
  const update = useUpdate()
  useInterval(update, date ? (includeSeconds ? 4 : 59) * 1000 : null)

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
            locale,
          })}
    </Component>
  )
}
