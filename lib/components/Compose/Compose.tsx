import React, { ReactNode, VFC } from "react"

export type ComposeProps = {
  /**
   * The components you want to compose.
   */
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  /**
   * The children of the composition.
   */
  children?: ReactNode
}

/**
 * Compose the components. Useful for avoid the wrapper hell with more than a
 * few providers.
 */
export const Compose: VFC<ComposeProps> = ({ components = [], children }) => (
  <>
    {components.reduceRight((acc, Comp) => {
      return <Comp>{acc}</Comp>
    }, children)}
  </>
)
