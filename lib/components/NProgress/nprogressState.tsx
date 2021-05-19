import { proxy } from "valtio"

export const nprogressState = proxy<{
  progress: number | null
}>({
  progress: null,
})

/**
 * The NProgress component API.
 *
 * [Demo](https://pijama.majapi.com.br/components/NProgress)
 */
export const nprogress = {
  /**
   * End the progress.
   */
  end() {
    nprogressState.progress = 100
  },
  /**
   * Set an specific progress percentage.
   */
  set(progress: number) {
    nprogressState.progress = progress
  },
  /**
   * Start the progress.
   */
  start() {
    nprogressState.progress = 0
  },
}
