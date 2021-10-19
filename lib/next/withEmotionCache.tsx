import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/utils";
import type { VFC } from "react";
import AppProps from "./AppProps";

let cache: EmotionCache;

/**
 * Use it on your _app.tsx like this
 *
 * ```ts
 * const MyApp = withEmotionCache(({ Component, pageProps }) => {
 * ```
 */
export default function withEmotionCache<Props = AppProps>(
  App: VFC<Props>
): VFC {
  if (!cache) {
    cache = createCache({ key: "css", prepend: true });
    cache.compat = true;
  }

  return (props: Props) => (
    <CacheProvider value={cache}>
      <App {...props} />
    </CacheProvider>
  );
}
