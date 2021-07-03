import { ComponentsOverrides } from "@material-ui/core/styles/overrides"
import { ComponentsProps } from "@material-ui/core/styles/props"

const MuiTableOverride: {
  defaultProps?: ComponentsProps["MuiTable"]
  styleOverrides?: ComponentsOverrides["MuiTable"]
} = {
  defaultProps: {
    size: "small",
  },
}

export default MuiTableOverride
