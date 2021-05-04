import "@fontsource/inter/variable-full.css"
import { AppDrawer } from "../components"
import { AppProps } from "next/app"
import { Hydrate } from "react-query/hydration"
import { QueryClientProvider } from "react-query"
import { ThemeProvider } from "../../lib"
import useQueryClientRef from "../queryClient"
import Head from "next/head"
import { DefaultSeo } from "next-seo"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useQueryClientRef()

  return (
    <ThemeProvider>
      <DefaultSeo
        description="For building apps."
        openGraph={{
          images: [
            {
              url: "/icons/android-chrome-512x512.png",
              height: 512,
              width: 512,
              alt: "Majapinho",
            },
          ],
        }}
        title="Pijama"
      />
      <Head>
        <title>Pijama</title>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
        <link
          href={"/icons/apple-touch-icon.png"}
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href={"/icons/favicon-32x32.png"}
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href={"/icons/favicon-16x16.png"}
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href={"/favicon.ico"} rel="icon" />
        <link href={"/site.webmanifest"} rel="manifest" />
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

// noinspection JSUnusedGlobalSymbols
export default MyApp
