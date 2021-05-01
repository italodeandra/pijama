import { Box, Button, Drawer, Gray, Link, useBreakpoint } from "../../../lib"
import {
  drawerState,
  toggleDrawer,
} from "../../../lib/components/Drawer/drawerState"
import { FC, useEffect } from "react"
import { subscribe, useSnapshot } from "valtio"
import { appDrawerState } from "./AppDrawer.state"
import Icon from "@iconify/react"
import menuIcon from "@iconify/icons-heroicons-outline/menu"
import NextLink from "next/link"
import { useQuery } from "react-query"

export const AppDrawer: FC = ({ children }) => {
  const { width, isOpen } = useSnapshot(drawerState)
  const { placement } = useSnapshot(appDrawerState)
  const isScreenSm = useBreakpoint("sm")
  const { data: components } = useQuery<string[]>(["/api/listComponentsDemos"])

  useEffect(() => {
    const localStorageDrawerIsOpen = JSON.parse(
      localStorage.getItem("drawer.isOpen") || "false"
    )
    toggleDrawer(localStorageDrawerIsOpen)
    return subscribe(drawerState, () =>
      localStorage.setItem("drawer.isOpen", JSON.stringify(drawerState.isOpen))
    )
  }, [])

  return (
    <>
      <Drawer placement={placement}>
        <Box sh={{ p: 2, pb: 0 }}>
          <Box sh={{ mb: 2 }}>
            <NextLink href={`/`} passHref>
              <Link>Home</Link>
            </NextLink>
          </Box>
          {components?.map((component) => (
            <Box key={component} sh={{ mb: 1 }}>
              <NextLink href={`/components/${component}`} passHref>
                <Link>{component}</Link>
              </NextLink>
            </Box>
          ))}
        </Box>
      </Drawer>
      <Box
        sh={{
          ml:
            placement === "left"
              ? isScreenSm && isOpen
                ? `${width}px`
                : 0
              : undefined,
          mr:
            placement === "right"
              ? isScreenSm && isOpen
                ? `${width}px`
                : 0
              : undefined,
          transition: ["marginLeft", "marginRight"],
        }}
      >
        <Box
          sh={{
            alignItems: "center",
            bgColor: Gray.N50,
            display: "flex",
            p: 2,
          }}
        >
          <Button icon onClick={() => toggleDrawer()} size="small">
            <Icon icon={menuIcon} />
          </Button>
          <Box sh={{ ml: 2 }}>Pijama</Box>
        </Box>
        {children}
      </Box>
    </>
  )
}
