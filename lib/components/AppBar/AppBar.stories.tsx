import { default as AppBarComponent, AppBarProps } from "./AppBar"
import type { Meta, Story } from "@storybook/react"
import { proxy, useSnapshot } from "valtio"
import Box from "@material-ui/core/Box"
import chevronDoubleLeft from "@iconify/icons-heroicons-outline/chevron-double-left"
import defaultTheme from "../../styles/defaultTheme"
import Divider from "@material-ui/core/Divider"
import Drawer from "../Drawer"
import { duration } from "@material-ui/core/styles/createTransitions"
import Fade from "@material-ui/core/Fade"
import { Fragment } from "react"
import Icon from "../Icon"
import IconButton from "../IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import menuAlt2 from "@iconify/icons-heroicons-outline/menu-alt-2"
import numericArray from "../../utils/numericArray"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import useTheme from "@material-ui/core/styles/useTheme"
import useWindowScroll from "react-use/esm/useWindowScroll"

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
  toggle(isOpen?: boolean) {
    state.isOpen = typeof isOpen === "boolean" ? isOpen : !state.isOpen
  },
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

  const { isOpen, toggle } = useSnapshot(state)
  return (
    <>
      <AppBarComponent
        {...args}
        elevation={
          scrollTop > 8 * 4 ? 3 : scrollTop > 8 * 2 ? 2 : scrollTop > 0 ? 1 : 0
        }
      >
        <Toolbar sx={{ ml: isOpen ? drawerSize : 0 }}>
          <Fade in={!isOpen}>
            <Box alignItems="center" display="flex">
              <IconButton
                aria-label="menu"
                color="inherit"
                edge="start"
                onClick={() => {
                  toggle()
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
                <Icon icon={!isOpen ? menuAlt2 : chevronDoubleLeft} />
              </IconButton>
              <Typography component="div" fontWeight={500} sx={{ flexGrow: 1 }}>
                News
              </Typography>
            </Box>
          </Fade>
        </Toolbar>
      </AppBarComponent>
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
          toggle(false)
        }}
        onOpen={() => {
          toggle(true)
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
  position: "fixed",
  variant: "elevation",
}
