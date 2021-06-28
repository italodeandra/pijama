import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@material-ui/core"
import { ReactElement, ReactNode, VFC } from "react"

/* MuiTooltipProps has a weird problem with Storybook where it doesn't get the
controls automatically. So to fix that, it was needed to copy the properties
from the original and paste here while omitting the originals. It was not
copied all the properties, it was just copied the ones that was necessary to
test on Storybook. New properties may be added if needed. */
export interface TooltipProps
  extends Omit<MuiTooltipProps, "open" | "placement" | "title" | "children"> {
  /**
   * Tooltip reference element.
   */
  children: ReactElement<any, any>
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: NonNullable<ReactNode>
  /**
   * If `true`, the component is shown.
   */
  open?: boolean
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
}

// noinspection RequiredAttributes
/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-tooltip--tooltip)
 *
 * **Material UI**
 *
 * Demos:
 *
 * - [Tooltips](https://material-ui.com/components/tooltips/)
 *
 * API:
 *
 * - [Tooltip API](https://material-ui.com/api/tooltip/)
 */
export const Tooltip: VFC<TooltipProps> = MuiTooltip
