/* istanbul ignore file */

import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Icon as Iconify, InlineIcon } from "@iconify/react";
import type { VFC } from "react";
import { forwardRef } from "react";

export interface IconProps extends Omit<SvgIconProps, "children"> {
  /**
   * The icon from Iconify.
   */
  icon: object;
  /**
   * If the icon should be inline.
   */
  inline?: boolean;
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
const Icon: VFC<IconProps> = forwardRef(({ icon, inline, ...props }, ref) => (
  <SvgIcon
    ref={ref}
    component={!inline ? Iconify : InlineIcon}
    icon={icon}
    {...props}
  />
));

export default Icon;
