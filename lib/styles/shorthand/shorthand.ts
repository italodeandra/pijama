import { CSSInterpolation } from "@emotion/serialize"
import { CSSProperties } from "react"
import { Theme } from "../Theme"

const shorthands = {
  bgColor: "backgroundColor",
  br: "borderRadius",
  m: "margin",
  maxH: "maxHeight",
  maxW: "maxWidth",
  mb: "marginBottom",
  minH: "minHeight",
  minW: "minWidth",
  ml: "marginLeft",
  mr: "marginRight",
  mt: "marginTop",
  p: "padding",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  pt: "paddingTop",
  shadow: "boxShadow",
}

export const shadows = {
  /* eslint-disable sort-keys */
  xs: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  sm: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  md: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  lg: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  xl: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  xxl: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
  inner:
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
}

const shorthandKey = (shorthand: string) => shorthands[shorthand]

/**
 * A functions that transform shorthands on their actual names and values.
 */
export const shorthandValue = (theme: Theme, css: CSSInterpolation) => {
  for (let [key, value] of Object.entries(css)) {
    delete css[key]
    key = shorthandKey(key) || key
    if (typeof value === "object" && !Array.isArray(value)) {
      if (key.endsWith("::before") || key.endsWith("::after")) {
        value["content"] = '""'
      }
      css[key] = shorthandValue(theme, value)
    } else if (key === "transition" && value !== "none") {
      if (Array.isArray(value)) {
        const values = value as (keyof CSSProperties)[]
        css[key] = theme.transition.create(...values)
      } else {
        css[key] = theme.transition.create(value)
      }
    } else if (key.toLowerCase().includes("color")) {
      css[key] = theme.color[value] || value
    } else if (key === "boxShadow") {
      css[key] = shadows[value] || value
    } else if (typeof value === "string") {
      css[key] = value
    } else if (key === "fontSize") {
      css[key] = theme.rem(value)
    } else if (
      key === "borderRadius" ||
      key === "margin" ||
      key === "padding"
    ) {
      if (Array.isArray(value)) {
        const values = value as number[]
        css[key] = values.map((v) => theme.spacing(v)).join(" ")
      } else {
        css[key] = theme.spacing(value)
      }
    } else if (
      key.startsWith("padding") ||
      key.startsWith("margin") ||
      key.toLowerCase().endsWith("height") ||
      key.toLowerCase().endsWith("width")
    ) {
      css[key] = theme.spacing(value)
    } else if (key === "pos") {
      css["position"] = "absolute"
      if (Array.isArray(value) && (value.length === 2 || value.length === 4)) {
        if (value.length === 2) {
          css["top"] = theme.spacing(value[0])
          css["right"] = theme.spacing(value[1])
          css["bottom"] = theme.spacing(value[0])
          css["left"] = theme.spacing(value[1])
        } else {
          css["top"] = theme.spacing(value[0])
          css["right"] = theme.spacing(value[1])
          css["bottom"] = theme.spacing(value[2])
          css["left"] = theme.spacing(value[3])
        }
      } else {
        css["top"] = theme.spacing(value)
        css["right"] = theme.spacing(value)
        css["bottom"] = theme.spacing(value)
        css["left"] = theme.spacing(value)
      }
    } else {
      css[key] = value
    }
  }
  return css as CSSInterpolation
}
