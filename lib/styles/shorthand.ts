import { CSSInterpolation } from "@emotion/serialize"
import { CSSProperties } from "react"
import { Theme } from "./Theme"

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
  pos: "pos",
  pr: "paddingRight",
  pt: "paddingTop",
}

const shorthandKey = (shorthand: string) => shorthands[shorthand]

export const shorthandValue = (theme: Theme, css: CSSInterpolation) => {
  for (let [key, value] of Object.entries(css)) {
    delete css[key]
    key = shorthandKey(key) || key
    // console.log("key", key, "value", value, "typeof", typeof value === "object")
    if (typeof value === "object" && !Array.isArray(value)) {
      if (key.endsWith("::before") || key.endsWith("::after")) {
        value["content"] = '""'
      }
      css[key] = shorthandValue(theme, value)
    } else if (key === "transition") {
      if (Array.isArray(value)) {
        const values = value as (keyof CSSProperties)[]
        css[key] = theme.transition.create(...values)
      } else {
        css[key] = theme.transition.create(value)
      }
    } else if (typeof value === "string") {
      css[key] = value
    } else if (key === "fontSize") {
      css[key] = theme.rem(value)
    } else if (
      key === "margin" ||
      key === "padding" ||
      key === "borderRadius"
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
