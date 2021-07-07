import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@material-ui/core/styles";

const MuiToolbarOverride: {
  defaultProps?: ComponentsProps["MuiToolbar"];
  styleOverrides?: ComponentsOverrides["MuiToolbar"];
} = {
  defaultProps: {
    variant: "dense",
  },
};

export default MuiToolbarOverride;
