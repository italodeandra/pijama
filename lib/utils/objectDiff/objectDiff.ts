import { differenceWith, fromPairs, isEqual, mapValues, toPairs } from "lodash"

export const objectDiff = (a, b) =>
  fromPairs(
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
