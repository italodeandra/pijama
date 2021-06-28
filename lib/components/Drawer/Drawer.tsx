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
