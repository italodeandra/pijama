import "@fontsource/inter/variable-full.css"
import { AppDrawer } from "../components"
import { AppProps } from "next/app"
import { Hydrate } from "react-query/hydration"
import { QueryClientProvider } from "react-query"
import { ThemeProvider } from "../../lib"
import useQueryClientRef from "../queryClient"
import Head from "next/head"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useQueryClientRef()

  return (
    <ThemeProvider>
      <Head>
        <title>Pijama</title>
      </Head>

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppDrawer>
            <Component {...pageProps} />
          </AppDrawer>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
