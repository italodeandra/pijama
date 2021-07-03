/* istanbul ignore file */

import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer"
import Gray from "../../styles/colors/Gray"
import paperClasses from "@material-ui/core/Paper/paperClasses"
import styled from "@material-ui/core/styles/styled"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import useTheme from "@material-ui/core/styles/useTheme"
import type { VFC } from "react"

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent)

export interface DrawerProps extends SwipeableDrawerProps {}

/**
 * Navigation drawers provide access to destinations in your app. Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-appbar--app-bar)
 *
 * **Material UI:**
 *
 * Demos:
 *
 * - [Drawers](https://material-ui.com/components/drawers/)
 *
 * API:
 *
 * - [SwipeableDrawer API](https://material-ui.com/api/swipeable-drawer/)
 * - inherits [Drawer API](https://material-ui.com/api/drawer/)
 */
const Drawer = styled<VFC<DrawerProps>>((props) => {
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

export default Drawer
