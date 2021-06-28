import {
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
} from "@material-ui/core"
import { VFC } from "react"

export interface DividerProps extends MuiDividerProps {}

/**
 * A divider is a thin line that groups content in lists and layouts.
 *
 * [Demo](https://pijama.majapi.com/?path=/story/components-divider--divider)
 *
 * **Material UI**
 *
 * Demos:
 *
 * - [Dividers](https://material-ui.com/components/dividers/)
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [Divider API](https://material-ui.com/api/divider/)
 */
export const Divider: VFC<DividerProps> = MuiDivider
