import { ReactElement, useState, VFC } from "react"
import { useIsomorphicLayoutEffect } from "react-use"

export type DisableSsrProps = {
  /**
   * Element that will be rendered outside of the server context.
   */
  children: ReactElement
}

// noinspection JSUnusedGlobalSymbols
/**
 * Makes a component render only on the client side, disabling the SSR.
 *
 * @example <DisableSsr>
 *   <Window />
 * </DisableSsr>
 */
export const DisableSsr: VFC<DisableSsrProps> = ({ children }) => {
  const [mountedState, setMountedState] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setMountedState(true)
  }, [])

  return <>{mountedState ? children : null}</>
}
