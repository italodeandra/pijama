import { proxy } from "valtio"

export const nprogressState = proxy<{
  progress: number | null
}>({
  progress: null,
})

export const nprogress = {
  end() {
    if (nprogressState.progress >= 0) {
      nprogressState.progress = 100
    }
  },
  set(progress: number) {
    nprogressState.progress = progress
  },
  start() {
    nprogressState.progress = 0
  },
}
