import type { ComponentsOverrides } from "@material-ui/core/styles/overrides"
import type { ComponentsProps } from "@material-ui/core/styles/props"

const MuiToolbarOverride: {
  defaultProps?: ComponentsProps["MuiToolbar"]
  styleOverrides?: ComponentsOverrides["MuiToolbar"]
} = {
  defaultProps: {
    variant: "dense",
  },
}

export default MuiToolbarOverride
