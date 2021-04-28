import { Drawer as DrawerComponent, DrawerProps } from "./Drawer"
import { Meta, Story } from "@storybook/react"
import { Box } from "../Box/Box"
import { Button } from "../Button/Button"
import { Icon } from "@iconify/react"
import menuIcon from "@iconify/icons-heroicons-outline/menu"
import { toggleDrawer } from "./drawerState"

export default {
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  component: DrawerComponent,
  title: "Components/Drawer",
} as Meta

const Template: Story<DrawerProps> = ({ children, ...args }) => (
  <>
    <Button onClick={() => toggleDrawer()}>Toggle drawer</Button>
    <DrawerComponent {...args}>{children}</DrawerComponent>
  </>
)

export const Drawer = Template.bind({})
Drawer.args = {
  children: (
    <Box sh={{ p: 1 }}>
      <Button icon onClick={() => toggleDrawer(false)} variant="text">
        <Icon icon={menuIcon} />
      </Button>
    </Box>
  ),
}
