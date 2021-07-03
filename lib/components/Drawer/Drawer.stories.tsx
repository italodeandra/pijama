import { default as DrawerComponent, DrawerProps } from "./Drawer"
import type { Meta, Story } from "@storybook/react"
import Box from "@material-ui/core/Box"
import defaultTheme from "../../styles/defaultTheme"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    BackdropComponent: hideControl,
    BackdropProps: hideControl,
    as: hideControl,
    children: hideControl,
    closeAfterTransition: hideControl,
    components: hideControl,
    componentsProps: hideControl,
    container: hideControl,
    disableAutoFocus: hideControl,
    disableEnforceFocus: hideControl,
    disableEscapeKeyDown: hideControl,
    disablePortal: hideControl,
    disableRestoreFocus: hideControl,
    disableScrollLock: hideControl,
    keepMounted: hideControl,
    onBackdropClick: hideControl,
    ref: hideControl,
    theme: hideControl,
  },
  component: DrawerComponent,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Drawer",
} as Meta

const drawerSize = defaultTheme.spacing(32)

const Template: Story<DrawerProps> = ({
  componentsProps,
  BackdropComponent,
  closeAfterTransition,
  disableAutoFocus,
  disableEnforceFocus,
  disableEscapeKeyDown,
  disablePortal,
  disableRestoreFocus,
  disableScrollLock,
  keepMounted,
  onBackdropClick,
  ...args
}) => <DrawerComponent {...args} />

export const Drawer = Template.bind({})
Drawer.args = {
  children: (
    <>
      <Toolbar>
        <Typography
          component="div"
          fontWeight={500}
          sx={{
            flexGrow: 1,
            ml: {
              sm: -1,
            },
          }}
        >
          News
        </Typography>
      </Toolbar>
      <Box role="presentation" sx={{ width: drawerSize }}>
        <List>
          <ListItem button>
            <ListItemText primary={"Menu 1"} />
          </ListItem>
        </List>
        <Divider light />
        <List>
          <ListItem button>
            <ListItemText primary={"Menu 2"} />
          </ListItem>
        </List>
      </Box>
    </>
  ),
  // eslint-disable-next-line no-console
  onClose: console.log,
  // eslint-disable-next-line no-console
  onOpen: console.log,
  open: true,
}
