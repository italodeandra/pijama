import "@fontsource/inter/variable-full.css"
import { Box, Button, Gray, ThemeProvider, useBreakpoint } from "../../lib"
import {
  drawerState,
  toggleDrawer,
} from "../../lib/components/Drawer/drawerState"
import { AppDrawer } from "../components"
import { AppProps } from "next/app"
import { Hydrate } from "react-query/hydration"
import Icon from "@iconify/react"
import menuIcon from "@iconify/icons-heroicons-outline/menu"
import { QueryClientProvider } from "react-query"
import useQueryClientRef from "../queryClient"
import { useSnapshot } from "valtio"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { width, isOpen } = useSnapshot(drawerState)
  const isScreenSm = useBreakpoint("sm")
  const queryClientRef = useQueryClientRef()

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppDrawer />
          <Box
            sh={{
              ml: isScreenSm && isOpen ? `${width}px` : 0,
              transition: "marginLeft",
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
            </Box>
            <Component {...pageProps} />
          </Box>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
