import { AppProps } from "next/app"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { EmotionCache } from "@emotion/utils"
import { VFC } from "react"

let cache: EmotionCache

/**
 * Use it on your _app.tsx like this
 *
 * ```ts
 * const MyApp = withEmotionCache(({ Component, pageProps }) => {
 * ```
 */
export const withEmotionCache = (App: VFC<AppProps>) => {
  if (!cache) {
    cache = createCache({ key: "css", prepend: true })
    cache.compat = true
  }

  return (props: AppProps) => (
    <CacheProvider value={cache}>
      <App {...props} />
    </CacheProvider>
  )
}
