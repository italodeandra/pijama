import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@material-ui/core/styles";

const MuiPopoverOverride: {
  defaultProps?: ComponentsProps["MuiPopover"];
  styleOverrides?: ComponentsOverrides["MuiPopover"];
} = {
  defaultProps: {
    elevation: 3,
  },
  styleOverrides: {},
};

export default MuiPopoverOverride;
