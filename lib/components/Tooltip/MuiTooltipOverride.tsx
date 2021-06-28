import { ComponentsOverrides } from "@material-ui/core/styles/overrides"
import { ComponentsProps } from "@material-ui/core/styles/props"
import { CoolGray } from "../../styles"
import { shadows } from "../../styles/shadows/shadows"

export const MuiTooltipOverride: {
  defaultProps?: ComponentsProps["MuiTooltip"]
  styleOverrides?: ComponentsOverrides["MuiTooltip"]
} = {
  defaultProps: {
    arrow: true,
  },
  styleOverrides: {
    arrow: {
      color: CoolGray.N900,
    },
    tooltip: {
      backgroundColor: CoolGray.N900,
      boxShadow: shadows[2],
      fontWeight: 500,
    },
  },
}
