import {
  Toolbar as MuiToolbar,
  ToolbarProps as MuiToolbarProps,
} from "@material-ui/core"
import { VFC } from "react"

export interface ToolbarProps extends MuiToolbarProps {}

export const Toolbar: VFC<ToolbarProps> = MuiToolbar
