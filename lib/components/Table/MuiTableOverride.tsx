import { ComponentsOverrides } from "@material-ui/core/styles/overrides"
import { ComponentsProps } from "@material-ui/core/styles/props"

export const MuiTableOverride: {
  defaultProps?: ComponentsProps["MuiTable"]
  styleOverrides?: ComponentsOverrides["MuiTable"]
} = {
  defaultProps: {
    size: "small",
  },
}
