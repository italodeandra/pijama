import { ReactNode, VFC } from "react"
import { createPortal } from "react-dom"
import { isBrowser } from "../../utils"

export type PortalProps = {
  /**
   * What will be rendered inside a portal on body.
   */
  children?: ReactNode
  /**
   * The portal container.
   *
   * @default window.document.body
   */
  container?: Element
}

/**
 * Renders the content inside a portal on a container or body.
 *
 * [Demo](https://pijama.majapi.com.br/components/Portal)
 *
 * @example
 * <Portal>This will be rendered outside of the div</Portal>
 */
export const Portal: VFC<PortalProps> = ({ children, container }) =>
  isBrowser ? createPortal(children, container || window.document.body) : null
