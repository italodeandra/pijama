import { ComponentsOverrides, ComponentsProps } from "@material-ui/core/styles";

const MuiTableOverride: {
  defaultProps?: ComponentsProps["MuiTable"];
  styleOverrides?: ComponentsOverrides["MuiTable"];
} = {
  defaultProps: {
    size: "small",
  },
};

export default MuiTableOverride;
