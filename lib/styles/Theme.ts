import { CSSInterpolation } from "@emotion/serialize"
import { CSSProperties } from "react"
import { Color } from "./colors"

export type ThemeColors = keyof Omit<Theme["color"], "darkMode">

export interface Theme {
  color: {
    darkMode: boolean
    primary: Color | string
    secondary: Color | string
    error: Color | string
    textPrimary: Color | string
    textSecondary: Color | string
  }
  spacingSize: number
  typography: {
    fontFamily: string
  }
  transition: {
    create(property: keyof CSSProperties): string
    create(...properties: (keyof CSSProperties)[]): string
    duration: number
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }

  shorthand(css: CSSInterpolation): CSSInterpolation

  spacing(top: number, right: number, bottom: number, left: number): string

  spacing(y: number, x: number): string

  spacing(spacing: number): string

  rem(px: number): string
}
