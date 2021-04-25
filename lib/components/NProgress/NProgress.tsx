import { nprogress, nprogressState } from "./nprogressState"
import { Collapse } from "../Collapse/Collapse"
import { LinearProgress } from "../LinearProgress/LinearProgress"
import { css } from "@emotion/react"
import { useDebounce } from "react-use"
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
    })
  )
)

export const NProgress = () => {
  const { progress } = useSnapshot(nprogressState)

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
        } else if (progress >= 99 && progress < 100) {
          newProgress = 99
        }
        nprogress.set(newProgress)
      }
    },
    300,
    [progress]
  )

  return (
    <Collapse css={nprogressStyles} in={!!progress}>
      <LinearProgress value={progress || 100} />
    </Collapse>
  )
}
