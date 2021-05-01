import { Box, Drawer, Link } from "../../../lib"
import {
  drawerState,
  toggleDrawer,
} from "../../../lib/components/Drawer/drawerState"
import NextLink from "next/link"
import { subscribe } from "valtio"
import { useEffect } from "react"
import { useQuery } from "react-query"

export const AppDrawer = () => {
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
    <Drawer>
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
  )
}
