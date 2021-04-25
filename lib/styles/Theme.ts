import { CSSInterpolation } from "@emotion/serialize"
import { CSSProperties } from "react"
import { Color } from "./colors"

export interface Theme {
  color: {
    darkMode: boolean
    primary: Color | string
    secondary: Color | string
    textPrimary: Color | string
    error: Color | string
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

  shorthand(css: CSSInterpolation): CSSInterpolation

  spacing(top: number, right: number, bottom: number, left: number): string

  spacing(y: number, x: number): string

  spacing(spacing: number): string

  rem(px: number): string
}
