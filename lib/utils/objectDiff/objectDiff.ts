import differenceWith from "lodash/differenceWith"
import fromPairs from "lodash/fromPairs"
import isEqual from "lodash/isEqual"
import mapValues from "lodash/mapValues"
import toPairs from "lodash/toPairs"

export default function objectDiff(a: any, b: any) {
  return fromPairs(
    differenceWith(
      toPairs(
        mapValues(b, (value, key) =>
          typeof value === "object" && typeof a[key] === "object"
            ? objectDiff(a[key], value)
            : value
        )
      ),
      toPairs(a),
      (b, a) => isEqual(b[1], {}) || isEqual(b, a)
    )
  )
}
