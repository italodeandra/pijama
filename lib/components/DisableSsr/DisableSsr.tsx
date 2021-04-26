import { ReactElement, VFC, useState } from "react"
import { useIsomorphicLayoutEffect } from "react-use"

export type DisableSsrProps = {
  /**
   * Element that will be rendered outside of the server context.
   */
  children: ReactElement
}

export const DisableSsr: VFC<DisableSsrProps> = ({ children }) => {
  const [mountedState, setMountedState] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setMountedState(true)
  }, [])

  return <>{mountedState ? children : null}</>
}
