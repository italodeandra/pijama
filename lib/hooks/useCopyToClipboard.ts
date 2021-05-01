import { useMountedState, useSetState } from "react-use"
import { useCallback } from "react"
import writeText from "copy-to-clipboard"

export interface CopyToClipboardState {
  value?: string
  noUserInteraction: boolean
  error?: Error
}

export const useCopyToClipboard = (): [
  CopyToClipboardState,
  (value: string) => void,
  () => void
] => {
  const isMounted = useMountedState()
  const [state, setState] = useSetState<CopyToClipboardState>({
    error: undefined,
    noUserInteraction: true,
    value: undefined,
  })

  const copyToClipboard = useCallback((value) => {
    if (!isMounted()) {
      return
    }
    let noUserInteraction
    let normalizedValue
    try {
      // only strings and numbers casted to strings can be copied to clipboard
      if (typeof value !== "string" && typeof value !== "number") {
        const error = new Error(
          `Cannot copy typeof ${typeof value} to clipboard, must be a string`
        )
        if (process.env.NODE_ENV === "development") console.error(error)
        setState({
          error,
          noUserInteraction: true,
          value,
        })
        return
      }
      // empty strings are also considered invalid
      else if (value === "") {
        const error = new Error(`Cannot copy empty string to clipboard.`)
        if (process.env.NODE_ENV === "development") console.error(error)
        setState({
          error,
          noUserInteraction: true,
          value,
        })
        return
      }
      normalizedValue = value.toString()
      noUserInteraction = writeText(normalizedValue)
      setState({
        error: undefined,
        noUserInteraction,
        value: normalizedValue,
      })
    } catch (error) {
      setState({
        error,
        noUserInteraction,
        value: normalizedValue,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = () => {
    setState({
      error: undefined,
      noUserInteraction: true,
      value: undefined,
    })
  }

  return [state, copyToClipboard, reset]
}
