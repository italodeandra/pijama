import { ReactElement, VFC, useState } from "react"
import { useSsrEffect } from "../../index"

export type DisableSsrProps = {
  /**
   * Element that will be rendered outside of the server context.
   */
  children: ReactElement
}

export const DisableSsr: VFC<DisableSsrProps> = ({ children }) => {
  const [mountedState, setMountedState] = useState(false)

  useSsrEffect(() => {
    setMountedState(true)
  }, [])

  return <>{mountedState ? children : null}</>
}
