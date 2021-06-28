import { AppBar as AppBarComponent, AppBarProps } from "./AppBar"
import {
  Box,
  Divider,
  duration,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "../index"
import { Meta, Story } from "@storybook/react"
import { proxy, useSnapshot } from "valtio"
import chevronDoubleLeft from "@iconify/icons-heroicons-outline/chevron-double-left"
import { defaultTheme } from "../../styles"
import { Drawer } from "../Drawer/Drawer"
import { Fragment } from "react"
import { Icon } from "../Icon/Icon"
import menuAlt2 from "@iconify/icons-heroicons-outline/menu-alt-2"
import { numericArray } from "../../utils"
import { useWindowScroll } from "react-use"

const disableControl = {
  control: false,
}

const hideControl = {
  table: {
    disable: true,
  },
}

// noinspection JSUnusedGlobalSymbols
export default {
  argTypes: {
    as: hideControl,
    children: disableControl,
    classes: hideControl,
    ref: hideControl,
    sx: hideControl,
    theme: hideControl,
  },
  component: AppBarComponent,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/AppBar",
} as Meta

const state = proxy({
  isOpen: false,
})

const AVeryBigLoremIpsum = () => (
  <>
    {numericArray(20).map((i) => (
      <Fragment key={i}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem
        commodi, cum cupiditate dicta dignissimos doloribus dolorum ducimus eius
        error fuga iusto laudantium nihil non perferendis sed sequi sint ullam.
      </Fragment>
    ))}
  </>
)

const drawerSize = defaultTheme.spacing(32)

const Template: Story<AppBarProps> = (args) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
  const { y: scrollTop } = useWindowScroll()

  const { isOpen } = useSnapshot(state)
  return (
    <>
      <AppBarComponent
        {...args}
        elevation={
          scrollTop > 8 * 4 ? 3 : scrollTop > 8 * 2 ? 2 : scrollTop > 0 ? 1 : 0
        }
      />
      <Box
        sx={{
          marginLeft: !isMobile && isOpen ? drawerSize : 0,
          transition: (theme2) =>
            theme2.transitions.create("margin-left", {
              duration: isOpen
                ? duration.enteringScreen
                : duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        <Box p={2}>
          The app bar content and drawer are not part of the AppBar component,
          this is just an example. But you can copy this code from the{" "}
          <Typography component="span" fontWeight={600}>
            Docs
          </Typography>{" "}
          tab.
        </Box>
        <AVeryBigLoremIpsum />
      </Box>
      <Drawer
        anchor="left"
        onClose={() => {
          state.isOpen = false
        }}
        onOpen={() => {
          state.isOpen = true
        }}
        open={isOpen}
      >
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
          {!isMobile && (
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              onClick={() => {
                state.isOpen = !state.isOpen
              }}
              size="small"
              sx={{
                ml: 2,
                mr: {
                  sm: -2,
                  xs: -1,
                },
              }}
            >
              <Icon icon={!state.isOpen ? menuAlt2 : chevronDoubleLeft} />
            </IconButton>
          )}
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
      </Drawer>
    </>
  )
}

export const AppBar = Template.bind({})
AppBar.storyName = "AppBar"
AppBar.args = {
  children: (
    <Toolbar sx={{ ml: state.isOpen ? drawerSize : 0 }}>
      <Fade in={!state.isOpen}>
        <Box alignItems="center" display="flex">
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={() => {
              state.isOpen = !state.isOpen
            }}
            size="small"
            sx={{
              ml: {
                sm: -2,
                xs: -1,
              },
              mr: 2,
            }}
          >
            <Icon icon={!state.isOpen ? menuAlt2 : chevronDoubleLeft} />
          </IconButton>
          <Typography component="div" fontWeight={500} sx={{ flexGrow: 1 }}>
            News
          </Typography>
        </Box>
      </Fade>
    </Toolbar>
  ),
  position: "fixed",
  variant: "elevation",
}
