/* istanbul ignore file */

import { SvgIcon, SvgIconProps } from "@material-ui/core"
import { Icon as Iconify } from "@iconify/react"
import { VFC } from "react"

export interface IconProps extends Omit<SvgIconProps, "children"> {
  icon: object
}

export const Icon: VFC<IconProps> = ({ icon, ...props }) => (
  <SvgIcon {...props}>
    <Iconify icon={icon} />
  </SvgIcon>
)
