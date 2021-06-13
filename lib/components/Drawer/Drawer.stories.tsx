import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Drawer as DrawerComponent, DrawerProps } from "./Drawer"
import { Meta, Story } from "@storybook/react"
import { defaultTheme } from "../../styles"

const disableControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    BackdropComponent: disableControl,
    BackdropProps: disableControl,
    as: disableControl,
    children: disableControl,
    closeAfterTransition: disableControl,
    components: disableControl,
    componentsProps: disableControl,
    container: disableControl,
    disableAutoFocus: disableControl,
    disableEnforceFocus: disableControl,
    disableEscapeKeyDown: disableControl,
    disablePortal: disableControl,
    disableRestoreFocus: disableControl,
    disableScrollLock: disableControl,
    keepMounted: disableControl,
    onBackdropClick: disableControl,
    ref: disableControl,
    theme: disableControl,
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
        <Divider />
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
