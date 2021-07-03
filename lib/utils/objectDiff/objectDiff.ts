import differenceWith from "lodash-es/differenceWith"
import fromPairs from "lodash-es/fromPairs"
import isEqual from "lodash-es/isEqual"
import mapValues from "lodash-es/mapValues"
import toPairs from "lodash-es/toPairs"

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
