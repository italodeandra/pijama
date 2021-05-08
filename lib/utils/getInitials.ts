export const getInitials = (name: string, separator = " ") => {
  const splitName = name.split(separator).slice(0, 2)
  const splitInitials = splitName.map((n) => n.charAt(0))
  return splitInitials.join("")
}
