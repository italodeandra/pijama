/**
 * Transform a string in camelCase to dash-case.
 */
export default function camelCaseToDash(str: string) {
  let result = "",
    prevLowercase = false
  for (let char of str) {
    const isUppercase = char.toUpperCase() === char
    if (isUppercase && prevLowercase) {
      result += "-"
    }
    result += char
    prevLowercase = !isUppercase
  }
  return result.replace(/-+/g, "-").toLowerCase()
}
