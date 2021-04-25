import { proxy } from "valtio"

export const nprogressState = proxy<{
  progress: number | null
}>({
  progress: null,
})

let timeout

export const nprogress = {
  end() {
    if (timeout) {
      clearTimeout(timeout)
    } else {
      nprogressState.progress = 100
    }
  },
  set(progress: number) {
    nprogressState.progress = progress
  },
  start() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      nprogressState.progress = 1
      timeout = undefined
    }, 300)
  },
}
