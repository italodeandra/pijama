import { ComponentsOverrides } from "@material-ui/core/styles/overrides"
import { ComponentsProps } from "@material-ui/core/styles/props"

export const MuiToolbarOverride: {
  defaultProps?: ComponentsProps["MuiToolbar"]
  styleOverrides?: ComponentsOverrides["MuiToolbar"]
} = {
  defaultProps: {
    variant: "dense",
  },
}
