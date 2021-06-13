/* istanbul ignore file */

import {
  paperClasses,
  styled,
  SwipeableDrawer,
  SwipeableDrawerProps,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { Gray } from "../../styles"
import { VFC } from "react"

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent)

export interface DrawerProps extends SwipeableDrawerProps {}

export const Drawer = styled<VFC<DrawerProps>>((props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      variant={!isMobile ? "persistent" : "temporary"}
      {...props}
    />
  )
})(() => ({
  [`& .${paperClasses.root}`]: {
    backgroundColor: Gray.N50,
    borderRight: "none",
  },
}))
