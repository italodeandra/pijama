/* istanbul ignore file */

import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon"
import { Icon as Iconify } from "@iconify/react"
import type { VFC } from "react"

export interface IconProps extends Omit<SvgIconProps, "children"> {
  icon: object
}

/**
 * React wrapper for custom SVG icons.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-icon--icon)
 *
 * **Material UI**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [SvgIcon API](https://material-ui.com/api/svg-icon/)
 */
const Icon: VFC<IconProps> = ({ icon, ...props }) => (
  <SvgIcon {...props}>
    <Iconify icon={icon} />
  </SvgIcon>
)

export default Icon
