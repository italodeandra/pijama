import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@material-ui/core/styles";

const MuiCardOverride: {
  defaultProps?: ComponentsProps["MuiCard"];
  styleOverrides?: ComponentsOverrides["MuiCard"];
} = {
  defaultProps: {
    elevation: 2,
  },
};

export default MuiCardOverride;
