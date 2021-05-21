import { nprogress, nprogressState } from "./nprogressState"
import { css } from "@emotion/react"
import { Fade } from "../Fade/Fade"
import { LinearProgress } from "../LinearProgress/LinearProgress"
import { Router } from "next/router"
import { useDebounce } from "react-use"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { withTheme } from "../../styles"

const nprogressStyles = withTheme((theme, sh) =>
  css(
    sh({
      "& > div": {
        height: 0.25,
      },
      pos: [0, 0, "", 0],
      position: "fixed",
      zIndex: 3,
    })
  )
)

/**
 * A progress bar that shows up on the top of the page. Automatically
 * integrated with NextJS router but can also be accessed from it's API `nprogress`.
 *
 * [Demo](https://pijama.majapi.com.br/components/NProgress)
 */
export const NProgress = () => {
  const { progress } = useSnapshot(nprogressState)

  useEffect(() => {
    const handleRouteChangeStart = () => nprogress.start()
    const handleRouteChangeComplete = () => nprogress.end()

    Router.events.on("routeChangeStart", handleRouteChangeStart)
    Router.events.on("routeChangeComplete", handleRouteChangeComplete)
    Router.events.on("routeChangeError", handleRouteChangeComplete)

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart)
      Router.events.off("routeChangeComplete", handleRouteChangeComplete)
      Router.events.off("routeChangeError", handleRouteChangeComplete)
    }
  }, [])

  useDebounce(
    () => {
      if (progress !== null) {
        let newProgress = null
        if (progress >= 0 && progress < 20) {
          newProgress = progress + 10
        } else if (progress >= 20 && progress < 50) {
          newProgress = progress + 4
        } else if (progress >= 50 && progress < 80) {
          newProgress = progress + 2
        } else if (progress >= 80 && progress < 99) {
          newProgress = progress + 0.5
        }
        nprogress.set(newProgress)
      }
    },
    300,
    [progress]
  )

  return (
    <Fade in={progress !== null && progress < 100}>
      <div css={nprogressStyles} data-testid="nprogress">
        <LinearProgress
          transitionDuration={!progress || progress < 100 ? 6 * 300 : undefined}
          value={progress !== null ? progress : 100}
        />
      </div>
    </Fade>
  )
}
