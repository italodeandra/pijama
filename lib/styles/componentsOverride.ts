import { Components } from "@material-ui/core/styles/components"

export const componentsOverride: Components = {
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: "rgba(0, 0, 0, 0.08)",
      },
    },
  },
  MuiTable: {
    defaultProps: {
      size: "small",
    },
  },
  MuiToolbar: {
    defaultProps: {
      variant: "dense",
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
  },
}
