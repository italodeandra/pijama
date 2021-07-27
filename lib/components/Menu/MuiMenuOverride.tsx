import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@material-ui/core/styles";

const MuiMenuOverride: {
  defaultProps?: ComponentsProps["MuiMenu"];
  styleOverrides?: ComponentsOverrides["MuiMenu"];
} = {
  defaultProps: {
    elevation: 3,
  },
  styleOverrides: {},
};

export default MuiMenuOverride;
